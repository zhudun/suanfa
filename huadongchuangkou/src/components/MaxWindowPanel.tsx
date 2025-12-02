import React from 'react';
import { ArrayElement, WindowStats } from '@/types/sliding-window';

interface MaxWindowPanelProps {
  array: ArrayElement[];
  stats: WindowStats;
}

export const MaxWindowPanel: React.FC<MaxWindowPanelProps> = ({ array, stats }) => {
  const maxSlice = array.slice(stats.maxStart, stats.maxEnd + 1);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">最大窗口子数组</h3>
      <div className="flex items-center flex-wrap gap-2">
        {maxSlice.map(el => (
          <div
            key={`max-${el.index}`}
            className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold shadow"
          >
            {el.value}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-700">
        范围: [{stats.maxStart}, {stats.maxEnd}]，和: <span className="font-bold text-red-600">{stats.maxSum}</span>
      </div>
    </div>
  );
}
