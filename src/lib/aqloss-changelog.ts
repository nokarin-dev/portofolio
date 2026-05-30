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

export const aqlossChangelog: ChangelogRelease[] = [
    {
        version: "0.3.0",
        date: "2026-05-30",
        summary: "Update checker, media notifications, and a bunch of audio backend fixes. Also a big Flutter source restructure that was long overdue.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.2.3...v0.3.0",
        changes: [
            { type: "added", category: "Frontend", text: "History screen" },
            { type: "added", category: "Frontend", text: "Artists screen" },
            { type: "added", category: "Frontend", text: "Artist detail" },
            { type: "added", category: "Frontend", text: "Loved tracks" },
            { type: "added", category: "Audio", text: "Queue panel" },
            { type: "added", category: "Audio", text: "Global search overlay" },
            { type: "added", category: "Frontend", text: "Play count badge on track tiles" },
            { type: "added", category: "Frontend", text: "Play count on artist detail track rows" },
            { type: "added", category: "Frontend · Playlist", text: "Export playlist to .aqp file" },
            { type: "added", category: "Frontend · Playlist", text: "Import .aqp playlist" },
            { type: "added", category: "Frontend · Last.fm", text: "Sync loved tracks to Last.fm" },
            { type: "added", category: "Frontend · Settings", text: "Mobile nav" },
            { type: "added", category: "Frontend · Audio", text: "Device change watchdog" },
            { type: "fixed", category: "Frontend · History", text: "Playing from history now uses history order as queue, not library order" },
            { type: "fixed", category: "Frontend · History", text: "Duplicate tracks in history no longer require extra skips (explicit atIndex passed to loadWithQueue)" },
            { type: "fixed", category: "Frontend · Playlist", text: "Rename dialog spacebar no longer triggers play/pause (FocusNode registered with SearchFocusTracker)" },
            { type: "fixed", category: "Frontend · Settings", text: "Mobile settings screen was stuck on Music Folders with no way to navigate" },
            { type: "fixed", category: "Backend · Audio", text: "_engineReady = false was set too eagerly on reinit, causing all backend calls (audio, Discord RPC, scrobble) to block or fail during normal playback" },
            { type: "fixed", category: "Backend · Audio", text: "play() wait loop shortened from 15s to 5s - failures surface quickly instead of silently stalling" },
            { type: "fixed", category: "Backend · Audio", text: "play() now only calls reinitToDevice when backend.play() actually throws, not as an upfront check" },
            { type: "changed", category: "Frontend · Playlist", text: "selectDevice now goes through AudioService.reinitToDevice so _engineReady is managed in one place" },
        ],
    },
    {
        version: "0.2.3",
        date: "2026-05-26",
        summary: "Update checker, media notifications, and a bunch of audio backend fixes. Also a big Flutter source restructure that was long overdue.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.2.2...v0.2.3",
        changes: [
            { type: "added", category: "Frontend · UpdateChecker", text: "Update checker in settings" },
            { type: "added", category: "Frontend · UI", text: "Press scale animation on the play button" },
            { type: "added", category: "Frontend · Lyrics", text: "Lrclib search & get API as fallback source" },
            { type: "added", category: "Frontend · Notifier", text: "Media player notifications" },
            { type: "added", category: "Audio · Backend", text: "Output stream now reopens at native sample rate on load to avoid unnecessary resampling" },
            { type: "added", category: "Audio · Backend", text: "Hardware capability check in probe_exact_rate before opening streams" },
            { type: "fixed", category: "Frontend · Shortcuts", text: "Spacebar shortcut being swallowed when search field is focused - migrated to HardwareKeyboard" },
            { type: "fixed", category: "Audio · Backend", text: "Debounce guard to prevent backend freezes from play/pause spam" },
            { type: "fixed", category: "Audio · Backend", text: "Missing stop_drain() call in the play() resume path" },
            { type: "changed", category: "Frontend · Settings", text: "Settings now uses a two-panel layout" },
            { type: "changed", category: "Frontend · Theme", text: "Dark theme adjusted to be darker and cleaner" },
            { type: "changed", category: "Frontend · HomeScreen", text: "Improved sidebar collapse animation" },
            { type: "changed", category: "Frontend · PlayerScreen", text: "Player screen now has slide-in animation on track change" },
            { type: "changed", category: "Frontend · MiniPlayer", text: "Mini player bar UI adjusted" },
            { type: "changed", category: "Audio · Backend", text: "Stream no longer blindly probes for the highest supported sample rate" },
            { type: "changed", category: "Frontend", text: "Music Folders moved into Settings" },
            { type: "changed", category: "Codebase", text: "Major restructure of Flutter source" },
        ],
    },
    {
        version: "0.2.2",
        date: "2026-05-19",
        summary: "Albums screen lands, Discord RPC gets a YouTube Music deep-link, and Android gets proper storage handling. Lots of small fixes across the board.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.2.1...v0.2.2",
        changes: [
            { type: "added", category: "Backend · DiscordRPC", text: "Find button in Discord RPC now links to YouTube Music search" },
            { type: "added", category: "Frontend · Lyrics", text: "Lrclib fallback for lyrics" },
            { type: "added", category: "Frontend · Albums", text: "Albums screen" },
            { type: "added", category: "Android", text: "Storage permissions handler" },
            { type: "added", category: "Android", text: "URI path resolution" },
            { type: "added", category: "Android", text: "Folder manager access on mobile" },
            { type: "fixed", category: "Backend · DiscordRPC", text: "Discord button label overflow" },
            { type: "fixed", category: "Backend · Audio", text: "Added helpers to prevent backend crash" },
            { type: "fixed", category: "Frontend · DiscordRPC", text: "Validate activity fields and reconnect after error" },
            { type: "fixed", category: "Frontend · DiscordRPC", text: "Sanitize album field sent as large_text" },
            { type: "fixed", category: "Frontend", text: "Backend called only on drag end to prevent seek throttle" },
            { type: "fixed", category: "Frontend", text: "All buttons now have pointer cursor" },
            { type: "fixed", category: "Android", text: "Library scan returning empty" },
            { type: "fixed", category: "Android", text: "Status bar overlap" },
            { type: "fixed", category: "Android", text: "window_manager crash on Android" },
            { type: "fixed", category: "Android", text: "Spectrum negative padding" },
            { type: "fixed", category: "Android", text: "Using ndk context to open audio output for cpal" },
            { type: "fixed", category: "Android", text: "Overflow on grid item" },
        ],
    },
    {
        version: "0.2.1",
        date: "2026-05-17",
        summary: "Mini player, Islands theme, grid/detail toggle, LRU cache for album art. Library and playlist got a visual overhaul.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.2.0...v0.2.1",
        changes: [
            { type: "added", category: "General", text: "Aqloss logging" },
            { type: "added", category: "Performance", text: "128-entry LRU cache for album art thumbnails" },
            { type: "added", category: "Frontend · Theme", text: "Islands theme" },
            { type: "added", category: "Frontend · Library", text: "Grid / Detail view toggle in library" },
            { type: "added", category: "Frontend · UI", text: "Now playing header on library and playlist screens" },
            { type: "added", category: "Frontend · UI", text: "Mini player" },
            { type: "fixed", category: "Audio · Backend", text: "Buffer underrun warning spam" },
            { type: "fixed", category: "Frontend · Linux", text: "Window not rounded on Linux" },
            { type: "fixed", category: "Frontend · Library", text: "Search not working in library" },
            { type: "changed", category: "Frontend · Library", text: "Library and playlist now display cover art" },
            { type: "changed", category: "Performance", text: "Images resized to max 300×300 and recompressed to JPEG to reduce RAM usage" },
            { type: "changed", category: "Frontend · UI", text: "Removed Material widgets from library and settings screen" },
        ],
    },
    {
        version: "0.2.0",
        date: "2026-05-14",
        summary: "Hotfix: AOT library not found at startup.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.1.1...v0.2.0",
        changes: [
            { type: "fixed", category: "General", text: "AOT library not found when app starts" },
        ],
    },
    {
        version: "0.1.1",
        date: "2026-05-13",
        summary: "Desktop polish: mini player bar, right-click context menu, file info dialog. Plus a handful of playlist and drag-and-drop fixes.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/compare/v0.1.0...v0.1.1",
        changes: [
            { type: "added", category: "Frontend · Desktop", text: "Desktop mini player bar" },
            { type: "added", category: "Frontend · Desktop", text: "Right-click context menu in Library (desktop)" },
            { type: "added", category: "Frontend · UI", text: "File info dialog" },
            { type: "fixed", category: "Audio · Backend", text: "Audio output device selection not being respected" },
            { type: "fixed", category: "Frontend · Playlist", text: "Playlist reorder moves item one position too far when dragging down" },
            { type: "fixed", category: "Frontend · Library", text: "Dragging a track from the library to a playlist sidebar item did nothing" },
            { type: "fixed", category: "Frontend · Theme", text: "Lyrics text stays white in light mode" },
            { type: "changed", category: "Frontend · MiniPlayer", text: "MiniPlayerBar now detects the platform and renders a full desktop bar or the existing compact bar accordingly" },
            { type: "changed", category: "Frontend · Desktop", text: "Desktop mini player is now shown on all non-player screens instead of only on mobile" },
        ],
    },
    {
        version: "0.1.0",
        date: "2026-05-07",
        summary: "Initial public release.",
        compareUrl: "https://github.com/nokarin-dev/Aqloss/releases/tag/v0.1.0",
        changes: [],
    },
]

export function getRelease(version: string): ChangelogRelease | undefined {
    return aqlossChangelog.find((r) => r.version === version)
}

export function getAllVersions(): string[] {
    return aqlossChangelog.map((r) => r.version)
}