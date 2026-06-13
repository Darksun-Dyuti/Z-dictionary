import { auth } from "@/lib/auth"
import { signInAction, signOutAction } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function UserMenu() {
  const session = await auth()

  if (session && session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full outline-hidden focus:ring-2 focus:ring-primary/50 transition-shadow">
          <Avatar className="h-8 w-8 hover:opacity-90 transition-opacity">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <Link href="/dashboard" className="w-full">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/settings" className="w-full">
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <form action={signOutAction} className="w-full">
            <DropdownMenuItem className="cursor-pointer p-0">
              <button type="submit" className="w-full text-left px-2 py-1.5">
                Sign Out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <form action={signInAction}>
      <Button type="submit" variant="default" size="sm">Sign In</Button>
    </form>
  )
}
