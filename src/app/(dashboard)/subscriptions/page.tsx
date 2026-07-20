import { createClient } from "@/lib/supabase/server";

export default async function SubscriptionsPage() {
  const supabase = createClient();
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("id, status, ends_at, companies(name), subscription_plans(name_ar)")
    .order("ends_at", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-1">الاشتراكات</h1>
      <p className="text-sm text-white/40 mb-6">تجربة يومية / شهري / سنوي — مع تنبيه قبل الانتهاء</p>

      <div className="glass rounded-2xl p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs">
              <th className="text-right py-2">الشركة</th>
              <th className="text-right py-2">الخطة</th>
              <th className="text-right py-2">ينتهي في</th>
              <th className="text-right py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {(subs ?? []).map((s: any) => (
              <tr key={s.id} className="border-t border-white/5">
                <td className="py-3">{s.companies?.name}</td>
                <td className="py-3">{s.subscription_plans?.name_ar}</td>
                <td className="py-3">{new Date(s.ends_at).toLocaleDateString("ar-IQ")}</td>
                <td className="py-3">{s.status}</td>
              </tr>
            ))}
            {(!subs || subs.length === 0) && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-white/40">
                  لا توجد اشتراكات بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
