'use client';
import { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Edit, Trash2, Save, X, Upload, Check, AlertCircle } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  alt: string;
  image: string;
  layoutVariant: string;
  order: number;
  active: boolean;
}

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setGallery(data.gallery || []);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải danh sách ảnh gallery' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `gal-${Date.now()}`,
      title: '',
      alt: '',
      image: '/images/gallery/interior.jpg',
      layoutVariant: 'standard',
      order: gallery.length + 1,
      active: true,
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'gallery');

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
      setMessage({ type: 'success', text: 'Tải ảnh không gian lên thành công!' });
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
      const res = await fetch('/api/admin/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu ảnh');

      setMessage({ type: 'success', text: isNew ? 'Đã thêm ảnh mới!' : 'Đã cập nhật ảnh!' });
      setEditingItem(null);
      fetchGallery();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ảnh "${title}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Lỗi khi xóa ảnh');

      setMessage({ type: 'success', text: `Đã xóa ảnh "${title}"` });
      fetchGallery();
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
            <ImageIcon className="w-7 h-7 text-[#C7A66A]" />
            <span>Quản Lý Ảnh Không Gian & Dụng Cụ</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Cập nhật các bức ảnh nghệ thuật về ghế barber, kéo cắt, dụng cụ cạo và không gian tiệm
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Ảnh Mới</span>
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

      {/* Gallery Grid List */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang tải danh sách ảnh không gian...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group"
            >
              <div>
                <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.08)] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#C7A66A] border border-[rgba(244,240,232,0.1)]">
                    FRAME #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#F4F0E8] mb-1">{item.title}</h3>
                <p className="text-xs text-[#A7A39B] font-light leading-relaxed mb-3 line-clamp-2">
                  {item.alt}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[rgba(244,240,232,0.08)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C7A66A] uppercase tracking-wider">
                  Layout: {item.layoutVariant}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
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
                {isNew ? 'Thêm Ảnh Không Gian Mới' : `Chỉnh Sửa: ${editingItem.title}`}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-[#A7A39B] hover:text-[#F4F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Tiêu Đề Bức Ảnh
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="VD: The Vintage Recline Chair"
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Mô Tả Alt (Tối Ưu SEO Google Images)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.alt}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  placeholder="VD: Ghế cắt da cổ điển dưới ánh đèn vàng ấm áp..."
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Kiểu Hiển Thị (Layout Grid)
                </label>
                <select
                  value={editingItem.layoutVariant}
                  onChange={(e) => setEditingItem({ ...editingItem, layoutVariant: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                >
                  <option value="standard">Tiêu chuẩn (Standard 1 cột)</option>
                  <option value="featured">Nổi bật lớn (Featured 2x2)</option>
                  <option value="wide">Dài ngang (Wide 2 cột)</option>
                  <option value="tall">Dọc cao (Tall 2 hàng)</option>
                </select>
              </div>

              {/* Image Upload Row */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Ảnh Không Gian Tiệm
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 aspect-[4/3] rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                    <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="/images/gallery/interior.jpg"
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
                  <span>Lưu Ảnh</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
