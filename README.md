# إدارة أقساطك — Aqsatak Web

موقع ويب (Next.js 14 + Supabase) لإدارة الأقساط للشركات والمحلات في العراق.

## ما هو جاهز فعلياً في هذا المشروع

- تسجيل دخول حقيقي عبر Supabase Auth (بريد + كلمة مرور)
- عزل بيانات كل شركة عن الأخرى عبر Row Level Security (RLS) في قاعدة البيانات
- لوحة تحكم تقرأ بيانات حقيقية من Supabase (شركات، زبائن، عقود، اشتراكات)
- صفحة الشركات فيها نموذج إضافة فعلي (Insert مباشر في قاعدة البيانات)
- Trigger في قاعدة البيانات يحدّث "المتبقي" تلقائياً عند أي دفعة
- تصميم كامل بهوية الأيقونة (أحمر/أسود/ذهبي، Glassmorphism)
- Storage buckets جاهزة لرفع: صور الزبائن، الهويات، عقود PDF، شعارات الشركات

## ما يحتاج ربط إضافي (يتطلب حسابات/مفاتيح خارجية حقيقية)

هذي الأجزاء بها نقاط ربط واضحة بالكود، لكنها تحتاج حسابات فعلية لا أستطيع إنشاءها نيابة عنك:

- **واتساب**: يحتاج WhatsApp Business API (Meta) أو مزود مثل Twilio — ضع المفاتيح في `.env.local`
- **OCR للهوية العراقية**: يحتاج خدمة OCR حقيقية (مثل Google Vision أو خدمة عراقية متخصصة)
- **بوابات الدفع** (Zain Cash, Qi Card, FastPay, NassPay): كل واحدة تحتاج عقد تاجر (Merchant Account) رسمي من المزوّد نفسه
- **توليد PDF للعقود**: يمكن إضافته بمكتبة مثل `@react-pdf/renderer` بمجرد تحديد قالب العقد النهائي
- **تطبيق الموبايل**: هذا المشروع موقع ويب فقط (Responsive بالكامل)، يعمل ممتاز على الهاتف من المتصفح. لو تحتاج تطبيق حقيقي على المتاجر (App Store / Google Play) هذا مشروع منفصل (React Native/Flutter)

## خطوات الربط مع Supabase

1. أنشئ مشروعاً جديداً على [supabase.com](https://supabase.com)
2. من **SQL Editor** داخل مشروعك، افتح ملف `supabase/schema.sql` من هذا المستودع، انسخ محتواه بالكامل، والصقه، ثم اضغط **Run**
   - هذا ينشئ كل الجداول، RLS policies، الـ triggers، و Storage buckets
3. من **Project Settings → API** انسخ:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (سري، لا تشاركه ولا ترفعه لأي مكان عام)
4. انسخ `.env.example` باسم `.env.local` وعبّي القيم الثلاث

### إنشاء أول حساب مسؤول (Super Admin)

Supabase Auth لا يدعم "رمز دخول رقمي" افتراضياً — بدل رمز 819273 المطلوب في الفكرة الأصلية،
أنشئ أول حساب مسؤول بهذي الطريقة:

1. من **Authentication → Users** في Supabase Dashboard، اضغط **Add user** وأدخل بريداً وكلمة مرور مؤقتة
2. من **SQL Editor** نفّذ:
   ```sql
   insert into profiles (id, role, full_name, must_reset_pw)
   values ('USER-UUID-من-الخطوة-السابقة', 'super_admin', 'المسؤول الرئيسي', true);
   ```
3. سجّل الدخول بهذا الحساب من `/login` — لاحقاً يمكن إضافة شاشة "تغيير كلمة المرور الإجباري" بالاعتماد على حقل `must_reset_pw`

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح `http://localhost:3000`

## رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "إعداد أولي لمنصة إدارة أقساطك"
git branch -M main
git remote add origin https://github.com/USERNAME/aqsatak-web.git
git push -u origin main
```

> تأكد أن `.env.local` غير مرفوع (موجود في `.gitignore` مسبقاً) — أي مفاتيح Supabase يجب أن تبقى سرية.

## النشر (Deploy)

أسهل خيار مجاني يعمل مباشرة مع Next.js: [Vercel](https://vercel.com)
1. اربط حساب GitHub بـ Vercel
2. اختر هذا المستودع
3. أضف نفس متغيرات `.env.local` في إعدادات Environment Variables بـ Vercel
4. Deploy

## هيكل المشروع

```
aqsatak-web/
  supabase/schema.sql          ← شغّله في Supabase SQL Editor
  src/
    lib/supabase/client.ts     ← Supabase client للمتصفح
    lib/supabase/server.ts     ← Supabase client للسيرفر
    lib/generateClientCodes.ts ← توليد ID/رمز/رابط الزبون
    middleware.ts              ← حماية صفحات /dashboard وغيرها
    app/
      login/                   ← تسجيل الدخول
      (dashboard)/
        dashboard/             ← الإحصائيات العامة
        companies/              ← إدارة الشركات (فيها نموذج إضافة فعلي)
        clients/                ← إدارة الزبائن
        contracts/              ← العقود والأقساط
        subscriptions/          ← الاشتراكات
```

## الخطوة التالية المقترحة

أهم أجزاء تحتاج بناء لاحقاً حسب الأولوية:
1. نموذج إضافة زبون كامل (مع رفع الصور والهوية إلى Storage)
2. نموذج إضافة عقد + جدول أقساط تلقائي
3. تسجيل دفعة قسط (يشغّل الـ trigger تلقائياً)
4. صفحة عامة للزبون على `/client/[slug]` يدخلها برمز الدخول فقط

---
© 2026 جميع الحقوق محفوظة — للمبرمج مصطفى الدباغ — إدارة أقساطك
