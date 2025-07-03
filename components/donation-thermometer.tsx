"use client"

import { useState, useEffect } from "react"
import { useDonationStore } from "@/lib/store"
// Import the theme
import { theme } from "@/lib/theme"

export function DonationThermometer() {
    const { donations, totalGoal } = useDonationStore() // No need for getGroupTotals here for the main bar
    const [animate, setAnimate] = useState(false)

    // Use the theme for group colors and names (still needed for the legend)
    const { groupColors, groupNames, groupGoals } = theme

    // Calculate total raised
    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0)
    // Calculate the percentage of the goal achieved
    const percentageRaised = Math.min(100, (totalRaised / totalGoal) * 100)

    // Reset animation when totalRaised changes (or donations to be safe)
    useEffect(() => {
        setAnimate(false)
        const timer = setTimeout(() => {
            setAnimate(true)
        }, 50)
        return () => clearTimeout(timer)
    }, [totalRaised, donations]) // Trigger animation when totalRaised or donations change

    // Get group totals (still needed for the legend below the thermometer)
    const groupTotals = useDonationStore.getState().getGroupTotals();


    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-teal-500">${totalRaised.toLocaleString()}</h2>
                <p className="text-gray-600">raised of ${totalGoal.toLocaleString()} goal</p>
            </div>

            <div className="relative h-[400px] w-[100px] rounded-full bg-gray-200 overflow-hidden">
                {/* The single, solid fill bar */}
                <div
                    className={`absolute bottom-0 left-0 right-0 rounded-full bg-teal-500 transition-all duration-1000 ease-out`}
                    style={{
                        height: animate ? `${percentageRaised}%` : "0%"
                    }}
                ></div>

                {/* Thermometer markings */}
                <div className="absolute -right-8 top-0 h-full">
                    {[0, 25, 50, 75, 100].map((mark) => (
                        <div key={mark} className="relative" style={{ bottom: `${mark}%`, top: `${100 - mark - 2}%` }}>
                            <div className="absolute left-0 h-[2px] w-3 bg-gray-400"></div>
                            <span className="absolute left-4 text-sm font-medium">{mark}%</span>
                        </div>
                    ))}
                </div>

                {/* Thermometer bulb */}
                <div className="absolute -bottom-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-teal-500 shadow-lg"></div>
            </div>


        </div>
    )
}
