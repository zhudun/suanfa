import React from 'react';

const algorithmSteps = [
  {
    description: "初始化窗口，设置窗口的起始位置和结束位置",
    code: "window.start = 0; window.end = size - 1;",
  },
  {
    description: "处理当前窗口内的所有元素",
    code: "for (let i = window.start; i <= window.end; i++) { process(array[i]); }",
  },
  {
    description: "滑动窗口到下一个位置",
    code: "window.start++; window.end++;",
  },
  {
    description: "重复步骤直到窗口到达数组末尾",
    code: "while (window.end < array.length) { ... }",
  }
];

interface AlgorithmExplanationProps {
  currentStep: number;
}

export const AlgorithmExplanation: React.FC<AlgorithmExplanationProps> = ({ currentStep }) => {
  const currentStepIndex = Math.min(currentStep, algorithmSteps.length - 1);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">算法说明</h3>
      
      <div className="space-y-4">
        {algorithmSteps.map((step, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border transition-all duration-200
              ${
                index === currentStepIndex
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${
                  index === currentStepIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }
              `}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">{step.description}</p>
                <div className={`
                  p-3 rounded font-mono text-sm
                  ${
                    index === currentStepIndex
                      ? 'bg-gray-800 text-green-400 border border-gray-700'
                      : 'bg-gray-100 text-gray-700'
                  }
                `}>
                  {step.code}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">核心概念</h4>
        <p className="text-sm text-yellow-700">
          滑动窗口算法通过维护一个固定大小的窗口在数组上滑动，
          每次处理窗口内的元素，适用于子数组、子串等问题。
        </p>
      </div>
    </div>
  );
};