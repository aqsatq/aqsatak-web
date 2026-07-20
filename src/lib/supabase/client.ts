import { createBrowserClient } from "@supabase/ssr";

// يُستخدم داخل مكونات "use client" في المتصفح
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
