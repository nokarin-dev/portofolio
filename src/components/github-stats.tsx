"use client"

import { useEffect, useState } from "react"
import * as motion from "motion/react-client"
import { StarIcon, GitForkIcon, BookOpenIcon, UsersIcon } from "lucide-react"

interface GithubProfile {
  public_repos: number
  followers: number
  following: number
  name: string
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  fork: boolean
}

const GITHUB_USERNAME = "nokarin-dev"

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  "C#": "#178600",
  Rust: "#dea584",
  Go: "#00ADD8",
  PHP: "#4F5D95",
}

function StatCard({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeInOut" }}
      viewport={{ amount: 0.5, margin: "-40px" }}
      className="flex flex-col gap-1 p-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors"
    >
      <div className="text-zinc-500 mb-1">{icon}</div>
      <span className="text-2xl font-extrabold text-white tabular-nums">{value}</span>
      <span className="text-xs text-zinc-500">{label}</span>
    </motion.div>
  )
}

function RepoCard({ repo, delay = 0 }: { repo: GithubRepo; delay?: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeInOut" }}
      viewport={{ amount: 0.5, margin: "-100px" }}
      className="flex flex-col gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all group hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-bold text-white text-sm group-hover:text-zinc-200 transition-colors truncate">
          {repo.name}
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30" className="text-zinc-600 shrink-0 mt-0.5">
          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
        </svg>
      </div>
      {repo.description && (
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b" }}
            />
            <span className="text-xs text-zinc-500">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-zinc-500">
          <StarIcon size={12} />
          <span className="text-xs">{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-500">
          <GitForkIcon size={12} />
          <span className="text-xs">{repo.forks_count}</span>
        </div>
      </div>
    </motion.a>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-950 animate-pulse">
      <div className="h-4 bg-zinc-800 rounded w-3/4" />
      <div className="h-3 bg-zinc-800 rounded w-full" />
      <div className="h-3 bg-zinc-800 rounded w-2/3" />
      <div className="flex gap-3 mt-2">
        <div className="h-3 bg-zinc-800 rounded w-16" />
        <div className="h-3 bg-zinc-800 rounded w-10" />
      </div>
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

        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API error")

        const profileData: GithubProfile = await profileRes.json()
        const reposData: GithubRepo[] = await reposRes.json()

        const nonForks = reposData.filter((r) => !r.fork)
        const stars = nonForks.reduce((acc, r) => acc + r.stargazers_count, 0)
        const topRepos = [...nonForks]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)

        setProfile(profileData)
        setRepos(topRepos)
        setTotalStars(stars)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="activity" className="py-24 sm:py-32 px-5 sm:px-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.5, margin: "-80px" }}
          className="flex items-center gap-3 mb-4"
        >

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30" className="fill-white">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
          </svg>
          <h2 className="text-xl font-bold text-white">GITHUB ACTIVITY</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ amount: 0.5, margin: "-60px" }}
          className="text-zinc-500 text-sm mb-12 ml-8"
        >
          Live data from GitHub API
        </motion.p>

        {error ? (
          <p className="text-zinc-600 text-sm">Could not load GitHub data at this time.</p>
        ) : (
          <>
            {/* stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-2xl bg-zinc-900 animate-pulse border border-zinc-800" />
                ))
              ) : (
                <>
                  <StatCard icon={<BookOpenIcon size={16} />} label="Public Repos" value={profile?.public_repos ?? 0} delay={0} />
                  <StatCard icon={<StarIcon size={16} />} label="Total Stars" value={totalStars} delay={0.05} />
                  <StatCard icon={<UsersIcon size={16} />} label="Followers" value={profile?.followers ?? 0} delay={0.1} />
                  <StatCard icon={
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                  } label="Following" value={profile?.following ?? 0} delay={0.15} />
                </>
              )}
            </div>

            {/* top repos grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : repos.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} delay={i * 0.06} />
                ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ amount: 0.5, margin: "-40px" }}
              className="mt-8 flex justify-center"
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-500 text-sm hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
                View full GitHub profile →
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
