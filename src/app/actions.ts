'use server'

import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb } from '@/db';
import { projects, experiences, educations, messages, skills, about } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface Env {
  DB: any;
}

// ========================
// PUBLIC GETTERS
// ========================
export async function getProjectsAction() {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  return await db.select().from(projects);
}

export async function getAboutAction() {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  return await db.select().from(about);
}

export async function getSkillsAction() {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  return await db.select().from(skills);
}

export async function getExperiencesAction() {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  return await db.select().from(experiences);
}

export async function getEducationsAction() {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  return await db.select().from(educations);
}

// ========================
// PUBLIC MUTATIONS
// ========================
export async function submitContactForm(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required' };
  }

  await db.insert(messages).values({ name, email, message });
  return { success: true };
}

// ========================
// ADMIN CRUD (PROJECTS)
// ========================
export async function createProjectAction(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  const techString = formData.get('tech') as string;
  const techArray = techString.split(',').map(s => s.trim()).filter(Boolean);

  await db.insert(projects).values({
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    tech: JSON.stringify(techArray),
    year: formData.get('year') as string,
    size: formData.get('size') as string || 'col-span-1',
    img: formData.get('img') as string,
    github: formData.get('github') as string || null,
    demo: formData.get('demo') as string || null,
  });
  
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function deleteProjectAction(id: number) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

// ========================
// ADMIN CRUD (EXPERIENCE)
// ========================
export async function createExperienceAction(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  await db.insert(experiences).values({
    role: formData.get('role') as string,
    org: formData.get('org') as string,
    year: formData.get('year') as string,
    desc: formData.get('desc') as string,
  });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function deleteExperienceAction(id: number) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

// ========================
// ADMIN CRUD (EDUCATION)
// ========================
export async function createEducationAction(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  await db.insert(educations).values({
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    year: formData.get('year') as string,
    score: formData.get('score') as string,
    link: formData.get('link') as string,
  });
  revalidatePath('/');
  revalidatePath('/admin/education');
}

export async function deleteEducationAction(id: number) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  await db.delete(educations).where(eq(educations.id, id));
  revalidatePath('/');
  revalidatePath('/admin/education');
}

// ========================
// ADMIN CRUD (SKILLS)
// ========================
export async function createSkillAction(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  await db.insert(skills).values({
    category: formData.get('category') as string,
    name: formData.get('name') as string,
    url: formData.get('url') as string,
  });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkillAction(id: number) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

// ========================
// ADMIN CRUD (ABOUT)
// ========================
export async function createAboutAction(formData: FormData) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  
  await db.insert(about).values({
    content: formData.get('content') as string,
  });
  revalidatePath('/');
  revalidatePath('/admin/about');
}

export async function deleteAboutAction(id: number) {
  const env = getRequestContext().env as Env;
  const db = getDb(env);
  await db.delete(about).where(eq(about.id, id));
  revalidatePath('/');
  revalidatePath('/admin/about');
}
