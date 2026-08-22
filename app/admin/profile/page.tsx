'use client';
import { useState, useEffect } from 'react';
import { Settings, Save, Upload, Check, AlertCircle, Phone, MapPin, Clock, Globe } from 'lucide-react';

interface ShopProfileData {
  shopName: string;
  name: string;
  logo: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroImage: string;
  barberImage: string;
  bioHeadline: string;
  bioParagraphs: string[];
  phone: string;
  address: string;
  city: string;
  country: string;
  establishedYear: string;
  openingHours: { label: string; value: string }[];
  socials: { facebook?: string; zalo?: string; messenger?: string; googleMaps?: string };
  booking: { primaryUrl?: string; primaryLabel?: string };
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ShopProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      setProfile(data.profile);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải thông tin tiệm' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'logo' | 'heroImage' | 'barberImage') => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', fieldName === 'logo' ? 'logo' : fieldName === 'barberImage' ? 'barber' : 'hero');

    try {
      setUploadingField(fieldName);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setProfile({
        ...profile,
        [fieldName]: data.url,
      });
      setMessage({ type: 'success', text: `Tải ảnh ${fieldName} lên thành công!` });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu thông tin tiệm');

      setMessage({ type: 'success', text: 'Đã cập nhật toàn bộ thông tin tiệm thành công!' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
        Đang tải thông tin tiệm...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(244,240,232,0.1)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8] flex items-center gap-3">
            <Settings className="w-7 h-7 text-[#C7A66A]" />
            <span>Thông Tin Tiệm & Cấu Hình Liên Hệ</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Cập nhật tên tiệm, số hotline, địa chỉ Google Maps, giờ làm việc và câu chuyện Master Barber
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Đang Lưu...' : 'Lưu Thay Đổi'}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
              : 'bg-red-950/40 border border-red-800/60 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="opacity-70 hover:opacity-100">
            <Check className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Core Brand & Images Card */}
        <div className="rounded-[28px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold uppercase tracking-tight text-[#C7A66A] pb-3 border-b border-[rgba(244,240,232,0.08)]">
            1. Nhận Diện Thương Hiệu & Hình Ảnh Chính
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Tên Tiệm (Shop Name)
              </label>
              <input
                type="text"
                value={profile.shopName}
                onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Tên Master Barber
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[rgba(244,240,232,0.06)]">
            {/* Logo */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Logo Quán (Tròn)
              </label>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#0B0B0A] border border-[#C7A66A]/40 shrink-0">
                  <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingField === 'logo' ? '...' : 'Đổi Logo'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
                </label>
              </div>
            </div>

            {/* Hero Artwork */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Ảnh Biểu Tượng Hero
              </label>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                  <img src={profile.heroImage} alt="Hero" className="w-full h-full object-cover" />
                </div>
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingField === 'heroImage' ? '...' : 'Đổi Ảnh Hero'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'heroImage')} className="hidden" />
                </label>
              </div>
            </div>

            {/* Barber Portrait */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Ảnh Chân Dung Barber
              </label>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                  <img src={profile.barberImage} alt="Barber" className="w-full h-full object-cover" />
                </div>
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingField === 'barberImage' ? '...' : 'Đổi Ảnh Thợ'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'barberImage')} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Contact, Address & Hours Card */}
        <div className="rounded-[28px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold uppercase tracking-tight text-[#C7A66A] pb-3 border-b border-[rgba(244,240,232,0.08)] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>2. Địa Chỉ, Hotline & Giờ Phục Vụ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C7A66A]" />
                Số Hotline / Zalo
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C7A66A]" />
                Tỉnh / Thành Phố
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Địa Chỉ Chi Tiết (Street Address)
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[rgba(244,240,232,0.06)]">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C7A66A]" />
                Giờ Mở Cửa (Thứ 2 — Thứ 7)
              </label>
              <input
                type="text"
                value={profile.openingHours?.[0]?.value || '08:30 — 20:00'}
                onChange={(e) => {
                  const updated = [...(profile.openingHours || [])];
                  if (updated[0]) updated[0].value = e.target.value;
                  setProfile({ ...profile, openingHours: updated });
                }}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C7A66A]" />
                Giờ Mở Cửa (Chủ Nhật)
              </label>
              <input
                type="text"
                value={profile.openingHours?.[1]?.value || '08:30 — 18:30'}
                onChange={(e) => {
                  const updated = [...(profile.openingHours || [])];
                  if (updated[1]) updated[1].value = e.target.value;
                  setProfile({ ...profile, openingHours: updated });
                }}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[rgba(244,240,232,0.06)]">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Link Facebook Cá Nhân
              </label>
              <input
                type="text"
                value={profile.socials?.facebook || ''}
                onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, facebook: e.target.value } })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
                Link Đặt Lịch Zalo (Primary URL)
              </label>
              <input
                type="text"
                value={profile.booking?.primaryUrl || 'https://zalo.me/0987443091'}
                onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, primaryUrl: e.target.value } })}
                className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(244,240,232,0.06)]">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Link Chỉ Đường Google Maps (Mở khi khách bấm vào địa chỉ)
            </label>
            <input
              type="text"
              value={profile.socials?.googleMaps || ''}
              onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, googleMaps: e.target.value } })}
              placeholder="https://www.google.com/maps/search/?api=1&query=..."
              className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
            />
          </div>
        </div>

        {/* 3. Bio & Story Card */}
        <div className="rounded-[28px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold uppercase tracking-tight text-[#C7A66A] pb-3 border-b border-[rgba(244,240,232,0.08)]">
            3. Câu Chuyện & Châm Ngôn Master Barber
          </h2>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Tiêu Đề Giới Thiệu (Bio Headline)
            </label>
            <input
              type="text"
              value={profile.bioHeadline}
              onChange={(e) => setProfile({ ...profile, bioHeadline: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-2">
              Đoạn Văn Giới Thiệu (Mỗi dòng 1 đoạn)
            </label>
            <textarea
              rows={4}
              value={profile.bioParagraphs?.join('\n\n') || ''}
              onChange={(e) => setProfile({ ...profile, bioParagraphs: e.target.value.split('\n\n').filter((x) => x.trim()) })}
              className="w-full px-4 py-3 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl font-mono text-xs font-extrabold uppercase tracking-widest bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 cursor-pointer shadow-xl shadow-[#C7A66A]/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang Lưu...' : 'Lưu Toàn Bộ Cấu Hình'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
