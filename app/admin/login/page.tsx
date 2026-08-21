'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Scissors, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập không thành công');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi không xác định');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#C7A66A] selection:text-[#0B0B0A]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C7A66A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.12)] p-7 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Icon Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/40 text-[#C7A66A] flex items-center justify-center mb-4 shadow-lg shadow-[#C7A66A]/10">
            <Scissors className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#C7A66A] mb-1">
            HỆ THỐNG QUẢN TRỊ NỘI DUNG
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8]">
            Sown Barbershop
          </h1>
          <p className="text-xs text-[#A7A39B] mt-1">
            Đăng nhập để quản lý bảng giá, kiểu tóc và thông tin tiệm
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5 animate-shake">
            <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Tài Khoản
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A7A39B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập (admin)"
                className="w-full pl-10 pr-4 py-3 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A7A39B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-mono font-extrabold uppercase tracking-widest text-xs bg-[#C7A66A] hover:bg-[#D8B87A] text-[#0B0B0A] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C7A66A]/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Đang xác thực...</span>
              ) : (
                <>
                  <span>Vào Bảng Điều Khiển</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Credentials Tip */}
        <div className="mt-8 pt-6 border-t border-[rgba(244,240,232,0.08)] text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A18] text-[11px] text-[#A7A39B] font-mono">
            <Sparkles className="w-3 h-3 text-[#C7A66A]" />
            <span>Mặc định: admin / sownbarber2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
