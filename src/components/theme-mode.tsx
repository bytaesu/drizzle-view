"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Check, MoonIcon, SunIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function ThemeModeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const modes = [
    { name: "light", label: "Lignt" },
    { name: "dark", label: "Dark" },
    { name: "system", label: "System" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Theme mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {modes.map((mode) => (
          <DropdownMenuItem
            key={mode.name}
            onClick={() => {
              setTheme(mode.name);
            }}
          >
            <span className="flex-1">{mode.label}</span>
            {theme === mode.name && <Check strokeWidth={3} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ThemeModeProvider, ThemeModeToggle };
