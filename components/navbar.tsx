import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "./user-button";
import { auth } from "@/auth";

export default async function Navbar() {
    const session = await auth()
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            EasyCV
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <div className="mx-2">
                            <ModeToggle />
                            <UserButton session={session} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}