import config from 'config';
import log from '../utils/logger';

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: config.get<string>('openai.organization'),
    apiKey: config.get<string>('openai.key'),
});
const openai = new OpenAIApi(configuration);

export async function generateImage(prompt: string) {
  try{
    const {data} = await openai.createImage({
      prompt,
      size: "256x256",
      response_format: "b64_json",
      n: 1,
    });

    return data;
  }
  catch(e){
    log.error(`Error generated response: ${e}`);
  }
}
