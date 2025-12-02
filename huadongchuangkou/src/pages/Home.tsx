import React, { useEffect } from 'react';
import { ArrayVisualization } from '@/components/ArrayVisualization';
import { ControlPanel } from '@/components/ControlPanel';
import { StatusPanel } from '@/components/StatusPanel';
import { MaxWindowPanel } from '@/components/MaxWindowPanel';
import { AlgorithmExplanation } from '@/components/AlgorithmExplanation';
import { useSlidingWindow } from '@/hooks/useSlidingWindow';

export default function Home() {
  const {
    array,
    window,
    animation,
    stats,
    initializeArray,
    startAnimation,
    stopAnimation,
    resetAnimation,
    setSpeed
  } = useSlidingWindow();

  useEffect(() => {
    resetAnimation();
  }, [resetAnimation]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            滑动窗口算法演示
          </h1>
          <p className="text-lg text-gray-600">
            通过动画直观理解滑动窗口算法的工作原理
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualization Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Array Visualization */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                数组可视化
              </h2>
              <ArrayVisualization array={array} />
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                控制面板
              </h2>
              <ControlPanel
                isPlaying={animation.isPlaying}
                speed={animation.speed}
                onPlay={startAnimation}
                onPause={stopAnimation}
                onReset={resetAnimation}
                onSpeedChange={setSpeed}
              />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Status Panel */}
            <StatusPanel window={window} currentStep={animation.currentStep} stats={stats} />
            
            {/* Algorithm Explanation */}
            <AlgorithmExplanation currentStep={animation.currentStep} />

            {/* Max Window Panel */}
            <MaxWindowPanel array={array} stats={stats} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>滑动窗口算法演示工具 - 帮助理解算法执行过程</p>
        </div>
      </div>
    </div>
  );
}
