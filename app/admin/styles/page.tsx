'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Plus, Edit, Trash2, Save, X, Upload, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface StyleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  order: number;
  active: boolean;
}

const CATEGORIES = [
  { id: 'fade', label: 'Fade Sắc Nét' },
  { id: 'textured', label: 'Textured / Layer' },
  { id: 'classic', label: 'Classic Quý Ông' },
  { id: 'long', label: 'Layer Dài' },
  { id: 'beard', label: 'Tạo Kiểu Râu' },
];

export default function AdminStylesPage() {
  const [styles, setStyles] = useState<StyleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StyleItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchStyles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/styles');
      const data = await res.json();
      setStyles(data.styles || []);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải danh sách kiểu tóc' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  const handleToggleActive = async (item: StyleItem) => {
    const updated = { ...item, active: !item.active };
    try {
      const res = await fetch('/api/admin/styles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Lỗi khi đổi trạng thái');
      setStyles((prev) => prev.map((s) => (s.id === item.id ? updated : s)));
      setMessage({
        type: 'success',
        text: updated.active
          ? `Đã BẬT hiển thị mẫu "${item.title}" ra trang chủ!`
          : `Đã ẨN mẫu "${item.title}" khỏi trang chủ!`,
      });
    } catch (err: unknown) {
      if (err instanceof Error) setMessage({ type: 'error', text: err.message });
    }
  };

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `style-${Date.now()}`,
      title: '',
      category: 'fade',
      description: '',
      image: '/images/styles/low-fade.jpg',
      alt: '',
      order: styles.length + 1,
      active: true,
    });
  };

  const handleEdit = (item: StyleItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'styles');

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
      setMessage({ type: 'success', text: 'Tải ảnh kiểu tóc 3:4 lên thành công!' });
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
      const res = await fetch('/api/admin/styles', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu kiểu tóc');

      setMessage({ type: 'success', text: isNew ? 'Đã thêm kiểu tóc mới!' : 'Đã cập nhật kiểu tóc!' });
      setEditingItem(null);
      fetchStyles();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa kiểu tóc "${title}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/styles?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Lỗi khi xóa kiểu tóc');

      setMessage({ type: 'success', text: `Đã xóa kiểu tóc "${title}"` });
      fetchStyles();
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
            <Sparkles className="w-7 h-7 text-[#C7A66A]" />
            <span>Quản Lý Bộ Sưu Tập Kiểu Tóc</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Cập nhật các mẫu tóc Lookbook (tỷ lệ dọc 3:4) và thông tin kỹ thuật cắt
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Kiểu Tóc Mới</span>
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

      {/* Styles Grid List */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang tải danh sách mẫu tóc...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {styles.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-4 flex flex-col justify-between shadow-xl relative overflow-hidden group"
            >
              <div>
                {/* Portrait 3:4 Image */}
                <div className="relative w-full aspect-[3/4] rounded-[18px] overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.08)] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#C7A66A] border border-[rgba(244,240,232,0.1)]">
                    #{String(index + 1).padStart(2, '0')} · {item.category.toUpperCase()}
                  </div>

                  {/* Active Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                        item.active
                          ? 'bg-emerald-950/85 text-emerald-300 border border-emerald-700/60'
                          : 'bg-zinc-900/85 text-zinc-400 border border-zinc-700/60'
                      }`}
                    >
                      {item.active ? '● Trang Chủ' : '○ Đã Ẩn'}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#F4F0E8] line-clamp-1 mb-1">{item.title}</h3>
                <p className="text-xs text-[#A7A39B] font-light leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[rgba(244,240,232,0.08)] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(item)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    item.active
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/50'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                  }`}
                  title={item.active ? 'Bấm để ẩn khỏi trang chủ' : 'Bấm để hiển thị ra trang chủ'}
                >
                  {item.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.active ? 'Đang Hiện' : 'Đã Ẩn'}</span>
                </button>

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
                {isNew ? 'Thêm Kiểu Tóc Mới' : `Chỉnh Sửa: ${editingItem.title}`}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-[#A7A39B] hover:text-[#F4F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Tên Kiểu Tóc
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="VD: Low Fade / Textured Crop"
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Phân Loại Danh Mục
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label} ({cat.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                    Thứ Tự Sắp Xếp (Order)
                  </label>
                  <input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                  />
                </div>
              </div>

              {/* Active Toggle Checkbox */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)]">
                <input
                  type="checkbox"
                  id="style-active"
                  checked={editingItem.active}
                  onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked })}
                  className="w-4 h-4 accent-[#C7A66A] rounded cursor-pointer"
                />
                <label htmlFor="style-active" className="text-xs text-[#F4F0E8] font-mono font-bold uppercase tracking-wider cursor-pointer">
                  Hiển thị kiểu tóc này ngoài trang chủ
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Mô Tả Kỹ Thuật & Phong Cách
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Mô tả kỹ thuật fade, độ bồng bềnh của nếp tóc..."
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              {/* Image Upload Row (3:4 Portrait) */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Ảnh Chân Dung Kiểu Tóc (Chuẩn 3:4 dọc)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 aspect-[3/4] rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.1)] shrink-0">
                    <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="/images/styles/low-fade.jpg"
                      className="w-full px-3 py-2 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-lg text-xs text-[#F4F0E8] outline-none mb-2"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-xs font-mono font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải ảnh...' : 'Tải Ảnh Dọc 3:4 Lên'}</span>
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
                  <span>Lưu Kiểu Tóc</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
