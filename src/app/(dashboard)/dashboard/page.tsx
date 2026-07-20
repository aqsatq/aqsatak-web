import { createClient } from "@/lib/supabase/server";
import StatCard from "@/components/StatCard";

export default async function DashboardPage() {
  const supabase = createClient();

  const [{ count: companiesCount }, { count: clientsCount }, { count: lateCount }, { data: contracts }] =
    await Promise.all([
      supabase.from("companies").select("*", { count: "exact", head: true }),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("installments").select("*", { count: "exact", head: true }).eq("status", "late"),
      supabase
        .from("contracts")
        .select("item_name, remaining_amount, status, clients(full_name), companies(name)")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-1">نظرة عامة</h1>
      <p className="text-sm text-white/40 mb-6">بيانات حيّة من قاعدة البيانات</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="عدد الشركات" value={companiesCount ?? 0} />
        <StatCard label="عدد الزبائن" value={clientsCount ?? 0} accent="gold" />
        <StatCard label="الأقساط المتأخرة" value={lateCount ?? 0} accent="red" />
        <StatCard label="آخر تحديث" value="الآن" sub="مباشر عبر Supabase" />
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="text-sm font-bold mb-4">أحدث العقود</div>
        {!contracts || contracts.length === 0 ? (
          <p className="text-sm text-white/40">
            لا توجد عقود بعد — أضف شركة وزبوناً وعقداً من صفحاتها لتظهر البيانات هنا.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs">
                <th className="text-right py-2">الزبون</th>
                <th className="text-right py-2">الشركة</th>
                <th className="text-right py-2">السلعة</th>
                <th className="text-right py-2">المتبقي</th>
                <th className="text-right py-2">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c: any, i: number) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-3">{c.clients?.full_name}</td>
                  <td className="py-3">{c.companies?.name}</td>
                  <td className="py-3">{c.item_name}</td>
                  <td className="py-3">{Number(c.remaining_amount).toLocaleString()} د.ع</td>
                  <td className="py-3">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
