import { getFrameExtractorStats } from "@/lib/frameextractor-stats"
import FrameExtractorClient from "./frameextractor-client"

export default async function FrameExtractorPage() {
    const stats = await getFrameExtractorStats()
    return <FrameExtractorClient stats={stats} />
}