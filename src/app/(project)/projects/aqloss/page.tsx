import { getAqlossStats } from "@/lib/aqloss-stats"
import { getChangelog } from "@/lib/aqloss-changelog"
import { getRoadmap } from "@/lib/aqloss-roadmap"
import { Suspense } from "react"
import AqlossPageClient from "./aqloss-client"

export default async function AqlossPage() {
    const [stats, changelog, roadmap] = await Promise.all([
        getAqlossStats(),
        getChangelog(),
        getRoadmap(),
    ])
    return (
        <Suspense fallback={null}>
            <AqlossPageClient stats={stats} changelog={changelog} roadmap={roadmap} />
        </Suspense>
    )
}
