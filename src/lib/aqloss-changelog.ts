export type ChangeType = "added" | "fixed" | "changed" | "removed"

export interface ChangeEntry {
    type: ChangeType
    category: string
    text: string
}

export interface ChangelogRelease {
    version: string
    date: string
    summary: string
    changes: ChangeEntry[]
    compareUrl?: string
}

interface GithubRelease {
    tag_name: string
    published_at: string
    body: string | null
    html_url: string
    prerelease: boolean
    draft: boolean
}

const SECTION_TYPE: Record<string, ChangeType> = {
    added: "added",
    fixed: "fixed",
    changed: "changed",
    removed: "removed",
}

function parseReleaseBody(body: string): { summary: string; changes: ChangeEntry[] } {
    const lines = body.split("\n").map((l) => l.trim()).filter(Boolean)

    let summary = ""
    const changes: ChangeEntry[] = []
    let currentType: ChangeType | null = null

    for (const line of lines) {
        const headingMatch = line.match(/^##\s+(.+)/)
        if (headingMatch) {
            const key = headingMatch[1].toLowerCase().trim()
            currentType = SECTION_TYPE[key] ?? null
            continue
        }

        if (!currentType && !summary && !line.startsWith("-")) {
            summary = line.replace(/^#+\s*/, "")
            continue
        }

        if (currentType && line.startsWith("-")) {
            const match = line.trim().match(/^-+\s*(?:\[(.*?)\])?\s*(.*)/);

            if (match) {
                const category = match[1] ? match[1].trim().replaceAll('|', ' · ') : "";
                let text = match[2] ? match[2].trim() : "";

                text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

                if (text) changes.push({ type: currentType, category, text });
            }
        }
    }

    return { summary, changes }
}

async function fetchGithubReleases(): Promise<GithubRelease[]> {
    try {
        const res = await fetch(
            "https://api.github.com/repos/nokarin-dev/Aqloss/releases?per_page=50",
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

export async function getChangelog(): Promise<ChangelogRelease[]> {
    const releases = await fetchGithubReleases()

    return releases
        .filter((r) => !r.draft && !r.prerelease)
        .map((r) => {
            const version = r.tag_name.replace(/^v/, "")
            const date = r.published_at.slice(0, 10)
            const { summary, changes } = parseReleaseBody(r.body ?? "")

            const prevVersion = releases.find((prev) => {
                const prevVer = prev.tag_name.replace(/^v/, "")
                return prevVer < version && !prev.draft && !prev.prerelease
            })

            const compareUrl = prevVersion
                ? `https://github.com/nokarin-dev/Aqloss/compare/${prevVersion.tag_name}...v${version}`
                : r.html_url

            return { version, date, summary, changes, compareUrl }
        })
}

export async function getRelease(version: string): Promise<ChangelogRelease | undefined> {
    const changelog = await getChangelog()
    return changelog.find((r) => r.version === version)
}

export async function getAllVersions(): Promise<string[]> {
    const changelog = await getChangelog()
    return changelog.map((r) => r.version)
}