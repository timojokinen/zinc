import { Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { Connection, createConnection } from 'mysql2';
import DatabaseClientProvider from '../../database-client.provider';

export type MySQL2ClientProviderOptions = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export class MySQL2ClientProvider extends DatabaseClientProvider {
  readonly #client: ReturnType<typeof drizzle>;
  readonly #mysql2Connection: Connection;
  readonly #logger = new Logger(MySQL2ClientProvider.name);

  constructor(options: MySQL2ClientProviderOptions) {
    super();

    this.#logger.debug('Creating MySQL2 client provider');
    this.#mysql2Connection = createConnection(options);
    this.#mysql2Connection.addListener('connect', () =>
      this.#logger.debug('Connected to database using mysql2')
    );
    this.#client = drizzle(this.#mysql2Connection);
  }

  public get client() {
    return this.#client;
  }

  public override disconnect() {
    this.#logger.debug('Disconnecting from database');
    this.#mysql2Connection.destroy();
  }
}
