"use client";

import { useEffect, useState } from "react";

interface DrizzleConfig {
  studioUrl: string;
  visualizerUrl: string;
}

const defaultConfig: DrizzleConfig = {
  studioUrl: "http://local.drizzle.studio",
  visualizerUrl: "http://localhost:64738",
};

export function useConfig() {
  const [config, setConfig] = useState<DrizzleConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error("Failed to fetch config, using defaults:", err);
        setError(err as Error);
        // Keep using default config on error
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}
