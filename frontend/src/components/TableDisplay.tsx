import React from 'react';

interface TableDisplayProps {
  data: Array<Record<string, any>>;
}

/**
 * Render a dynamic table from an array of records.  The columns are
 * derived from the keys of the first record.  For small datasets this
 * works well; for larger or more complex tables consider using a
 * dedicated table component.
 */
const TableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">Нет данных для отображения.</p>;
  }
  const columns = Object.keys(data[0]);
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 whitespace-pre-wrap text-sm">
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;