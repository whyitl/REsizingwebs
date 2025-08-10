import React, { Suspense } from 'react';

// Lazy load the Beams component to catch import errors
const BeamsLazy = React.lazy(() => import('./Beams'));

interface BeamsSafeProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
}

const BeamsSafe: React.FC<BeamsSafeProps> = (props) => {
  return (
    <Suspense 
      fallback={
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
          <div className="light-rays-css"></div>
          <div className="light-rays-secondary"></div>
        </div>
      }
    >
      <ErrorBoundary fallback={
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
          <div className="light-rays-css"></div>
          <div className="light-rays-secondary"></div>
        </div>
      }>
        <BeamsLazy {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Beams component failed, falling back to CSS animation:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default BeamsSafe;