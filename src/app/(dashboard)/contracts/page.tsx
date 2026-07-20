import { createClient } from "@/lib/supabase/server";

export default async function ContractsPage() {
  const supabase = createClient();
  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, item_name, item_value, remaining_amount, status, clients(full_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-1">العقود والأقساط</h1>
      <p className="text-sm text-white/40 mb-6">
        المتبقي يُحدَّث تلقائياً عبر trigger في قاعدة البيانات عند تسجيل أي دفعة
      </p>

      <div className="glass rounded-2xl p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs">
              <th className="text-right py-2">الزبون</th>
              <th className="text-right py-2">السلعة</th>
              <th className="text-right py-2">قيمة السلعة</th>
              <th className="text-right py-2">المتبقي</th>
              <th className="text-right py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {(contracts ?? []).map((c: any) => (
              <tr key={c.id} className="border-t border-white/5">
                <td className="py-3">{c.clients?.full_name}</td>
                <td className="py-3">{c.item_name}</td>
                <td className="py-3">{Number(c.item_value).toLocaleString()} د.ع</td>
                <td className="py-3">{Number(c.remaining_amount).toLocaleString()} د.ع</td>
                <td className="py-3">{c.status}</td>
              </tr>
            ))}
            {(!contracts || contracts.length === 0) && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-white/40">
                  لا توجد عقود بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
