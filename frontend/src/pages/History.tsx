import React, { useEffect, useState } from 'react';
import HistoryList from '../components/HistoryList';
import TableDisplay from '../components/TableDisplay';
import { UploadInfo, UploadDetail, getHistory, getResult, getDownloadUrl } from '../api';

const HistoryPage: React.FC = () => {
  const [uploads, setUploads] = useState<UploadInfo[]>([]);
  const [selected, setSelected] = useState<UploadDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const items = await getHistory();
        setUploads(items);
      } catch (err: any) {
        setError(err.message || 'Не удалось получить историю');
      }
    }
    fetchHistory();
  }, []);

  const handleSelect = async (id: number) => {
    setError(null);
    try {
      const detail = await getResult(id);
      setSelected(detail);
    } catch (err: any) {
      setError(err.message || 'Ошибка при получении результата');
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold">История загрузок</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <HistoryList uploads={uploads} onSelect={handleSelect} />
        {selected && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">
                {selected.filename}
              </h2>
              <a
                href={getDownloadUrl(selected.id)}
                className="btn-primary"
              >
                Скачать Excel
              </a>
            </div>
            <TableDisplay data={selected.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;