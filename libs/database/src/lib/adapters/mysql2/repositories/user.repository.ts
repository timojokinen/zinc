import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from '../../../repositories/user.repository';
import { MySQL2ClientProvider } from '../mysql2.client';
import { users } from '../mysql2.schema';
import { eq } from 'drizzle-orm';
import DatabaseClientProvider from '../../../database-client.provider';

@Injectable()
export class MySQL2UserRepository extends UserRepository {
  constructor(
    @Inject(DatabaseClientProvider)
    private readonly clientProvider: MySQL2ClientProvider
  ) {
    super();
  }

  override async findByEmail(email: string): Promise<User | null> {
    const usersResults = await this.clientProvider.client
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return usersResults[0] ?? null;
  }

  override async findById(id: string): Promise<User | null> {
    const usersResults = await this.clientProvider.client
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return usersResults[0] ?? null;
  }

  override async create(payload: {
    password: string;
    email: string;
  }): Promise<User> {
    await this.clientProvider.client.insert(users).values(payload);
    const createdUser = await this.findByEmail(payload.email);
    if (!createdUser) throw new Error('Created user not found');

    return createdUser;
  }
}
