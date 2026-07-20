"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("رمز الدخول أو كلمة المرور غير صحيحة");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 w-full max-w-sm">
        <h1 className="font-display text-2xl font-extrabold brand-gradient text-center mb-1">
          إدارة أقساطك
        </h1>
        <p className="text-center text-sm text-white/50 mb-8">كل أقساطك بمكان واحد</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-white/60 mb-1 block">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-red2"
              placeholder="admin@aqsatak.app"
            />
          </div>
          <div>
            <label className="text-xs text-white/60 mb-1 block">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-red2"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary rounded-lg py-3 text-sm font-bold mt-2 disabled:opacity-50"
          >
            {loading ? "جارِ الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-[11px] text-white/30 mt-8">
          © 2026 جميع الحقوق محفوظة — للمبرمج مصطفى الدباغ
        </p>
      </div>
    </div>
  );
}
