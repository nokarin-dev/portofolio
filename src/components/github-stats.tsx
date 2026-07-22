"use client"

import { useEffect, useState } from "react"
import * as motion from "motion/react-client"
import { StarIcon, GitForkIcon, BookOpenIcon, UsersIcon } from "lucide-react"

interface GithubProfile { public_repos: number; followers: number; following: number; name: string }
interface GithubRepo { id: number; name: string; description: string | null; stargazers_count: number; forks_count: number; language: string | null; html_url: string; fork: boolean }

const GITHUB_USERNAME = "nokarin-dev"
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", Java: "#b07219",
  Kotlin: "#A97BFF", Dart: "#00B4AB", "C#": "#178600", Rust: "#dea584", Go: "#00ADD8", PHP: "#4F5D95",
}

const GithubSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-foreground" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

function StatCard({ icon, label, value, delay = 0 }: { icon: React.ReactNode; label: string; value: string | number; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col gap-2 p-6 rounded-2xl bg-glass backdrop-blur-md border border-glass-border hover:bg-glass-hover transition-colors"
    >
      <div className="text-muted mb-2">{icon}</div>
      <span className="text-3xl font-light text-foreground tabular-nums tracking-tighter">{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{label}</span>
    </motion.div>
  )
}

function RepoCard({ repo, delay = 0 }: { repo: GithubRepo; delay?: number }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col h-full gap-4 p-6 rounded-2xl bg-glass backdrop-blur-xl border border-glass-border hover:bg-glass-hover hover:border-glass-border-hover transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-bold text-foreground text-base truncate">{repo.name}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0 group-hover:text-foreground transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      <p className="text-sm text-muted font-light leading-relaxed line-clamp-2 flex-1">{repo.description}</p>

      <div className="flex items-center gap-5 mt-auto pt-4 border-t border-glass-border">
        {repo.language && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b" }} />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-muted"><StarIcon size={12} /><span className="text-[10px] font-mono">{repo.stargazers_count}</span></div>
        <div className="flex items-center gap-1.5 text-muted"><GitForkIcon size={12} /><span className="text-[10px] font-mono">{repo.forks_count}</span></div>
      </div>
    </motion.a>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-glass border border-glass-border animate-pulse h-40">
      <div className="h-5 bg-glass-border rounded w-2/3" />
      <div className="h-3 bg-glass rounded w-full mt-2" />
      <div className="h-3 bg-glass rounded w-1/2" />
      <div className="mt-auto pt-4 flex gap-4"><div className="h-3 bg-glass-border rounded w-12" /><div className="h-3 bg-glass-border rounded w-8" /></div>
    </div>
  )
}

export default function GithubStats() {
  const [profile, setProfile] = useState<GithubProfile | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error("API error")
        const profileData = await profileRes.json()
        const reposData: GithubRepo[] = await reposRes.json()
        const nonForks = reposData.filter((r) => !r.fork)
        const stars = nonForks.reduce((acc, r) => acc + r.stargazers_count, 0)
        setProfile(profileData); setRepos([...nonForks].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)); setTotalStars(stars)
      } catch { setError(true) } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  return (
    <section id="activity" className="py-24 sm:py-32 px-5 sm:px-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-4 flex items-center gap-4"><span className="w-8 h-px bg-muted block"></span> Live Stats</h2>
        <div className="flex items-center gap-4"><h3 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Open Source.</h3></div>
      </motion.div>
      {error ? (
        <p className="text-muted font-mono text-xs">ERR: CONNECTION_REFUSED (GitHub API Limit)</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-glass border border-glass-border animate-pulse" />) : (
              <>
                <StatCard icon={<BookOpenIcon size={18} />} label="Repositories" value={profile?.public_repos ?? 0} delay={0.1} />
                <StatCard icon={<StarIcon size={18} />} label="Total Stars" value={totalStars} delay={0.2} />
                <StatCard icon={<UsersIcon size={18} />} label="Followers" value={profile?.followers ?? 0} delay={0.3} />
                <StatCard icon={<GithubSVG />} label="Following" value={profile?.following ?? 0} delay={0.4} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />) : repos.map((repo, i) => <RepoCard key={repo.id} repo={repo} delay={i * 0.1} />)}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="mt-12 flex justify-center">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1">
              Access Full Archive
            </a>
          </motion.div>
        </>
      )}
    </section>
  )
}