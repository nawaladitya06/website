import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  desc: text('desc').notNull(),
  tech: text('tech', { mode: 'json' }).$type<string[]>().notNull(),
  year: text('year').notNull(),
  size: text('size').notNull(),
  img: text('img').notNull(),
  github: text('github'),
  demo: text('demo'),
});

export const experiences = sqliteTable('experiences', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  role: text('role').notNull(),
  org: text('org').notNull(),
  year: text('year').notNull(),
  desc: text('desc').notNull(),
});

export const educations = sqliteTable('educations', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  year: text('year').notNull(),
  score: text('score').notNull(),
  link: text('link').notNull(),
});

export const messages = sqliteTable('messages', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const skills = sqliteTable('skills', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  category: text('category').notNull(),
  name: text('name').notNull(),
  url: text('url').notNull(),
});

export const about = sqliteTable('about', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
});
