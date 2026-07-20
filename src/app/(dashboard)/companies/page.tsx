import { createClient } from "@/lib/supabase/server";
import AddCompanyForm from "./AddCompanyForm";

export default async function CompaniesPage() {
  const supabase = createClient();
  const { data: companies } = await supabase
    .from("companies")
    .select("id, name, phone, activity_type, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-1">الشركات</h1>
      <p className="text-sm text-white/40 mb-6">إضافة وإدارة الشركات المشتركة بالمنصة</p>

      <AddCompanyForm />

      <div className="glass rounded-2xl p-5 mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs">
              <th className="text-right py-2">الاسم</th>
              <th className="text-right py-2">الهاتف</th>
              <th className="text-right py-2">النشاط</th>
              <th className="text-right py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {(companies ?? []).map((c) => (
              <tr key={c.id} className="border-t border-white/5">
                <td className="py-3">{c.name}</td>
                <td className="py-3">{c.phone}</td>
                <td className="py-3">{c.activity_type}</td>
                <td className="py-3">{c.status}</td>
              </tr>
            ))}
            {(!companies || companies.length === 0) && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-white/40">
                  لا توجد شركات بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
