import React from 'react';
import { UploadInfo } from '../api';

interface HistoryListProps {
  uploads: UploadInfo[];
  onSelect: (id: number) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ uploads, onSelect }) => {
  if (!uploads || uploads.length === 0) {
    return <p className="text-sm text-gray-500">История загрузок пуста.</p>;
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {uploads.map((item) => (
        <li key={item.id} className="py-3 flex items-center justify-between">
          <button
            onClick={() => onSelect(item.id)}
            className="text-lg text-primary-dark hover:underline"
          >
            {item.filename}
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(item.created_at).toLocaleString('ru-RU')}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default HistoryList;