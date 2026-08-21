'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Scissors,
  Sparkles,
  Image,
  Star,
  HelpCircle,
  Settings,
  FolderOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Tổng Quan', href: '/admin', icon: LayoutDashboard },
  { label: 'Dịch Vụ & Giá', href: '/admin/services', icon: Scissors },
  { label: 'Bộ Sưu Tập Tóc', href: '/admin/styles', icon: Sparkles },
  { label: 'Không Gian Tiệm', href: '/admin/gallery', icon: Image },
  { label: 'Đánh Giá Khách', href: '/admin/testimonials', icon: Star },
  { label: 'Câu Hỏi FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Thông Tin Tiệm', href: '/admin/profile', icon: Settings },
  { label: 'Thư Viện Ảnh', href: '/admin/media', icon: FolderOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    fetch('/api/admin/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex items-center justify-center font-mono text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#C7A66A] border-t-transparent animate-spin" />
          <span className="text-[#A7A39B] uppercase tracking-widest text-xs">Đang tải bảng điều khiển...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex selection:bg-[#C7A66A] selection:text-[#0B0B0A]">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col justify-between bg-[#121211] border-r border-[rgba(244,240,232,0.1)] p-6 shrink-0 h-screen sticky top-0">
        <div>
          {/* Brand Badge */}
          <div className="flex items-center gap-3 pb-6 border-b border-[rgba(244,240,232,0.08)]">
            <div className="w-10 h-10 rounded-full bg-[#C7A66A] text-[#0B0B0A] flex items-center justify-center font-black text-base shadow-lg shadow-[#C7A66A]/20 shrink-0">
              ✂
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold uppercase tracking-tight text-sm text-[#F4F0E8] truncate">
                Sown Barbershop
              </span>
              <span className="text-[10px] font-mono text-[#C7A66A] uppercase tracking-widest">
                CMS QUẢN TRỊ NỘI DUNG
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C7A66A] text-[#0B0B0A] shadow-md shadow-[#C7A66A]/15 font-extrabold'
                      : 'text-[#A7A39B] hover:text-[#F4F0E8] hover:bg-[#1A1A18]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0B0A]' : 'text-[#C7A66A]'}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[rgba(244,240,232,0.08)] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] hover:text-[#F4F0E8] hover:bg-[#1A1A18] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C7A66A]" />
              Xem Trang Web
            </span>
            <span className="text-[10px] text-[#A7A39B]/60">↗</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#121211] border-b border-[rgba(244,240,232,0.1)] sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C7A66A] text-[#0B0B0A] flex items-center justify-center font-bold text-xs">
              ✂
            </div>
            <span className="font-bold text-sm text-[#F4F0E8]">Sown Admin</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-[#1A1A18] text-[#F4F0E8] border border-[rgba(244,240,232,0.1)]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Slide-down Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#141413] border-b border-[rgba(244,240,232,0.12)] p-4 space-y-1 z-20">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider ${
                    isActive ? 'bg-[#C7A66A] text-[#0B0B0A]' : 'text-[#A7A39B]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 mt-3 border-t border-[rgba(244,240,232,0.08)] flex justify-between">
              <a href="/" target="_blank" className="text-xs text-[#C7A66A] font-mono">
                Xem Trang Web ↗
              </a>
              <button onClick={handleLogout} className="text-xs text-red-400 font-mono">
                Đăng Xuất
              </button>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
