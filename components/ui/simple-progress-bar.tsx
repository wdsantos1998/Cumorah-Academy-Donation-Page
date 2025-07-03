// components/ui/SimpleProgressBar.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have this utility

interface SimpleProgressBarProps {
    value: number; // The percentage value (0-100)
    heightClass?: string; // Tailwind class for height (e.g., "h-2")
    trackColorClass?: string; // Tailwind class for the background track color (e.g., "bg-gray-200")
    indicatorColorClass?: string; // Tailwind class for the filled part's color (e.g., "bg-teal-500")
    className?: string; // Additional classes for the root container
}

export function SimpleProgressBar({
    value,
    heightClass = "h-2", // Default height
    trackColorClass = "bg-gray-200", // Default track color
    indicatorColorClass = "bg-teal-500", // Default indicator color
    className,
}: SimpleProgressBarProps) {
    // Ensure value is within 0-100
    const clampedValue = Math.max(0, Math.min(100, value || 0));

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-full",
                heightClass,
                trackColorClass,
                className // Apply any additional classes
            )}
        >
            <div
                className={cn(
                    "h-full rounded-full transition-all ease-in-out duration-500", // Transition for animation
                    indicatorColorClass
                )}
                style={{ width: `${clampedValue}%` }} // Directly set width based on value
            />
        </div>
    );
}
