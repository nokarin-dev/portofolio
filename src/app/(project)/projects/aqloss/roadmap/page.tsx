"use client"

import * as motion from "motion/react-client"
import Link from "next/link"
import { ArrowLeftIcon, CircleCheckIcon, CircleDashedIcon, ClockIcon, GitBranchIcon } from "lucide-react"

type RoadmapStatus = "done" | "in-progress" | "planned"

interface RoadmapItem {
  title: string
  description: string
  status: RoadmapStatus
  category: string
  version?: string
}

interface RoadmapMilestone {
  title: string
  subtitle: string
  status: RoadmapStatus
  items: RoadmapItem[]
}

const ROADMAP: RoadmapMilestone[] = [
  {
    title: "v0.3.0",
    subtitle: "Queue & playlist overhaul",
    status: "in-progress",
    items: [
      {
        title: "Play history",
        description: "Record every track that is played along with its timestamp. You can filter by day or week.",
        status: "in-progress",
        category: "Frontend · History",
      },
      {
        title: "Loved Tracks",
        description: "Like or dislike tracks from anywhere. Automatically syncs to Last.fm if scrobbling is enabled.",
        status: "in-progress",
        category: "Frontend · Tracks",
      },
      {
        title: "Last.fm loved sync",
        description: "Sync your favorite tracks from Last.fm to your local device.",
        status: "in-progress",
        category: "Frontend · Social",
      },
      {
        title: "Queue Panel",
        description: "View and reorder the song queue right now directly from the sidebar, without opening another screen.",
        status: "planned",
        category: "Frontend · Queue",
      },
      {
        title: "Playlist Management Improvements",
        description: "Rename, duplicate, export playlists as M3U. Import M3U/M3U8 files.",
        status: "planned",
        category: "Frontend · Playlist",
      },
      {
        title: "Global Search",
        description: "One search bar for tracks, albums, artists, and playlists all at once.",
        status: "planned",
        category: "Frontend · Search",
      },
      {
        title: "Artists screen",
        description: "A dedicated screen grouped by artist, complete with track count and total duration.",
        status: "planned",
        category: "Frontend · Artists",
      },
      {
        title: "Play count & stats",
        description: "Track the number of times each track is played. Display this information in the track details and library sort.",
        status: "planned",
        category: "Frontend · Stats",
      },
      {
        title: "Customisable shortcuts",
        description: "Users can remap all global shortcuts in the settings.",
        status: "planned",
        category: "Frontend · UI",
      },
    ],
  },
  {
    title: "Backlog",
    subtitle: "No timeline yet",
    status: "planned",
    items: [
      {
        title: "Parametric EQ",
        description: "Replace the 10-band graphic EQ with a parametric EQ - more control per band, Q factor, shelf filters.",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "Crossfeed",
        description: "Binaural crossfeed filter for headphone listening - reduces fatigue on hard-panned recordings.",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "Stereo widening",
        description: "Mid/side processing for adjusting stereo width without clipping.",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "ReplayGain scanner",
        description: "Built-in scanner to compute and write ReplayGain tags to files, not just read them.",
        status: "planned",
        category: "Audio · Backend",
      },
      {
        title: "Waveform seeker",
        description: "A visual waveform of the audio file displayed as a seek bar, rather than a standard progress bar.",
        status: "planned",
        category: "Player · Playback",
      },
      {
        title: "A-B loop",
        description: "Set points A and B for a specific repeat section within a track.",
        status: "planned",
        category: "Player · Playback",
      },
      {
        title: "Sleep timer",
        description: "Automatically stop playback after a specified time.",
        status: "planned",
        category: "Player · Playback",
      },
      {
        title: "Playback speed",
        description: "Adjust the playback speed of audio files.",
        status: "planned",
        category: "Player · Playback",
      },
      {
        title: "Restore position",
        description: "Remember the last position of each track when the app is closed and reopened.",
        status: "planned",
        category: "Player · Playback",
      },
      {
        title: "Tag editor",
        description: "Edit ID3/Vorbis metadata (title, artist, album, year, genre, cover) directly from the UI.",
        status: "planned",
        category: "Library · Organization",
      },
      {
        title: "Smart filter bar",
        description: "Filter the library by genre, year, format, and bit depth without going into the settings.",
        status: "planned",
        category: "Library · Organization",
      },
      {
        title: "Export & Import playlist",
        description: "Export and import playlists in .aqconfig format.",
        status: "planned",
        category: "Library · Organization",
      },
      {
        title: "Cover art fallback",
        description: "Fetch the cover from MusicBrainz or the Cover Art Archive if the file doesn't have a cover.",
        status: "planned",
        category: "Library · Organization",
      },
      {
        title: "Multi column sort",
        description: "Sort by album, artist, and track number all at once, not just by a single field.",
        status: "planned",
        category: "Library · Organization",
      },
      {
        title: "EQ presets",
        description: "Save/load EQ settings as named presets. Includes several default presets (Rock, Classical, Vocal). ",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "Stereo width",
        description: "Mid/side balance control to widen or narrow the stereo image.",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "Loudness normalisation",
        description: "EBU R128 / LUFS-based loudness normalization as an alternative to ReplayGain.",
        status: "planned",
        category: "Audio · DSP",
      },
      {
        title: "MusicBrainz lookup",
        description: "Automatic metadata enrichment via MusicBrainz: genre, year, ISRC, label.",
        status: "planned",
        category: "Frontend · Integration",
      },
      {
        title: "Share now playing",
        description: "Copy “artist - title” to the clipboard or share as text with a single click",
        status: "planned",
        category: "Frontend · Integration",
      },
      {
        title: "Mini player mode",
        description: "The small “always-on-top” window only displays controls and a cover when working in another app.",
        status: "planned",
        category: "Frontend · UI",
      },
      {
        title: "Accent colour",
        description: "Choose a custom accent color or automatically select one based on the dominant color of the album art.",
        status: "planned",
        category: "Frontend · UI",
      },
      {
        title: "Drag to queue improvement",
        description: "Drag the track to the mini player bar to add it to the queue immediately, without opening the queue panel.",
        status: "planned",
        category: "Frontend · UI",
      },
      {
        title: "Track info modal",
        description: "Track details: all tags, codec information, file path, ReplayGain values, play count.",
        status: "planned",
        category: "Frontend · UI",
      },
      {
        title: "Notification toast",
        description: "A notification when a folder has finished scanning, a scrobble has failed, or an update is available.",
        status: "planned",
        category: "Frontend · UI",
      },
      {
        title: "System tray",
        description: "Minimize to the system tray, a small control panel pops up from the tray icon without opening the full app.",
        status: "planned",
        category: "System · Platform",
      },
      {
        title: "Settings backup",
        description: "Export or import all settings and playlists as a single JSON file.",
        status: "planned",
        category: "System · Platform",
      },
      {
        title: "Missing file detection",
        description: "Detect tracks in the library whose files have been moved or deleted, then offer to remove or relocate them.",
        status: "planned",
        category: "System · Platform",
      },
      {
        title: "Android improvements",
        description: "Improved notification controls, lock screen art, and scoped storage handling in Android 13 and later.",
        status: "planned",
        category: "System · Platform",
      },
      {
        title: "Plugin system",
        description: "A minimal plugin API for DSP effects and metadata providers. Distant future.",
        status: "planned",
        category: "Architecture",
      },
    ],
  },
]

const STATUS_CONFIG: Record<RoadmapStatus, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  done: {
    icon: <CircleCheckIcon size={14} />,
    label: "Done",
    color: "text-emerald-500",
    bg: "bg-emerald-950/40 border-emerald-900/50",
  },
  "in-progress": {
    icon: <ClockIcon size={14} />,
    label: "In progress",
    color: "text-amber-400",
    bg: "bg-amber-950/40 border-amber-900/50",
  },
  planned: {
    icon: <CircleDashedIcon size={14} />,
    label: "Planned",
    color: "text-zinc-500",
    bg: "bg-zinc-900/40 border-zinc-800/50",
  },
}

function StatusBadge({ status }: { status: RoadmapStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${cfg.color} ${cfg.bg}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  )
}

export default function AqlossRoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white px-5 sm:px-10 pt-28 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* back */}
        <Link
          href="/projects/aqloss"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12"
        >
          <ArrowLeftIcon size={14} />
          Back to Aqloss
        </Link>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-600 mb-3">
            Aqloss
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Roadmap
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
            What's being worked on, what's planned, and what's sitting in the backlog waiting for upstream libraries to catch up.
          </p>
        </motion.div>

        {/* legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-14"
        >
          {(["in-progress", "planned", "done"] as RoadmapStatus[]).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </motion.div>

        {/* milestones */}
        <div className="flex flex-col gap-14">
          {ROADMAP.map((milestone, mi) => (
            <motion.section
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + mi * 0.1 }}
            >
              {/* milestone header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-zinc-900">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h2 className="text-lg font-bold font-mono text-white">
                      {milestone.title}
                    </h2>
                    <StatusBadge status={milestone.status} />
                  </div>
                  <p className="text-zinc-500 text-sm">{milestone.subtitle}</p>
                </div>
              </div>

              {/* items */}
              <div className="flex flex-col gap-3">
                {milestone.items.map((item, ii) => {
                  const cfg = STATUS_CONFIG[item.status]
                  return (
                    <div
                      key={ii}
                      className="flex gap-4 p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/40 transition-colors"
                    >
                      <span className={`shrink-0 mt-0.5 ${cfg.color}`} aria-hidden>
                        {cfg.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className={`text-sm font-medium ${item.status === "done" ? "text-zinc-500 line-through decoration-zinc-700" : "text-white"}`}>
                            {item.title}
                          </p>
                        </div>
                        <p className="text-xs text-zinc-600 font-mono mb-2">
                          {item.category}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-xs text-zinc-700 leading-relaxed max-w-xs">
            Priorities shift. Nothing here is a hard commitment - just a working list of what comes next.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/nokarin-dev/Aqloss/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <GitBranchIcon size={11} />
              Open an issue
            </a>
            <Link
              href="/projects/aqloss/changelog"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              Changelog
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}