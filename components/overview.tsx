"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Données fictives pour l'exemple
const data = [
  {
    name: "Jan",
    total: 8000,
    recouvrement: 3000,
  },
  {
    name: "Fév",
    total: 12000,
    recouvrement: 5000,
  },
  {
    name: "Mar",
    total: 15000,
    recouvrement: 6500,
  },
  {
    name: "Avr",
    total: 18000,
    recouvrement: 8000,
  },
  {
    name: "Mai",
    total: 22000,
    recouvrement: 10000,
  },
  {
    name: "Juin",
    total: 25000,
    recouvrement: 12000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k €`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString()} €`]}
          labelFormatter={(label) => `Mois: ${label}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          name="Total des dettes"
        />
        <Bar
          dataKey="recouvrement"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary/30"
          name="Recouvrements"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
