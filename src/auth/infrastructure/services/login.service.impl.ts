import { Injectable } from '@nestjs/common';

import { UserEntity } from '@auth/domain/entities/user.entity';

import { ILoginService } from '@auth/domain/services/login.service';
import { ILoginRepository } from '@auth/domain/repositories/login.repository';

@Injectable()
export class LoginServiceImpl implements ILoginService {
  constructor(private readonly loginRepository: ILoginRepository) {}

  async findByUsername(username: string): Promise<UserEntity> {
    // Implement the logic to find a user by their username
    // For example, you can use a database query to retrieve the user from the database
    return await this.loginRepository.findByUsername(username);
  }
}
