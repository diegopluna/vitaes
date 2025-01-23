import { serial, text, pgTable } from 'drizzle-orm/pg-core'

export const test = pgTable('test', {
  id: serial('id').primaryKey(),
  name: text('name'),
})
