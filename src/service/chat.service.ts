import axios from 'axios';
import log from '../utils/logger';
const API_KEY = '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';

export async function generateResponse(prompt: string) {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-ada-001',
      prompt,
      temperature: 0,
      max_tokens: 100,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  log.info(`Generated response: ${response.data.choices}`);
  return response.data.choices[0].text;
}
