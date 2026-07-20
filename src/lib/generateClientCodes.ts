// يولّد ID ورمز دخول ورابط عام لكل زبون جديد
// استدعِ هذه الدالة قبل insert في جدول clients

function randomDigits(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) out += Math.floor(Math.random() * 10);
  return out;
}

export function generateClientCodes() {
  const num = randomDigits(6);
  return {
    client_code: `CUS-${num}`,
    access_code: `CODE-${randomDigits(6)}`,
    public_slug: `CUS-${num}`, // يُستخدم في الرابط: /client/CUS-xxxxxx
  };
}

// مثال استخدام عند الإضافة:
//
// import { generateClientCodes } from "@/lib/generateClientCodes";
// const codes = generateClientCodes();
// await supabase.from("clients").insert({ ...formData, ...codes });
