"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { theme } from "@/lib/theme"

export function ThemeCustomizer() {
  // Initialize with current theme colors
  const [colors, setColors] = useState({
    ruth: "#facc15", // yellow-400
    nephi: "#22c55e", // green-500
    isaiah: "#ef4444", // red-500
    esther: "#93c5fd", // blue-300
    moroni: "#1d4ed8", // blue-700
  })

  const handleColorChange = (group: string, color: string) => {
    setColors({
      ...colors,
      [group]: color,
    })

    // In a real application, this would update the theme
    // For this demo, we'll just log the changes
    console.log("Updated colors:", { ...colors, [group]: color })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Theme Colors</CardTitle>
        <CardDescription>Adjust the colors for each donation group</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Object.entries(theme.groupNames).map(([group, name]) => (
            <div key={group} className="space-y-2">
              <Label htmlFor={`color-${group}`} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: colors[group as keyof typeof colors] }}
                ></div>
                {name}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`color-${group}`}
                  type="color"
                  value={colors[group as keyof typeof colors]}
                  onChange={(e) => handleColorChange(group, e.target.value)}
                  className="h-10 w-10 p-1"
                />
                <Input
                  value={colors[group as keyof typeof colors]}
                  onChange={(e) => handleColorChange(group, e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full">Apply Theme</Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Note: In this demo, color changes are not persisted. In a real application, these would update the site theme.
        </p>
      </CardContent>
    </Card>
  )
}
