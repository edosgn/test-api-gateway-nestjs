import { Injectable } from '@nestjs/common';

import { UserEntity } from '@auth/domain/entities/user.entity';

import { ILoginRepository } from '@auth/domain/repositories/login.repository';

@Injectable()
export class LoginRepositoryImpl implements ILoginRepository {
  findByUsername(username: string): Promise<UserEntity> {
    return new Promise<UserEntity>((resolve, reject) => {
      try {
        const user: UserEntity = {
          userId: 1,
          username,
          password: '12346546',
          name: 'Pablo Marmol',
          role: 'admin',
        };

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}
