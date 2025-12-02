import React from 'react';
import { WindowState, WindowStats } from '@/types/sliding-window';

interface StatusPanelProps {
  window: WindowState;
  currentStep: number;
  stats: WindowStats;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ window, currentStep, stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">状态信息</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">窗口起始位置:</span>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {window.start}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">窗口结束位置:</span>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {window.end}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">窗口大小:</span>
          <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
            {window.size}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">当前步骤:</span>
          <span className="text-sm font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">
            {currentStep}
          </span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            窗口范围: [{window.start}, {window.end}]
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">当前窗口和:</span>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {stats.currentSum}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">最大窗口和:</span>
            <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
              {stats.maxSum}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            最大范围: [{stats.maxStart}, {stats.maxEnd}]
          </div>
        </div>
      </div>
    </div>
  );
};
