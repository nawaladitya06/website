'use server'

import { getDb, isDbAvailable } from '@/db';
import { projects, experiences, educations, messages, skills, about, profile, posts, certifications } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface Env {
  DB: any;
}

// ========================
// PUBLIC GETTERS
// ========================
export async function getProjectsAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  const results = await db.select().from(projects);
  return results.map(p => ({
    ...p,
    tech: typeof p.tech === 'string' ? JSON.parse(p.tech) : p.tech
  }));
}

export async function getProjectByIdAction(id: number) {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return null;
  const db = getDb(env);
  const result = await db.select().from(projects).where(eq(projects.id, id));
  const p = result[0] || null;
  if (!p) return null;
  return {
    ...p,
    tech: typeof p.tech === 'string' ? JSON.parse(p.tech) : p.tech
  };
}

export async function getAboutAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  return await db.select().from(about);
}

export async function getSkillsAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  return await db.select().from(skills);
}

export async function getExperiencesAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [] as {
    id: number;
    role: string;
    org: string;
    year: string;
    desc: string;
    category: "leadership" | "professional";
    img: string;
    doc: string | null;
  }[];
  const db = getDb(env);
  const result = await db.select().from(experiences);
  return result as {
    id: number;
    role: string;
    org: string;
    year: string;
    desc: string;
    category: "leadership" | "professional";
    img: string;
    doc: string | null;
  }[];
}

export async function getEducationsAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  return await db.select().from(educations);
}

export async function getPostsAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  return await db.select().from(posts).orderBy(desc(posts.date));
}

export async function getPostBySlugAction(slug: string) {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return null;
  const db = getDb(env);
  const result = await db.select().from(posts).where(eq(posts.slug, slug));
  return result[0] || null;
}

// ========================
// PUBLIC MUTATIONS
// ========================
export async function submitContactForm(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required' };
  }

  await db.insert(messages).values({ name, email, message });
  revalidatePath('/admin/messages');
  return { success: true };
}

// ========================
// ADMIN CRUD (MESSAGES)
// ========================
export async function getMessagesAction() {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  return await db.select().from(messages).orderBy(desc(messages.createdAt));
}

export async function getMessageByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(messages).where(eq(messages.id, id));
  return result[0] || null;
}

export async function deleteMessageAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(messages).where(eq(messages.id, id));
  revalidatePath('/admin/messages');
}

// ========================
// ADMIN CRUD (PROJECTS)
// ========================
export async function createProjectAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  const techString = formData.get('tech') as string;
  const techArray = techString.split(',').map(s => s.trim()).filter(Boolean);

  await db.insert(projects).values({
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    tech: techArray,
    year: formData.get('year') as string,
    size: formData.get('size') as string || 'col-span-1',
    img: formData.get('img') as string,
    github: formData.get('github') as string || null,
    demo: formData.get('demo') as string || null,
    type: formData.get('type') as string || 'major',
    challenge: formData.get('challenge') as string || null,
    solution: formData.get('solution') as string || null,
    impact: formData.get('impact') as string || null,
  });
  
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

export async function updateProjectAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  const techString = formData.get('tech') as string;
  const techArray = techString.split(',').map(s => s.trim()).filter(Boolean);

  await db.update(projects).set({
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    tech: techArray,
    year: formData.get('year') as string,
    size: formData.get('size') as string || 'col-span-1',
    img: formData.get('img') as string,
    github: formData.get('github') as string || null,
    demo: formData.get('demo') as string || null,
    type: formData.get('type') as string,
    challenge: formData.get('challenge') as string || null,
    solution: formData.get('solution') as string || null,
    impact: formData.get('impact') as string || null,
  }).where(eq(projects.id, id));
  
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath(`/projects/${id}`);
  revalidatePath('/admin/projects');
}

export async function deleteProjectAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

// ========================
// ADMIN CRUD (BLOG POSTS)
// ========================
export async function getPostByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0] || null;
}

export async function createPostAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  await db.insert(posts).values({
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    cover: formData.get('cover') as string,
    date: new Date().toISOString().split('T')[0],
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

export async function updatePostAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  await db.update(posts).set({
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    cover: formData.get('cover') as string,
    // date remains original
  }).where(eq(posts.id, id));

  revalidatePath('/blog');
  revalidatePath(`/blog/${formData.get('slug')}`);
  revalidatePath('/admin/blog');
}

export async function deletePostAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

// ========================
// ADMIN CRUD (EXPERIENCE)
// ========================
export async function getExperienceByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(experiences).where(eq(experiences.id, id));
  return result[0] || null;
}

export async function createExperienceAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  const imgFile = formData.get('img') as File;
  let imgStr = formData.get('img_url') as string || null;

  if (imgFile && imgFile.size > 0 && typeof imgFile !== 'string') {
    const buffer = await imgFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    imgStr = `data:${imgFile.type};base64,${base64}`;
  }
  
  await db.insert(experiences).values({
    role: formData.get('role') as string,
    org: formData.get('org') as string,
    year: formData.get('year') as string,
    desc: formData.get('desc') as string,
    category: formData.get('category') as string,
    img: imgStr || "",
    doc: formData.get('doc') as string || null,
  });
  revalidatePath('/resume');
  revalidatePath('/admin/experience');
}

export async function updateExperienceAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  const imgFile = formData.get('img') as File;
  
  let updateData: any = {
    role: formData.get('role') as string,
    org: formData.get('org') as string,
    year: formData.get('year') as string,
    desc: formData.get('desc') as string,
    category: formData.get('category') as string,
    doc: formData.get('doc') as string || null,
  };

  if (imgFile && imgFile.size > 0 && typeof imgFile !== 'string') {
    const buffer = await imgFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    updateData.img = `data:${imgFile.type};base64,${base64}`;
  } else if (formData.get('img_url')) {
    updateData.img = formData.get('img_url') as string;
  }
  
  await db.update(experiences).set(updateData).where(eq(experiences.id, id));
  
  revalidatePath('/resume');
  revalidatePath('/admin/experience');
}

export async function deleteExperienceAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePath('/');
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
}

// ========================
// ADMIN CRUD (EDUCATION)
// ========================
export async function getEducationByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(educations).where(eq(educations.id, id));
  return result[0] || null;
}

export async function createEducationAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.insert(educations).values({
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    year: formData.get('year') as string,
    score: formData.get('score') as string,
    link: formData.get('link') as string,
  });
  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/education');
}

export async function updateEducationAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.update(educations).set({
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    year: formData.get('year') as string,
    score: formData.get('score') as string,
    link: formData.get('link') as string,
  }).where(eq(educations.id, id));

  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/education');
}

export async function deleteEducationAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(educations).where(eq(educations.id, id));
  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/education');
}

// ========================
// ADMIN CRUD (SKILLS)
// ========================
export async function getSkillByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(skills).where(eq(skills.id, id));
  return result[0] || null;
}

export async function createSkillAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.insert(skills).values({
    category: formData.get('category') as string,
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    level: parseInt(formData.get('level') as string || '80'),
  });
  revalidatePath('/');
  revalidatePath('/skills');
  revalidatePath('/admin/skills');
}

export async function updateSkillAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.update(skills).set({
    category: formData.get('category') as string,
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    level: parseInt(formData.get('level') as string || '80'),
  }).where(eq(skills.id, id));

  revalidatePath('/');
  revalidatePath('/skills');
  revalidatePath('/admin/skills');
}

export async function deleteSkillAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath('/');
  revalidatePath('/skills');
  revalidatePath('/admin/skills');
}

// ========================
// ADMIN CRUD (ABOUT)
// ========================
export async function getAboutByIdAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  const result = await db.select().from(about).where(eq(about.id, id));
  return result[0] || null;
}

export async function createAboutAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.insert(about).values({
    content: formData.get('content') as string,
  });
  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/profile');
}

export async function updateAboutAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  await db.update(about).set({
    content: formData.get('content') as string,
  }).where(eq(about.id, id));

  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/profile');
}

export async function deleteAboutAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(about).where(eq(about.id, id));
  revalidatePath('/');
  revalidatePath('/education');
  revalidatePath('/admin/profile');
}

// ========================
// ADMIN CRUD (PROFILE)
// ========================
export async function getProfileAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return null;
  const db = getDb(env);
  const result = await db.select().from(profile);
  return result[0] || null;
}

export async function updateProfileAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  
  const existing = await getProfileAction();
  
  const data = {
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
    role: formData.get('role') as string,
    photo: formData.get('photo') as string,
    github: formData.get('github') as string,
    linkedin: formData.get('linkedin') as string,
    email: formData.get('email') as string,
    resume: formData.get('resume') as string,
  };

  if (existing) {
    await db.update(profile).set(data).where(eq(profile.id, existing.id));
  } else {
    await db.insert(profile).values(data);
  }
  
  revalidatePath('/');
  revalidatePath('/resume');
  revalidatePath('/education');
  revalidatePath('/admin/profile');
}

// ========================
// ADMIN CRUD (CERTIFICATIONS)
// ========================
export async function getCertificationsAction() {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return [];
  const db = getDb(env);
  return await db.select().from(certifications);
}

export async function getCertificationByIdAction(id: number) {
  const env = process.env as unknown as Env;
  if (!isDbAvailable(env)) return null;
  const db = getDb(env);
  const result = await db.select().from(certifications).where(eq(certifications.id, id));
  return result[0] || null;
}

export async function createCertificationAction(formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  const imgFile = formData.get('img') as File;
  const urlFile = formData.get('url') as File;
  
  let imgStr = formData.get('img_url') as string || null;
  let urlStr = formData.get('file_url') as string || null;

  if (imgFile && imgFile.size > 0 && typeof imgFile !== 'string') {
    const buffer = await imgFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    imgStr = `data:${imgFile.type};base64,${base64}`;
  }

  if (urlFile && urlFile.size > 0 && typeof urlFile !== 'string') {
    const buffer = await urlFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    urlStr = `data:${urlFile.type};base64,${base64}`;
  }
  
  await db.insert(certifications).values({
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    type: formData.get('type') as string || 'major',
    url: urlStr,
    img: imgStr,
  });
  
  revalidatePath('/resume');
  revalidatePath('/admin/certifications');
  revalidatePath('/certifications');
}

export async function updateCertificationAction(id: number, formData: FormData) {
  const env = process.env as unknown as Env;
  const db = getDb(env);

  const imgFile = formData.get('img') as File;
  const urlFile = formData.get('url') as File;
  
  let updateData: any = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    type: formData.get('type') as string,
  };

  if (imgFile && imgFile.size > 0 && typeof imgFile !== 'string') {
    const buffer = await imgFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    updateData.img = `data:${imgFile.type};base64,${base64}`;
  } else if (formData.get('img_url')) {
    updateData.img = formData.get('img_url') as string;
  }

  if (urlFile && urlFile.size > 0 && typeof urlFile !== 'string') {
    const buffer = await urlFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    updateData.url = `data:${urlFile.type};base64,${base64}`;
  } else if (formData.get('file_url')) {
    updateData.url = formData.get('file_url') as string;
  }
  
  await db.update(certifications).set(updateData).where(eq(certifications.id, id));
  
  revalidatePath('/resume');
  revalidatePath('/admin/certifications');
  revalidatePath('/certifications');
}

export async function deleteCertificationAction(id: number) {
  const env = process.env as unknown as Env;
  const db = getDb(env);
  await db.delete(certifications).where(eq(certifications.id, id));
  revalidatePath('/resume');
  revalidatePath('/admin/certifications');
}
