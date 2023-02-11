import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from '../schema/user.schema';
import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../service/user.service';
import log from '../utils/logger';
import sendEmail from '../utils/mailer';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
) {
  const { body } = req;
  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'teste@teste.com',
      to: user.email,
      subject: 'Create account verification',
      text: `Verification code: ${user.verificationCode}. ID: ${user._id}`,
    });

    return res.send('User added!');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('User already exists');
    }
    return res.status(500).send(e);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response,
) {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  const message =
    'If a user with that email you will receive a password reset email';

  if (!user) {
    log.debug(`User with email: ${email} does not exists`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('User is not verified');
  }

  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: 'teste@teste.com',
    subject: 'Reset your password',
    text: `Password reset code ${passwordResetCode}. ID:${user.id} `,
  });

  log.debug(`Password sent to email ${email}`);
  return res.send(message);
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response,
) {
  const { id } = req.params;
  const { verificationCode } = req.params;

  const user = await findUserById(id);

  if (!user) {
    return res.send('User not found.');
  }

  if (user.verified) {
    return res.send('User already verified');
  }

  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();

    return res.send('User verified!!!');
  }

  return res.send('Could not verify user');
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response,
) {
  const { password } = req.body;
  const { id, passwordResetCode } = req.params;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send('Could not reset your password');
  }

  user.passwordResetCode = null;
  user.password = password;

  await user.save();

  return res.send('Successfully password reset');
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
