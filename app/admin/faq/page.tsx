'use client';
import { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit, Trash2, Save, X, Check, AlertCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/faq');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải danh sách câu hỏi FAQ' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      order: faqs.length + 1,
      active: true,
    });
  };

  const handleEdit = (item: FAQItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/faq', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error('Lỗi khi lưu câu hỏi FAQ');

      setMessage({ type: 'success', text: isNew ? 'Đã thêm câu hỏi mới!' : 'Đã cập nhật câu hỏi FAQ!' });
      setEditingItem(null);
      fetchFaqs();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: 'error', text: err.message });
      }
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa câu hỏi "${question}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/faq?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Lỗi khi xóa câu hỏi FAQ');

      setMessage({ type: 'success', text: 'Đã xóa câu hỏi FAQ' });
      fetchFaqs();
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
            <HelpCircle className="w-7 h-7 text-[#C7A66A]" />
            <span>Quản Lý Câu Hỏi Thường Gặp (FAQ)</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Chỉnh sửa các câu hỏi thường gặp giúp giải đáp thắc mắc khách hàng và kích hoạt Google Rich Snippets
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Câu Hỏi Mới</span>
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

      {/* FAQ List */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang tải danh sách câu hỏi...
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.1)] p-6 shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono font-bold text-[#C7A66A] bg-[#C7A66A]/10 px-2.5 py-0.5 rounded-full">
                    Q{String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#F4F0E8]">{item.question}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A7A39B] font-light leading-relaxed pl-1">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2.5 rounded-xl bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] transition-colors cursor-pointer"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.question)}
                  className="p-2.5 rounded-xl bg-[#1A1A18] hover:bg-red-950/60 text-[#A7A39B] hover:text-red-400 transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.15)] p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(244,240,232,0.1)] mb-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#F4F0E8]">
                {isNew ? 'Thêm Câu Hỏi Mới' : 'Chỉnh Sửa Câu Hỏi FAQ'}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-[#A7A39B] hover:text-[#F4F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Câu Hỏi Thường Gặp
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  placeholder="VD: Giá cắt tóc tại Sown Barbershop là bao nhiêu?"
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A7A39B] mb-1.5">
                  Câu Trả Lời Chi Tiết
                </label>
                <textarea
                  rows={5}
                  required
                  value={editingItem.answer}
                  onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  placeholder="Nội dung giải đáp chi tiết..."
                  className="w-full px-4 py-2.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] focus:border-[#C7A66A] rounded-xl text-sm text-[#F4F0E8] outline-none leading-relaxed"
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
                  <span>Lưu Câu Hỏi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
