
'use client';

import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics/react';
import Link from 'next/link';
import { contactFormSchema, type ContactField, type ContactFormData } from '../lib/contact-schema';
import type { Locale } from '../types';

interface ContactFormProps { locale?: Locale }
type FormStatus = 'idle' | 'sending' | 'done' | 'error';
type ErrorMap = Partial<Record<ContactField, string>>;

export default function ContactForm({ locale='ru' }: ContactFormProps) {
  const en = locale === 'en';
  const [status,setStatus] = useState<FormStatus>('idle');
  const [msg,setMsg] = useState('');
  const [errors,setErrors] = useState<ErrorMap>({});
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const copy = en ? {
    name:'Name',company:'Company',email:'Email',phone:'Phone',subject:'Subject',message:'Message',required:'Required',
    nameError:'Enter a valid name using letters, spaces or hyphens.',emailError:'Enter a valid email address.',
    phoneError:'Enter a valid phone number.',subjectError:'Enter a subject.',messageError:'Message must be at least 10 characters.',
    consent:'I agree to the processing of my personal data in accordance with the privacy policy.',policy:'Read policy',
    idleNote:'We use your details only to respond to your request.',sending:'Sending…',send:'Send request',
    done:'Thank you. We will contact you shortly.',generic:'Could not send the request. Please try again later.'
  } : {
    name:'Имя',company:'Компания',email:'Email',phone:'Телефон',subject:'Тема',message:'Сообщение',required:'Обязательное поле',
    nameError:'Введите имя, используя буквы, пробелы или дефисы.',emailError:'Укажите корректный email.',
    phoneError:'Укажите корректный номер телефона.',subjectError:'Укажите тему обращения.',messageError:'Сообщение должно содержать минимум 10 символов.',
    consent:'Я соглашаюсь на обработку персональных данных в соответствии с политикой конфиденциальности.',policy:'Читать политику',
    idleNote:'Данные используются только для обработки вашей заявки.',sending:'Отправляем…',send:'Отправить заявку',
    done:'Спасибо. Мы свяжемся с вами в ближайшее время.',generic:'Не удалось отправить заявку. Попробуйте ещё раз позже.'
  };

  function getData(form: HTMLFormElement): Record<string,string> {
    return Object.fromEntries([...new FormData(form).entries()].map(([key,value]) => [key, typeof value === 'string' ? value : '']));
  }

  function validate(data: Record<string,string>): ErrorMap {
    const result = contactFormSchema.safeParse({ ...data, locale, startedAt: startedAtRef.current ?? 1, website: data.website || '' });
    if (result.success) return {};
    const next: ErrorMap = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (!field || next[field]) continue;
      next[field] = field === 'name' ? copy.nameError
        : field === 'email' ? copy.emailError
        : field === 'phone' ? copy.phoneError
        : field === 'company' ? copy.required
        : field === 'subject' ? copy.subjectError
        : field === 'message' ? copy.messageError
        : copy.required;
    }
    return next;
  }

  function validateField(field: ContactField, form: HTMLFormElement) {
    const next = validate(getData(form));
    setErrors((previous) => {
      const updated = { ...previous };
      if (next[field]) updated[field] = next[field];
      else delete updated[field];
      return updated;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = getData(form);
    const next = validate(data);
    setErrors(next);
    setMsg('');
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const element = form.elements.namedItem(first);
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    const payload: ContactFormData = {
      company:data.company?.trim() || '', name:data.name.trim(), email:data.email.trim(), phone:data.phone?.trim() || '',
      subject:data.subject.trim(), message:data.message.trim(), consent:'yes', locale,
      website:'', startedAt:startedAtRef.current ?? 1,
    };
    setStatus('sending');
    try {
      const response = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json','X-Requested-With':'fetch'},body:JSON.stringify(payload)});
      const result: {ok?:boolean;message?:string} = await response.json();
      if (!response.ok) {
        if (response.status === 429) throw new Error(en ? 'Too many attempts. Please try again later.' : 'Слишком много попыток. Попробуйте позже.');
        throw new Error(result.message || copy.generic);
      }
      setStatus('done'); setMsg(copy.done); setErrors({}); form.reset(); void track('contact_form_success', { locale });
    } catch (error) {
      setStatus('error'); setMsg(error instanceof Error ? error.message : copy.generic);
    }
  }

  const fields: Array<[ContactField,string,'text'|'email'|'tel',string]> = [
    ['name',copy.name,'text','name'],['company',copy.company,'text','organization'],['email',copy.email,'email','email'],['phone',copy.phone,'tel','tel'],['subject',copy.subject,'text','off']
  ];

  return <form className="contactForm" data-contact-form={locale} noValidate onSubmit={submit}>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
    <div className="formGrid">
      {fields.map(([name,label,type,autoComplete])=>{
        const error=errors[name];
        return <label key={name}>
          <span>{label}{!['phone','company'].includes(name) ? ' *' : ''}</span>
          <input name={name} type={type} required={!['phone','company'].includes(name)} maxLength={name==='name'?80:name==='company'?120:name==='email'?120:name==='subject'?120:40} autoComplete={autoComplete} inputMode={name==='phone'?'tel':name==='email'?'email':'text'} aria-invalid={Boolean(error)} aria-describedby={error?`${locale}-${name}-error`:undefined} onBlur={(event)=>{ const form=event.currentTarget.form; if(form) validateField(name,form); }} />
          {error && <small className="fieldError" id={`${locale}-${name}-error`}>{error}</small>}
        </label>;
      })}
      <label className="full">
        <span>{copy.message} *</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} spellCheck={true} style={{ resize: 'none' }} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message?`${locale}-message-error`:undefined} onBlur={(event)=>{ const form=event.currentTarget.form; if(form) validateField('message',form); }} />
        {errors.message && <small className="fieldError" id={`${locale}-message-error`}>{errors.message}</small>}
      </label>
    </div>
    <label className="consent">
      <input type="checkbox" name="consent" value="yes" required aria-invalid={Boolean(errors.consent)} onChange={()=>setErrors((previous)=>{const updated={...previous};delete updated.consent;return updated;})} />
      <span>{copy.consent} <Link href={`/${locale}/privacy`}>{copy.policy}</Link>{errors.consent && <small className="fieldError consentError">{errors.consent}</small>}</span>
    </label>
    <button className="button primary submitButton" type="submit" disabled={status==='sending'}>{status==='sending'?copy.sending:copy.send}<span className="buttonArrow"><span aria-hidden="true">↗</span></span></button>
    <p className={`formNote ${status==='error'?'error':''} ${status==='done'?'success':''}`} aria-live="polite">{status==='done'||status==='error'?msg:copy.idleNote}</p>
  </form>;
}
