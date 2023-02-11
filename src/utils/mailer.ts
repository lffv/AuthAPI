import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from './logger';

const smtp = config.get<{
  user: string;
  pass: string;
  smtp: string;
  port: number;
  secure: boolean;
}>('smtp');

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});
export default async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, 'Error sending email');
    }
    log.info(`Preview URL:${nodemailer.getTestMessageUrl(info)}`);
  });
}
