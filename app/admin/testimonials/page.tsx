'use client';
import { useState, useEffect } from 'react';
import { Star, Plus, Edit, Trash2, Save, X, Upload, Check, AlertCircle } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  avatar?: string | null;
  rating: number;
  service?: string | null;
  order: number;
  active: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải danh sách đánh giá' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `test-${Date.now()}`,
      quote: '',
      clientName: 'Anh Khách Hàng (Nghi Sơn)',
      avatar: '/images/testimonials/client1.jpg',
      rating: 5,
      service: 'Cắt Fade Chuyên Sâu',
      order: testimonials.length + 1,
      active: true,
    });
  };

  const handleEdit = (item: TestimonialItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'testimonials');

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
        avatar: data.url,
      });
      setMessage({ type: 'success', text: 'Tải ảnh đại diện khách lên thành công!' });
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
      const res = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu đánh giá');

      setMessage({ type: 'success', text: isNew ? 'Đã thêm đánh giá mới!' : 'Đã cập nhật đánh giá!' });
      setEditingItem(null);
      fetchTestimonials();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa đánh giá của "${name}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Lỗi khi xóa đánh giá');

      setMessage({ type: 'success', text: `Đã xóa đánh giá của "${name}"` });
      fetchTestimonials();
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
            <Star className="w-7 h-7 text-[#C7A66A]" />
            <span>Quản Lý Đánh Giá Khách Hàng</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Cập nhật lời khen, số sao đánh giá và ảnh chân dung đại diện của các khách hàng thân thiết
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Đánh Giá Mới</span>
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

      {/* Testimonials Grid List */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang tải danh sách đánh giá...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#C7A66A]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#C7A66A] bg-[#C7A66A]/10 px-2 py-0.5 rounded-full">
                    {item.rating}.0 ★
                  </span>
                </div>

                <p className="text-sm text-[#F4F0E8] font-light leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[rgba(244,240,232,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-[#C7A66A]/40 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1A1A18] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {item.clientName.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="font-bold text-xs text-[#F4F0E8] block truncate">
                      {item.clientName}
                    </span>
                    {item.service && (
                      <span className="text-[10px] text-[#A7A39B] truncate block">
                        {item.service}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.clientName)}
                    className="p-2 rounded-xl bg-[#1A1A18] hover:bg-red-950/60 text-[#A7A39B] hover:text-red-400 transition-colors cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.15)] p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(244,240,232,0.1)] mb-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#F4F0E8]">
                {isNew ? 'Thêm Đánh Giá Mới' : `Chỉnh Sửa: ${editingItem.clientName}`}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-[#A7A39B] hover:text-[#F4F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Tên Khách Hàng
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.clientName}
                  onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                  placeholder="VD: Anh Tuấn Anh (TX. Nghi Sơn)"
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Gói Dịch Vụ Đã Dùng
                  </label>
                  <input
                    type="text"
                    value={editingItem.service || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, service: e.target.value })}
                    placeholder="VD: Cắt Fade Chuyên Sâu"
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Đánh Giá Số Sao
                  </label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  >
                    <option value={5}>5 Sao (Xuất sắc ★★★★★)</option>
                    <option value={4}>4 Sao (Rất tốt ★★★★☆)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Nội Dung Nhận Xét Của Khách
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  placeholder="Cảm nhận về đường kéo, sự phục vụ..."
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              {/* Avatar Upload Row */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Ảnh Đại Diện Khách Hàng
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                    <img src={editingItem.avatar || '/images/testimonials/client1.jpg'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingItem.avatar || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                      placeholder="/images/testimonials/client1.jpg"
                      className="w-full px-3 py-2 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-lg text-xs text-[#F4F0E8] outline-none mb-2"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải ảnh...' : 'Tải Avatar Lên'}</span>
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
                  <span>Lưu Đánh Giá</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
