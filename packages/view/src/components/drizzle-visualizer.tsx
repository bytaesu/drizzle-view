"use client";

import { useConfig } from "@/hooks/use-config";

const DrizzleVisualizer = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading Visualizer...</p>
      </div>
    );
  }

  return <iframe src={config.visualizerUrl} className="w-full h-full" />;
};

export default DrizzleVisualizer;
