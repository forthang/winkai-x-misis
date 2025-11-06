import React, { useRef, useState } from 'react';
import { uploadScript, UploadResponse } from '../api';

interface UploadFormProps {
  onUploadComplete: (data: UploadResponse) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadComplete }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setError('Пожалуйста, выберите ZIP‑архив для загрузки.');
      return;
    }
    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setError('Поддерживаются только ZIP‑архивы.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await uploadScript(file);
      onUploadComplete(data);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки файла');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-base font-medium mb-2" htmlFor="file">
          Загрузите ZIP‑файл со сценарием
        </label>
        <input
          id="file"
          ref={fileInputRef}
          type="file"
          accept=".zip"
          className="block w-full text-base text-gray-800 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark dark:file:bg-primary-dark"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="btn-primary disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Обработка…' : 'Загрузить'}
      </button>
    </form>
  );
};

export default UploadForm;