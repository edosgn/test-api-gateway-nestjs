import { UserEntity } from '../entities/user.entity';

export abstract class ILoginService {
  abstract findByUsername(username: string): Promise<UserEntity>;
}
