import { createClient } from "@/lib/supabase/server";

export default async function ClientsPage() {
  const supabase = createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name, phone, client_code, access_code, public_slug, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-1">الزبائن</h1>
      <p className="text-sm text-white/40 mb-6">
        كل زبون جديد يحصل تلقائياً على ID ورمز دخول ورابط خاص — منطق التوليد في{" "}
        <code className="text-white/60">src/lib/generateClientCodes.ts</code>
      </p>

      <div className="glass rounded-2xl p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs">
              <th className="text-right py-2">الاسم</th>
              <th className="text-right py-2">الهاتف</th>
              <th className="text-right py-2">ID</th>
              <th className="text-right py-2">رمز الدخول</th>
              <th className="text-right py-2">الرابط</th>
            </tr>
          </thead>
          <tbody>
            {(clients ?? []).map((c) => (
              <tr key={c.id} className="border-t border-white/5">
                <td className="py-3">{c.full_name}</td>
                <td className="py-3">{c.phone}</td>
                <td className="py-3">{c.client_code}</td>
                <td className="py-3">{c.access_code}</td>
                <td className="py-3 text-white/50">/client/{c.public_slug}</td>
              </tr>
            ))}
            {(!clients || clients.length === 0) && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-white/40">
                  لا يوجد زبائن بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
