import { getRoadmap } from "@/lib/aqloss-roadmap"
import RoadmapClient from "./roadmap-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Roadmap | Aqloss",
  description: "What's being worked on, what's planned, and what's sitting in the backlog.",
}

export default async function AqlossRoadmapPage() {
  const milestones = await getRoadmap()
  return <RoadmapClient milestones={milestones} />
}