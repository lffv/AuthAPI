import { object, string, TypeOf } from 'zod';

export const createAvatarSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    origins: string({
      required_error: 'Origins is required',
    })
  })
});

export const getAvatarSchema = object({
    params: object({
      avatarId: string(),
      userId: string(),
    }),
  });

export const updateAvatarSchema = object({
  body: object({
    firstName: string(),
    lastName: string(),
    origins: string()
  })
});

export type CreateAvatarInput = TypeOf<typeof createAvatarSchema>['body'];
export type UpdateAvatarInput = TypeOf<typeof updateAvatarSchema>['body'];
export type GetAvatarInput = TypeOf<typeof getAvatarSchema>['params'];
