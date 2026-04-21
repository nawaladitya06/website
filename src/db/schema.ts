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
  type: text('type').notNull().default('major'), // 'major' or 'minor'
  // Case Study Fields
  challenge: text('challenge'),
  solution: text('solution'),
  impact: text('impact'),
});

export const experiences = sqliteTable('experiences', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  role: text('role').notNull(),
  org: text('org').notNull(),
  year: text('year').notNull(),
  desc: text('desc').notNull(),
  category: text('category').notNull(), // 'leadership' or 'professional'
  img: text('img').notNull(),
  doc: text('doc'), // URL to PDF/Doc
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
  level: integer('level').notNull().default(80), // 0-100
});

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  cover: text('cover').notNull(),
  date: text('date').notNull(),
});

export const about = sqliteTable('about', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
});

export const profile = sqliteTable('profile', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  role: text('role').notNull(),
  photo: text('photo').notNull(),
  github: text('github').notNull(),
  linkedin: text('linkedin').notNull(),
  email: text('email').notNull(),
  resume: text('resume').notNull(),
});

export const certifications = sqliteTable('certifications', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  issuer: text('issuer').notNull(),
  date: text('date').notNull(),
  url: text('url'), // Verification link (PDF or Website)
  img: text('img'), // Certificate image URL
  type: text('type').notNull().default('major'), // 'major' or 'minor'
});
