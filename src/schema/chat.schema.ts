import { object, string, TypeOf } from 'zod';

export const generateResponseSchema = object({
  body: object({
    prompt: string({
      required_error: 'Prompt is required',
    }),
  }),
});

export type GenerateResponseInput = TypeOf<
  typeof generateResponseSchema
>['body'];
