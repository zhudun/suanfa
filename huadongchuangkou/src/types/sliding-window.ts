export interface ArrayElement {
  value: number;
  index: number;
  isInWindow: boolean;
}

export interface WindowState {
  start: number;
  end: number;
  size: number;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
}

export interface AlgorithmStep {
  description: string;
  code: string;
  lineNumber: number;
}

export interface WindowStats {
  currentSum: number;
  maxSum: number;
  maxStart: number;
  maxEnd: number;
}
