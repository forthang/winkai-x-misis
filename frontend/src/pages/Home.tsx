import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import TableDisplay from '../components/TableDisplay';
import { UploadResponse } from '../api';
import CanvasDisplay from '../components/CanvasDisplay';

const Home: React.FC = () => {
  const [tableData, setTableData] = useState<UploadResponse | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleUploadComplete = (data: UploadResponse) => {
    setTableData(data);
    setShowCanvas(false);
  };

  return (
    <div className="p-4">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold">Загрузка сценария</h1>
        <UploadForm onUploadComplete={handleUploadComplete} />
        {tableData && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Результат</h2>
            {/* Download and view toggle buttons */}
            <div className="flex flex-wrap items-center space-x-4">
              <a
                href={`/download/${tableData.id}`}
                className="btn-primary"
              >
                Скачать Excel
              </a>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowCanvas((prev) => !prev)}
              >
                {showCanvas ? 'Таблица' : 'Канвас'}
              </button>
            </div>
            {showCanvas ? (
              <CanvasDisplay data={tableData.data} />
            ) : (
              <TableDisplay data={tableData.data} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;