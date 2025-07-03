import Image from "next/image"
import { DonationThermometer } from "@/components/donation-thermometer"
import { DonationStats } from "@/components/donation-stats"
import { DonationForm } from "@/components/donation-form"
import { theme } from "@/lib/theme"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <Image src="/images/logo.png" alt="Cumorah Academy Logo" width={120} height={120} className="h-auto" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-teal-500 md:text-5xl lg:text-6xl">
            You Can Make a Difference
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
            Be part of the team that helps to bless current and future students.
          </p>
        </header>

        <div className="mb-8 mx-auto max-w-3xl">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-teal-500 mb-2">Our Campaign Structure</h2>
            <p className="text-gray-700 mb-4">
              Our fundraising campaign is divided into five groups, each with a goal of $6,000. Together, we aim to
              raise a total of $30,000 to support our mission.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {Object.entries(theme.groupNames).map(([key, name]) => (
                <div key={key} className="p-2">
                  <div
                    className={`h-4 w-4 rounded-full mx-auto mb-1 ${theme.groupColors[key as keyof typeof theme.groupColors]}`}
                  ></div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-500">$6,000 goal</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-center w-full">
            <DonationThermometer />
          </div>

          <div className="md:col-span-1 lg:col-span-2">
            <div className="space-y-8">
              <DonationStats />
              <DonationForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
