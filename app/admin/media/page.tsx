'use client';
import { useState, useEffect } from 'react';
import { FolderOpen, Upload, Copy, Check, Search, Trash2 } from 'lucide-react';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  folder: string;
  updatedAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMedia(data.media || []);
    } catch (err) {
      console.error('Error loading media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'uploads');

        await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      }
      fetchMedia();
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (url: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tệp ảnh này không? Hành động này không thể hoàn tác.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/media?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        // Remove from local state
        setMedia((prev) => prev.filter((m) => m.url !== url));
      } else {
        const data = await res.json();
        alert(data.error || 'Lỗi khi xóa ảnh');
      }
    } catch (err) {
      console.error('Error deleting media:', err);
      alert('Không thể kết nối đến máy chủ');
    }
  };

  const filteredMedia = media.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(244,240,232,0.1)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8] flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-[#C7A66A]" />
            <span>Thư Viện Ảnh Dự Án (Media Library)</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A39B] mt-1 font-light">
            Toàn bộ ảnh được lưu trữ và đồng bộ hóa trực tiếp trong dự án
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <label className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#C7A66A]/20">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Đang tải lên...' : 'Tải Ảnh Mới Lên'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121211] border border-[rgba(244,240,232,0.08)]">
        <span className="text-xs font-mono text-[#A7A39B] uppercase tracking-wider">
          Tổng số ảnh: {filteredMedia.length}
        </span>
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#A7A39B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên tệp ảnh..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#0B0B0A] border border-[rgba(244,240,232,0.12)] rounded-lg text-xs text-[#F4F0E8] outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Đang quét thư viện ảnh...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Không tìm thấy tệp ảnh nào.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMedia.map((file) => (
            <div
              key={file.url}
              className="group rounded-2xl bg-[#121211] border border-[rgba(244,240,232,0.08)] hover:border-[#C7A66A]/50 p-2.5 flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0B0B0A] border border-[rgba(244,240,232,0.06)] mb-2">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <p className="text-[11px] font-mono font-bold text-[#F4F0E8] truncate mb-0.5" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[10px] text-[#A7A39B] font-mono">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-[rgba(244,240,232,0.06)] flex items-center gap-2">
                <button
                  onClick={() => handleCopy(file.url)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-[10px] font-mono font-bold transition-colors cursor-pointer"
                  title="Sao chép đường dẫn"
                >
                  {copiedUrl === file.url ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Chép URL</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(file.url)}
                  className="p-1 px-2 rounded-lg bg-red-950/20 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors cursor-pointer"
                  title="Xóa hình ảnh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

