'use client';
import { useState, useEffect } from 'react';
import { FolderOpen, Upload, Copy, Check, Filter, Search } from 'lucide-react';

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
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [targetFolder, setTargetFolder] = useState<string>('uploads');

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
        formData.append('folder', targetFolder);

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

  const folders = ['all', ...Array.from(new Set(media.map((m) => m.folder)))];

  const filteredMedia = media.filter((item) => {
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
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
            Toàn bộ ảnh được lưu trực tiếp tại thư mục <code>public/images/</code> của dự án
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <select
            value={targetFolder}
            onChange={(e) => setTargetFolder(e.target.value)}
            className="px-3 py-2 bg-[#1A1A18] border border-[rgba(244,240,232,0.12)] rounded-xl text-xs font-mono text-[#F4F0E8] outline-none"
          >
            <option value="uploads">Thư mục: uploads</option>
            <option value="styles">Thư mục: styles</option>
            <option value="services">Thư mục: services</option>
            <option value="gallery">Thư mục: gallery</option>
            <option value="testimonials">Thư mục: testimonials</option>
          </select>

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

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121211] border border-[rgba(244,240,232,0.08)]">
        {/* Folder Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-[#A7A39B] shrink-0 mr-1" />
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${
                selectedFolder === f
                  ? 'bg-[#C7A66A] text-[#0B0B0A]'
                  : 'bg-[#1A1A18] text-[#A7A39B] hover:text-[#F4F0E8]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
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
          Đang quét thư viện ảnh dự án...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-20 text-center text-[#A7A39B] font-mono text-sm">
          Không tìm thấy tệp ảnh nào phù hợp.
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
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#0B0B0A]/80 text-[9px] font-mono text-[#C7A66A]">
                    {file.folder}
                  </span>
                </div>

                <p className="text-[11px] font-mono font-bold text-[#F4F0E8] truncate mb-0.5" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[10px] text-[#A7A39B] font-mono">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-[rgba(244,240,232,0.06)] flex items-center justify-between">
                <button
                  onClick={() => handleCopy(file.url)}
                  className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#1A1A18] hover:bg-[#C7A66A] text-[#A7A39B] hover:text-[#0B0B0A] text-[10px] font-mono font-bold transition-colors cursor-pointer"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
