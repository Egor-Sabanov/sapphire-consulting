import { z } from 'zod';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+]?([0-9 ()\-]){7,25}$/;
const namePattern = /^[A-Za-zА-Яа-яЁёÀ-ÖØ-öø-ÿ .’'\-]{2,80}$/;

export const contactFormSchema = z.object({
  company: z.string().trim().max(120).optional().default(''),
  name: z.string().trim().min(2).max(80).regex(namePattern),
  email: z.string().trim().max(120).regex(emailPattern),
  phone: z.string().trim().max(40).refine((value) => value === '' || phonePattern.test(value)).default(''),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal('yes'),
  locale: z.enum(['ru', 'en']).default('ru'),
  website: z.string().max(0).optional().default(''),
  startedAt: z.number().int().positive(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactField = keyof Pick<ContactFormData, 'name' | 'email' | 'phone' | 'subject' | 'message' | 'consent' | 'company'>;
