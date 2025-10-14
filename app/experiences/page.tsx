"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { motion } from "framer-motion"

const menuItems = ["Tours", "Events", "Live Channels"]

// Sample data
const data: any = {
  Tours: [
    { name: "Morocco Desert Trip", date: "2025-10-20", price: "$120" },
    { name: "Atlas Mountains Hike", date: "2025-11-01", price: "$80" },
  ],
  Events: [
    { name: "Music Festival", date: "2025-12-10", location: "Marrakech" },
    { name: "Food Expo", date: "2025-11-15", location: "Casablanca" },
  ],
  "Live Channels": [
    { name: "Cooking Show", viewers: 1200 },
    { name: "Live Tour", viewers: 500 },
  ],
}

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState("Tours")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="border-r border-muted p-4">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Menu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-primary/10 ${
                  activeTab === item ? "bg-primary/20 font-semibold" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{activeTab}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(data[activeTab][0] || {}).map((col) => (
                      <TableHead key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data[activeTab].map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((val, i) => (
                        <TableCell key={i}>{val}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
