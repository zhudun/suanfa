import React from 'react';
import { ArrayElement } from '@/types/sliding-window';

interface ArrayVisualizationProps {
  array: ArrayElement[];
}

export const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ array }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-end space-x-2">
        {array.map((element) => (
          <div
            key={element.index}
            className={`
              w-12 h-12 flex items-center justify-center
              border-2 rounded-lg font-semibold text-lg
              transition-all duration-300 ease-in-out
              ${
                element.isInWindow
                  ? 'bg-blue-500 text-white border-blue-600 shadow-lg transform scale-110'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
          >
            {element.value}
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        {array.map((element) => (
          <div
            key={`index-${element.index}`}
            className="w-12 text-center text-sm text-gray-500 font-medium"
          >
            {element.index}
          </div>
        ))}
      </div>
    </div>
  );
};