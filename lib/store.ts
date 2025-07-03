"use client"

import { create } from "zustand"
import { theme } from "@/lib/theme"
import { persist } from "zustand/middleware"

export interface Donation {
  id: string
  name: string
  amount: number
  group: string
  message?: string
  date: string
}

interface DonationStore {
  donations: Donation[]
  totalGoal: number
  addDonation: (donation: Donation) => void
  getGroupTotals: () => Record<string, number>
  getGroupPercentages: () => Record<string, number>
  resetDonations: () => void
}

// Calculate total goal based on individual group goals
const totalGoalAmount = Object.values(theme.groupGoals).reduce((sum, goal) => sum + goal, 0)

// Initial mock donations with varied amounts for each group
const initialDonations: Donation[] = [
  // Ruth group - around $1,500
  { id: "1", name: "John Doe", amount: 500, group: "ruth", date: new Date().toISOString() },
  { id: "2", name: "Sarah Johnson", amount: 500, group: "ruth", date: new Date().toISOString() },
  { id: "3", name: "Michael Chen", amount: 500, group: "ruth", date: new Date().toISOString() },

  // Nephi group - around $1,500
  { id: "4", name: "Jane Smith", amount: 500, group: "nephi", date: new Date().toISOString() },
  { id: "5", name: "David Lee", amount: 500, group: "nephi", date: new Date().toISOString() },
  { id: "6", name: "Emma Wilson", amount: 500, group: "nephi", date: new Date().toISOString() },

  // Isaiah group - around $1,500
  { id: "7", name: "Bob Johnson", amount: 500, group: "isaiah", date: new Date().toISOString() },
  { id: "8", name: "Lisa Garcia", amount: 500, group: "isaiah", date: new Date().toISOString() },
  { id: "9", name: "Thomas Wright", amount: 500, group: "isaiah", date: new Date().toISOString() },

  // Esther group - around $1,500
  { id: "10", name: "Alice Brown", amount: 500, group: "esther", date: new Date().toISOString() },
  { id: "11", name: "Robert Kim", amount: 500, group: "esther", date: new Date().toISOString() },
  { id: "12", name: "Olivia Martinez", amount: 500, group: "esther", date: new Date().toISOString() },

  // Moroni group - around $1,500
  { id: "13", name: "Charlie Wilson", amount: 500, group: "moroni", date: new Date().toISOString() },
  { id: "14", name: "Grace Taylor", amount: 500, group: "moroni", date: new Date().toISOString() },
  { id: "15", name: "James Anderson", amount: 500, group: "moroni", date: new Date().toISOString() },
]

export const useDonationStore = create<DonationStore>()(
  persist(
    (set, get) => ({
      donations: initialDonations,
      totalGoal: totalGoalAmount,

      addDonation: (donation) => {
        set((state) => ({
          donations: [...state.donations, donation],
        }))
      },

      getGroupTotals: () => {
        const { donations } = get()

        const groupTotals: Record<string, number> = {
          ruth: 0,
          nephi: 0,
          isaiah: 0,
          esther: 0,
          moroni: 0,
        }

        donations.forEach((donation) => {
          if (groupTotals[donation.group] !== undefined) {
            groupTotals[donation.group] += donation.amount
          }
        })

        return groupTotals
      },

      getGroupPercentages: () => {
        const groupTotals = get().getGroupTotals()
        const percentages: Record<string, number> = {}

        Object.entries(groupTotals).forEach(([group, amount]) => {
          const goal = theme.groupGoals[group as keyof typeof theme.groupGoals]
          percentages[group] = Math.min(100, Math.round(((amount as number) / goal) * 100))
        })

        return percentages
      },

      resetDonations: () => {
        set({ donations: initialDonations })
      },
    }),
    {
      name: "donation-storage",
    },
  ),
)
