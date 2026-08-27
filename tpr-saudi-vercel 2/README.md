# TPR Saudi Partnership — Vercel Edition

هذه نسخة Next.js مخصصة للنشر على Vercel، مع الحفاظ على التصميم والحركات والصور والفيديو وربط نموذج التسجيل بـ Google Apps Script.

## التشغيل على VS Code

```bash
npm install
npm run dev
```

ثم افتح الرابط المحلي الذي يظهر في Terminal.

## النشر على GitHub وVercel

1. ارفع **محتويات هذا المجلد** إلى مستودع GitHub؛ يجب أن يظهر ملف `package.json` مباشرة في الصفحة الرئيسية للمستودع.
2. في Vercel اختر `Add New Project` ثم المستودع.
3. اختر Framework Preset: `Next.js`.
4. اترك Build Command وOutput Directory على الإعداد الافتراضي؛ لا تكتب `dist`.
5. اضغط Deploy.

## نموذج التسجيل

النموذج مرتبط حاليًا بعنوان Google Apps Script الموجود داخل `app/page.tsx` في الثابت `LEADS_SCRIPT_URL`.

## رابط الموقع في بيانات المشاركة

يمكنك إضافة متغير بيئة اختياري في Vercel باسم `NEXT_PUBLIC_SITE_URL` ووضع رابط دومين الموقع النهائي، لتحسين روابط المشاركة على واتساب ومنصات التواصل.
