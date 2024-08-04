import { UserEntity } from '@auth/domain/entities/user.entity';

export default abstract class UserRepository {
  abstract findUserByCredentials(
    username: string,
    password: string,
  ): Promise<UserEntity>;
}
