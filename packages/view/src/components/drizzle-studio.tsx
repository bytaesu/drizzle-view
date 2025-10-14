"use client";

import { useConfig } from "@/hooks/use-config";

const DrizzleStudio = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading Studio...</p>
      </div>
    );
  }

  return <iframe src={config.studioUrl} className="w-full h-full" />;
};

export default DrizzleStudio;
