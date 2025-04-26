import { IUseAuthSchema } from 'src/features/auth/interfaces/auth.interface';
import { validationErrorsType } from 'src/shared/shared.interface';

const useAuthSchema = ({ schema, userInfo }: IUseAuthSchema): [() => Promise<boolean>, validationErrorsType[]] => {};
