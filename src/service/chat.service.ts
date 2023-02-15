import config from 'config';
import log from '../utils/logger';

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: config.get<string>('openai.organization'),
    apiKey: config.get<string>('openai.key'),
});
const openai = new OpenAIApi(configuration);

export async function generateResponse(prompt: string) {
  try{
    const {data} = await openai.createCompletion({
      model: 'text-ada-001',
      prompt,
      temperature: 1,
      max_tokens: 2000,
      n: 1,
    });

    return data;
  }
  catch(e){
    log.info(`Error generated response: ${e}`);
  }
}

export async function generateKeywords(input: string, instruction: string) {
  try{
    const {data} = await openai.createEdit({
      model: 'text-davinci-edit-001',
      input,
      instruction,
      temperature: 1,
      n: 1,
    });

    return data;
  }
  catch(e){
    log.info(`Error generated response: ${e}`);
  }
}
