"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AddCompanyForm() {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase.from("companies").insert({
      name,
      phone,
      activity_type: activity,
    });

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setName("");
    setPhone("");
    setActivity("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[160px]">
        <label className="text-xs text-white/50 block mb-1">اسم الشركة</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-red2"
        />
      </div>
      <div className="flex-1 min-w-[140px]">
        <label className="text-xs text-white/50 block mb-1">الهاتف</label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-red2"
        />
      </div>
      <div className="flex-1 min-w-[140px]">
        <label className="text-xs text-white/50 block mb-1">نوع النشاط</label>
        <input
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-red2"
          placeholder="سيارات / عقارات / إلكترونيات"
        />
      </div>
      <button
        disabled={saving}
        className="btn-primary rounded-lg px-6 py-2 text-sm font-bold disabled:opacity-50"
      >
        {saving ? "جارِ الحفظ..." : "إضافة شركة"}
      </button>
      {error && <p className="text-red-400 text-xs w-full">{error}</p>}
    </form>
  );
}
