"use client"

import { useState } from "react"

type DonationGroup = {
    name: string
    url: string
}

const donationGroups: DonationGroup[] = [
    { name: "Ruth", url: "https://www.linkedin.com/in/taliaribeiro/" },
    { name: "Nephi", url: "https://www.linkedin.com/in/taliaribeiro/" },
    { name: "Isaiah", url: "https://www.linkedin.com/in/taliaribeiro/" },
    { name: "Esther", url: "https://www.linkedin.com/in/taliaribeiro/" },
    { name: "Moroni", url: "https://www.linkedin.com/in/taliaribeiro/" }
]

export function DonationForm() {
    const [selected, setSelected] = useState<DonationGroup | null>(null)

    const handleDonate = () => {
        if (selected) {
            window.open(selected.url, "_blank")
        }
    }

    return (
        <div className="w-full px-4 py-6 bg-white shadow-lg rounded-2xl">
            <div className="max-w-2xl mx-auto w-full">
                <h2 className="text-3xl font-semibold text-teal-500 mb-6 text-center">Make a Difference</h2>
                <div className="w-full mb-6">
                    <select
                        className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={selected?.name || ""}
                        onChange={(e) => {
                            const group = donationGroups.find(g => g.name === e.target.value)
                            setSelected(group || null)
                        }}
                    >
                        <option value="" disabled>Select a person</option>
                        {donationGroups.map(group => (
                            <option key={group.name} value={group.name}>{group.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    className="w-full bg-teal-500 text-white py-3 rounded-xl text-lg font-medium hover:bg-teal-600 transition"
                    onClick={handleDonate}
                    disabled={!selected}
                >
                    Donate
                </button>
            </div>
        </div>
    )
}
