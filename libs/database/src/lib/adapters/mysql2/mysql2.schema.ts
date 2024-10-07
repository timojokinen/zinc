import { mysqlTable, varchar, char, datetime } from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

export const users = mysqlTable('users', {
  id: char('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  email: varchar('email', { length: 255 }).notNull(),
  password: char('password', { length: 60 }).notNull(),
  createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
    .$default(() => new Date())
    .notNull(),
  updatedAt: datetime('created_at', { mode: 'date', fsp: 6 })
    .$default(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});
