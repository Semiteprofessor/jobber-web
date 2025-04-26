import { object, ObjectSchema, string } from 'yup';
import { ISignInPayload } from '../interfaces/auth.interface';

const loginUserSchema: ObjectSchema<ISignInPayload> = object({
  username: string().required({ username: 'Username is a required field' }).min(4, { username: 'Username is a required field' }),
  password: string().required({ password: 'Password is a required field' }).min(4, { Password: 'Username is a required field' }),
  browserName: string().optional().nullable().notRequired(),
  deviceType: string().optional().nullable().notRequired(),
});
