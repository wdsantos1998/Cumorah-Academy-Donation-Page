// components/DonationStats.tsx
"use client"

import { useDonationStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// IMPORT THE NEW COMPONENT INSTEAD OF Progress
import { SimpleProgressBar } from "@/components/ui/simple-progress-bar" // <--- NEW IMPORT

// Import the theme
import { theme } from "@/lib/theme"

export function DonationStats() {
    const { donations, totalGoal, getGroupTotals, getGroupPercentages } = useDonationStore()

    // Calculate total raised
    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const percentageRaised = Math.min(100, Math.round((totalRaised / totalGoal) * 100))

    // Get group totals and percentages
    const groupTotals = getGroupTotals()
    const groupPercentages = getGroupPercentages()

    // Use the theme for group colors and names
    const { groupColors, groupNames, groupGoals } = theme

    // Get donor count
    const donorCount = donations.length

    // Get average donation
    const averageDonation = donorCount > 0 ? Math.round(totalRaised / donorCount) : 0

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-teal-500">Campaign Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                ${totalRaised.toLocaleString()} of ${totalGoal.toLocaleString()}
                            </span>
                            <span className="text-sm font-medium">{percentageRaised}%</span>
                        </div>
                        {/* Use SimpleProgressBar for main campaign progress */}
                        <SimpleProgressBar
                            key={`main-progress-${totalRaised}`} // Keep the key for re-render if needed
                            value={percentageRaised}
                            heightClass="h-2"
                            trackColorClass="bg-gray-200"
                            indicatorColorClass="bg-teal-500" // Set the specific color for the indicator
                        />

                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-gray-100 p-3 text-center">
                                <p className="text-sm text-gray-500">Donors</p>
                                <p className="text-xl font-bold text-teal-500">{donorCount}</p>
                            </div>
                            <div className="rounded-lg bg-gray-100 p-3 text-center">
                                <p className="text-sm text-gray-500">Average</p>
                                <p className="text-xl font-bold text-teal-500">${averageDonation}</p>
                            </div>
                            <div className="rounded-lg bg-gray-100 p-3 text-center sm:col-span-1">
                                <p className="text-sm text-gray-500">Days Left</p>
                                <p className="text-xl font-bold text-teal-500">14</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-teal-500">Donation Groups</CardTitle>
                    <p className="text-sm text-gray-500">Each group has a goal of ${Object.values(groupGoals)[0]?.toLocaleString() || '6,000'}</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Object.entries(groupTotals).map(([group, amount]) => {
                            const groupGoal = groupGoals[group as keyof typeof groupGoals]
                            const groupPercentage = groupPercentages[group]
                            const groupColorClass = groupColors[group as keyof typeof groupColors]

                            return (
                                <div key={group} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-3 w-3 rounded-full ${groupColorClass}`}></div>
                                            <span className="text-sm font-medium">{groupNames[group as keyof typeof groupNames]}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {(amount as number).toLocaleString()} of ${groupGoal.toLocaleString()}
                                        </span>
                                    </div>
                                    {/* Use SimpleProgressBar for individual group progress */}
                                    <SimpleProgressBar
                                        key={`group-progress-${group}-${amount}`} // Keep the key for re-render if needed
                                        value={groupPercentage}
                                        heightClass="h-2"
                                        trackColorClass="bg-gray-200"
                                        indicatorColorClass={groupColorClass} // Use the group's specific color
                                    />
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
