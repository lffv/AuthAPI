import { Request, Response } from 'express';
import { GenerateResponseInput } from '../schema/chat.schema';
import { generateResponse } from '../service/chat.service';
import log from '../utils/logger';

export async function getGeneratedResponse(
  req: Request<{}, {}, GenerateResponseInput>,
  res: Response,
) {
  const { prompt } = req.body;
  log.info(`Generating response for prompt: ${prompt}`);
  try {
    const response = await generateResponse(prompt);
    log.info(`Generated response: ${response}`);
    return res.send(response);
  } catch (e: any) {
    log.info(`Error generating response: ${e}`);
    return res.status(500).send(e);
  }
}
