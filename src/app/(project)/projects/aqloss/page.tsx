import { getAqlossStats } from "@/lib/aqloss-stats"
import AqlossPageClient from "./aqloss-client"

export default async function AqlossPage() {
    const statsData = await getAqlossStats();
    return <AqlossPageClient stats={statsData} />
}