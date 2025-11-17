"use client"

import { PricingTable } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PricingPage() {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl"
      >
        <PricingTable
              />
      </motion.div>
  )
}
