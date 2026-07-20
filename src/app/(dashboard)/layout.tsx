import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

const NAV = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/companies", label: "الشركات" },
  { href: "/clients", label: "الزبائن" },
  { href: "/contracts", label: "العقود والأقساط" },
  { href: "/subscriptions", label: "الاشتراكات" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name, role").eq("id", user.id).single()
    : { data: null };

  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] shrink-0 border-l border-white/10 bg-black2/60 p-6 flex flex-col gap-1">
        <div className="font-display text-xl font-extrabold brand-gradient mb-1">إدارة أقساطك</div>
        <div className="text-xs text-white/40 mb-8">كل أقساطك بمكان واحد</div>

        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </aside>

      <div className="flex-1 min-w-0 p-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
          <div className="text-sm text-white/50">
            {profile ? `مرحباً، ${profile.full_name} (${profile.role})` : ""}
          </div>
          <LogoutButton />
        </div>
        {children}
        <footer className="text-center text-[11px] text-white/30 mt-12 pb-4">
          © 2026 جميع الحقوق محفوظة — للمبرمج مصطفى الدباغ — إدارة أقساطك
        </footer>
      </div>
    </div>
  );
}
