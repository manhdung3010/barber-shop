'use client';
import { useState, useEffect } from 'react';
import { Scissors, Plus, Edit, Trash2, Save, X, Upload, Check, AlertCircle } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  categoryLabel?: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[] | string;
  order: number;
  active: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải danh sách dịch vụ' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `svc-${Date.now()}`,
      name: '',
      categoryLabel: 'CẮT TÓC THIẾT KẾ',
      description: '',
      price: '100.000đ',
      duration: '45 PHÚT',
      image: '/images/services/haircut.jpg',
      features: ['Tư vấn kiểu tóc', 'Cắt kéo tỉ mỉ', 'Gội sấy tạo kiểu'],
      order: services.length + 1,
      active: true,
    });
  };

  const handleEdit = (item: ServiceItem) => {
    setIsNew(false);
    let parsedFeatures: string[] = [];
    if (typeof item.features === 'string') {
      try {
        parsedFeatures = JSON.parse(item.features);
      } catch {
        parsedFeatures = [item.features];
      }
    } else {
      parsedFeatures = item.features || [];
    }

    setEditingItem({
      ...item,
      features: parsedFeatures,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'services');

    try {
      setUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEditingItem({
        ...editingItem,
        image: data.url,
      });
      setMessage({ type: 'success', text: 'Tải ảnh dịch vụ lên thành công!' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu dịch vụ');

      setMessage({ type: 'success', text: isNew ? 'Đã thêm dịch vụ mới!' : 'Đã cập nhật dịch vụ!' });
      setEditingItem(null);
      fetchServices();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Lỗi khi xóa dịch vụ');

      setMessage({ type: 'success', text: `Đã xóa dịch vụ "${name}"` });
      fetchServices();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(244,240,232,0.1)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8] flex items-center gap-3">
            <Scissors className="w-7 h-7 text-[#C7A66A]" />
            <span>Quản Lý Dịch Vụ & Bảng Giá</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Chỉnh sửa tên dịch vụ, mức giá, thời lượng, đặc điểm nổi bật và ảnh đại diện
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Dịch Vụ Mới</span>
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
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Services Grid List */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang tải dữ liệu dịch vụ...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            let featuresList: string[] = [];
            if (typeof item.features === 'string') {
              try {
                featuresList = JSON.parse(item.features);
              } catch {
                featuresList = [item.features];
              }
            } else {
              featuresList = item.features || [];
            }

            return (
              <div
                key={item.id}
                className="rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                <div>
                  {/* Service Thumbnail Image */}
                  <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.08)] mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B0B0A]/80 backdrop-blur-md text-[11px] font-mono font-bold text-[#C7A66A] border border-[rgba(244,240,232,0.1)]">
                      {item.duration}
                    </div>
                  </div>

                  {/* Category Tag */}
                  {item.categoryLabel && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C7A66A] block mb-1">
                      {item.categoryLabel}
                    </span>
                  )}

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#F4F0E8]">{item.name}</h3>
                    <span className="text-base font-black text-[#C7A66A] font-mono">{item.price}</span>
                  </div>

                  <p className="text-xs text-[#A7A39B] font-light leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Features Pill List */}
                  <div className="space-y-1.5 pt-3 border-t border-[rgba(244,240,232,0.06)] mb-4">
                    {featuresList.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#A7A39B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[rgba(244,240,232,0.08)] flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2.5 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2.5 rounded-xl bg-[#1A1A18] hover:bg-red-950/60 text-[#A7A39B] hover:text-red-400 transition-colors cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.15)] p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(244,240,232,0.1)] mb-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#F4F0E8]">
                {isNew ? 'Thêm Gói Dịch Vụ Mới' : `Chỉnh Sửa: ${editingItem.name}`}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-[#A7A39B] hover:text-[#F4F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Tên Dịch Vụ
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="VD: Cắt Fade Chuyên Sâu"
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Danh Mục Nhãn
                  </label>
                  <input
                    type="text"
                    value={editingItem.categoryLabel || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, categoryLabel: e.target.value })}
                    placeholder="VD: KỸ THUẬT FADE SẮC BÉN"
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Mức Giá
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    placeholder="VD: 100.000đ"
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Thời Lượng
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    placeholder="VD: 45 PHÚT"
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Mô Tả Dịch Vụ
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Mô tả các bước thực hiện..."
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              {/* Image Upload Row */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Ảnh Minh Họa Dịch Vụ
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                    <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="/images/services/fade.jpg"
                      className="w-full px-3 py-2 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-lg text-xs text-[#F4F0E8] outline-none mb-2"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải ảnh...' : 'Tải Ảnh Mới Lên'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Features Array Input */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Các Đặc Điểm Nổi Bật (Mỗi dòng 1 ý)
                </label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingItem.features) ? editingItem.features.join('\n') : editingItem.features}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      features: e.target.value.split('\n').filter((x) => x.trim()),
                    })
                  }
                  placeholder="Tư Vấn Tỉ Lệ Khuôn Mặt&#10;Cắt Tỉa Kéo Sắc Nét&#10;Gội Xả & Sấy Tạo Kiểu"
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[rgba(244,240,232,0.1)] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-[#A7A39B] hover:text-[#F4F0E8] bg-[#1A1A18] cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Dịch Vụ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
