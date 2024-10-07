import {
  DynamicModule,
  Module,
  OnModuleDestroy,
  Provider,
} from '@nestjs/common';
import { MySQL2ClientProvider } from './adapters/mysql2/mysql2.client';
import { UserRepository } from './repositories/user.repository';
import { MySQL2UserRepository } from './adapters/mysql2/repositories/user.repository';
import DatabaseClientProvider from './database-client.provider';

export type DatabaseModuleOptions = {
  engine: 'mysql2';
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

@Module({})
export class DatabaseModule implements OnModuleDestroy {
  constructor(
    private readonly databaseClientProvider: DatabaseClientProvider
  ) {}

  static register(options: DatabaseModuleOptions): DynamicModule {
    const clientProvider = this.createClientProvider(options);
    const userRepositoryProvider = this.createUserRepositoryProvider(
      options.engine
    );

    return {
      module: DatabaseModule,
      imports: [],
      providers: [clientProvider, userRepositoryProvider],
      exports: [userRepositoryProvider],
    };
  }

  private static createClientProvider(
    options: DatabaseModuleOptions
  ): Provider {
    return {
      provide: DatabaseClientProvider,
      useFactory: () => {
        const { engine, ...rest } = options;
        switch (engine) {
          case 'mysql2': {
            return new MySQL2ClientProvider(rest);
          }
          default:
            throw new Error(`Unsupported database engine: ${engine}`);
        }
      },
    };
  }

  private static createUserRepositoryProvider(
    engine: DatabaseModuleOptions['engine']
  ): Provider {
    return {
      provide: UserRepository,
      useClass: this.getUserRepositoryClass(engine),
    };
  }

  private static getUserRepositoryClass(
    engine: DatabaseModuleOptions['engine']
  ) {
    switch (engine) {
      case 'mysql2':
        return MySQL2UserRepository;
      default:
        throw new Error(`Unsupported database engine: ${engine}`);
    }
  }

  async onModuleDestroy() {
    await this.databaseClientProvider.disconnect();
  }
}
