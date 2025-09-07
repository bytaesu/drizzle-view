"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({
  language,
  value,
  className,
}: {
  language: string;
  value: string;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn("my-4 w-full overflow-hidden rounded-md border", className)}
    >
      <div className="bg-muted/80 text-muted-foreground flex items-center justify-between p-3 text-xs">
        <span>{language}</span>
      </div>
      <div className="bg-muted/40 w-full overflow-x-auto border-t">
        <div className="min-w-full">
          <SyntaxHighlighter
            PreTag="div"
            language={language}
            style={atomDark}
            customStyle={{
              fontSize: "0.75rem",
              lineHeight: "1.7",
              margin: 0,
              borderRadius: 0,
              width: "100%",
              minWidth: "100%",
              backgroundColor: "transparent",
            }}
            codeTagProps={{
              className: "text-xs leading-tight font-mono",
            }}
          >
            {value.trimEnd()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
