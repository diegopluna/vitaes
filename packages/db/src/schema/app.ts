import {
  boolean,
  index,
  json,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core'
import { user } from './auth'
import type { IResume } from '@vitaes/types/resume'

export const resume = pgTable(
  'resume',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    userEmail: text('user_email')
      .notNull()
      .references(() => user.email, { onDelete: 'cascade' }),
    data: json('data').$type<IResume>(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    isPublic: boolean('is_public').notNull().default(false),
    url: text('url').notNull().unique(),
  },
  (table) => [
    index('idx_resume_user_email').on(table.userEmail),
    index('idx_resume_url').on(table.url),
    unique('uk_resume_name_user_email').on(table.name, table.userEmail),
  ],
)
