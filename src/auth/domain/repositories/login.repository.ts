import { UserEntity } from '@auth/domain/entities/user.entity';

export abstract class ILoginRepository {
  abstract findByUsername(username: string): Promise<UserEntity>;
}
