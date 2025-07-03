"use client"

import { useState, useEffect } from "react"
import { useDonationStore } from "@/lib/store"
import { theme } from "@/lib/theme"

export function DonationThermometer() {
    const { donations, totalGoal } = useDonationStore()
    const [animate, setAnimate] = useState(false)

    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const percentageRaised = Math.min(100, (totalRaised / totalGoal) * 100)

    useEffect(() => {
        setAnimate(false)
        const timer = setTimeout(() => setAnimate(true), 50)
        return () => clearTimeout(timer)
    }, [totalRaised, donations])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-teal-500">${totalRaised.toLocaleString()}</h2>
                <p className="text-gray-600">raised of ${totalGoal.toLocaleString()} goal</p>
            </div>

            <div className="relative w-full max-w-[600px] h-[60px] rounded-full bg-gray-200 overflow-hidden">
                {/* Fill bar only */}
                <div
                    className="absolute top-0 left-0 bottom-0 bg-teal-500 transition-all duration-1000 ease-out"
                    style={{
                        width: animate ? `${percentageRaised}%` : "0%",
                        borderRadius: "9999px"
                    }}
                ></div>

                {/* Optional: Markings */}
                <div className="absolute bottom-full left-0 w-full flex justify-between px-1">
                    {[0, 25, 50, 75, 100].map((mark) => (
                        <div key={mark} className="flex flex-col items-center">
                            <div className="h-2 w-[2px] bg-gray-400 mb-1"></div>
                            <span className="text-sm font-medium">{mark}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
