export default function Header() {
    return (
        <header className="fixed w-full top-0 z-50">
            <div className="flex flex-row items-center justify-center m-5 p-3 backdrop-blur-sm border border-zinc-500 rounded-full w-full lg:max-w-7xl mx-auto">
                <div className="flex flex-row gap-x-5 text-zinc-400 font-medium text-sm">
                    <a className="hover:text-white transition" href="/#about">About Me</a>
                    <a className="hover:text-white transition" href="/project">My Projects</a>
                    <a className="hover:text-white transition" href="#">Contact</a>
                </div>
            </div>
        </header>
    )
}