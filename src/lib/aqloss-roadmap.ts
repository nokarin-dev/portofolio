export type RoadmapStatus = "done" | "in-progress" | "planned"

export interface RoadmapItem {
    title: string
    description: string
    status: RoadmapStatus
    category: string
    version?: string
}

export interface RoadmapMilestone {
    title: string
    subtitle: string
    status: RoadmapStatus
    items: RoadmapItem[]
}

export async function getRoadmap(): Promise<RoadmapMilestone[]> {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/nokarin-dev/Aqloss/main/roadmap.json",
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return []
        return await res.json()
    } catch {
        return []
    }
}