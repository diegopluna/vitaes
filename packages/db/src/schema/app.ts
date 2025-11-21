import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core'
import type { IResume } from '@vitaes/types/resume'

export const resume = pgTable(
  'resume',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    userEmail: text('user_email').notNull(),
    data: json('data').$type<IResume>(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    isPublic: boolean('is_public').notNull().default(false),
    slug: text('slug').notNull().unique(),
    views: integer('views').notNull().default(0),
    downloads: integer('downloads').notNull().default(0),
    thumbnailUrl: text('thumbnail_url'),
  },
  (table) => [
    index('idx_resume_user_email').on(table.userEmail),
    index('idx_resume_slug').on(table.slug),
    unique('uk_resume_name_user_email').on(table.name, table.userEmail),
  ],
)
