import { auth, signIn, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function UserMenu() {
  const session = await auth()

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-medium hover:underline">
          Dashboard
        </Link>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button variant="outline" size="sm">Sign Out</Button>
        </form>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button variant="default" size="sm">Sign In</Button>
    </form>
  )
}
