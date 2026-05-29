export interface AqlossStats {
    version: string
    publishedAt: string | null
    githubDownloads: number
    flathubDownloads: number
    totalDownloads: number
}

interface GithubAsset {
    name: string
    download_count: number
}

interface GithubRelease {
    tag_name: string
    published_at: string
    assets: GithubAsset[]
}

interface FlathubStats {
    installs_total?: number
    downloads_total?: number
}

async function fetchGithubReleases(): Promise<GithubRelease[]> {
    try {
        const res = await fetch(
            "https://api.github.com/repos/nokarin-dev/aqloss/releases",
            {
                headers: { Accept: "application/vnd.github+json" },
                next: { revalidate: 3600 },
            }
        )
        if (!res.ok) return []
        return await res.json()
    } catch {
        return []
    }
}

async function fetchFlathubDownloads(): Promise<number> {
    try {
        const res = await fetch(
            "https://flathub.org/api/v2/stats/xyz.nokarin.aqloss",
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return 0
        const data: FlathubStats = await res.json()
        return data.installs_total ?? data.downloads_total ?? 0
    } catch {
        return 0
    }
}

export async function getAqlossStats(): Promise<AqlossStats> {
    const [releases, flathubDownloads] = await Promise.all([
        fetchGithubReleases(),
        fetchFlathubDownloads(),
    ])

    let version = "0.2.3"
    let publishedAt: string | null = null
    let githubDownloads = 0

    if (releases.length > 0) {
        const latest = releases[0]
        version = latest.tag_name.replace(/^v/, "")
        publishedAt = latest.published_at

        for (const release of releases) {
            for (const asset of release.assets ?? []) {
                githubDownloads += asset.download_count
            }
        }
    }

    return {
        version,
        publishedAt,
        githubDownloads,
        flathubDownloads,
        totalDownloads: githubDownloads + flathubDownloads,
    }
}