"use client"

import type React from "react"

import { useState } from "react"
import { useDonationStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

// Import the theme
import { theme } from "@/lib/theme"

export function DonationForm() {
  const { addDonation } = useDonationStore()
  const [customAmount, setCustomAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState("25")
  const [name, setName] = useState("")
  const [group, setGroup] = useState("ruth")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the theme for group colors and names
  const { groupColors, groupNames } = theme

  // Preset donation amounts
  const presetAmounts = [
    { value: "10", label: "$10" },
    { value: "25", label: "$25" },
    { value: "50", label: "$50" },
    { value: "75", label: "$75" },
    { value: "100", label: "$100" },
    { value: "other", label: "Other" },
  ]

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value)
    if (value !== "other") {
      setCustomAmount("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Determine the donation amount based on selection
      let donationAmount: number

      if (selectedAmount === "other") {
        if (!customAmount || isNaN(Number(customAmount)) || Number(customAmount) <= 0) {
          toast({
            title: "Invalid Amount",
            description: "Please enter a valid donation amount",
            variant: "destructive",
          })
          setIsSubmitting(false)
          return
        }
        donationAmount = Number(customAmount)
      } else {
        donationAmount = Number(selectedAmount)
      }

      // Add the donation
      addDonation({
        id: Date.now().toString(),
        name: name || "Anonymous",
        amount: donationAmount,
        group,
        message,
        date: new Date().toISOString(),
      })

      // Show success message
      toast({
        title: "Thank you for your donation!",
        description: `Your $${donationAmount} donation to the ${groupNames[group as keyof typeof groupNames]} group has been received.`,
      })

      // Reset form
      setSelectedAmount("25")
      setCustomAmount("")
      setName("")
      setMessage("")
    } catch (error) {
      console.error("Error submitting donation:", error)
      toast({
        title: "Error",
        description: "There was a problem processing your donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-teal-500">Make a Donation</CardTitle>
        <CardDescription>Your contribution helps us reach our goal. All donations are tax-deductible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Donation Amount</Label>
            <RadioGroup value={selectedAmount} onValueChange={handleAmountChange} className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amount) => (
                <div key={amount.value} className="flex items-center">
                  <RadioGroupItem value={amount.value} id={`amount-${amount.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`amount-${amount.value}`}
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                  >
                    {amount.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedAmount === "other" && (
              <div className="mt-2">
                <Label htmlFor="custom-amount">Custom Amount ($)</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  required={selectedAmount === "other"}
                  min="1"
                  step="1"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Select Donation Group</Label>
            <RadioGroup
              value={group}
              onValueChange={setGroup}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ruth" id="ruth" />
                <Label htmlFor="ruth" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  {groupNames.ruth}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nephi" id="nephi" />
                <Label htmlFor="nephi" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  {groupNames.nephi}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="isaiah" id="isaiah" />
                <Label htmlFor="isaiah" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  {groupNames.isaiah}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="esther" id="esther" />
                <Label htmlFor="esther" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-300"></div>
                  {groupNames.esther}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moroni" id="moroni" />
                <Label htmlFor="moroni" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-700"></div>
                  {groupNames.moroni}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              placeholder="Add a message with your donation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Donate Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
