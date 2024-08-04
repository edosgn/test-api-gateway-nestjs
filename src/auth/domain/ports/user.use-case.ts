import { UserEntity } from '@auth/domain/entities/user.entity';

export default abstract class IUserUseCase {
  abstract execute(username: string, password: string): Promise<UserEntity>;
}
