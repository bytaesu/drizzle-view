"use client";

import { useEffect, useState } from "react";
import { ThemeModeToggle } from "@/components/theme-mode";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, SquareMousePointer } from "lucide-react";
import DrizzleStudio from "@/components/drizzle-studio";
import DrizzleVisualizer from "@/components/drizzle-visualizer";

const Page = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("studio");
  const [savedTheme, setSavedTheme] = useState<string | undefined>();

  // Force dark theme for visualizer tab,
  // restore previous theme when switching back
  useEffect(() => {
    if (activeTab === "visualizer") {
      setSavedTheme(theme);
      setTheme("dark");
      return;
    }

    if (savedTheme && theme !== savedTheme) {
      setTheme(savedTheme);
      return;
    }
  }, [activeTab]);

  return (
    <div className="h-screen flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 gap-0"
      >
        <div className="flex items-center justify-between p-2 border-b">
          <TabsList>
            <TabsTrigger value="studio">
              <Monitor />
              Studio
            </TabsTrigger>
            <TabsTrigger value="visualizer">
              <SquareMousePointer />
              Visualizer
            </TabsTrigger>
          </TabsList>

          <ThemeModeToggle />
        </div>

        <div className="flex-1 relative">
          {/* Keep both components mounted to prevent reload on tab switch */}
          <div
            className={`absolute inset-0 ${
              activeTab === "studio" ? "block" : "hidden"
            }`}
          >
            <DrizzleStudio />
          </div>
          <div
            className={`absolute inset-0 ${
              activeTab === "visualizer" ? "block" : "hidden"
            }`}
          >
            <DrizzleVisualizer />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;
