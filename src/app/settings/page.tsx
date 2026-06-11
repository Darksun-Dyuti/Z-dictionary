import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Shield, AlertTriangle, Key, Brain, BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import Link from "next/link"

export default async function SettingsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your account preferences and appearance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2 sticky top-24 h-fit hidden md:block">
          <Link href="#profile" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2 text-foreground">
              <User className="w-4 h-4" />
              Profile
            </Button>
          </Link>
          <Link href="#preferences" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
              <Brain className="w-4 h-4" />
              Preferences
            </Button>
          </Link>
          <Link href="#security" className="block">
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
              <Shield className="w-4 h-4" />
              Security
            </Button>
          </Link>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Profile Card */}
          <Card id="profile" className="glass-card scroll-mt-24">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input defaultValue={session.user.name || ""} disabled className="bg-muted/50" />
                <p className="text-xs text-muted-foreground">Your name is synced with your Google account.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue={session.user.email || ""} disabled className="bg-muted/50" />
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences Card */}
          <Card id="preferences" className="glass-card scroll-mt-24">
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Adjust how Arcanaz helps you learn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Default AI Mode</p>
                  <p className="text-sm text-muted-foreground">Always explain words using this complexity level.</p>
                </div>
                <Button variant="outline" size="sm" disabled>Standard Mode</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Daily Goal
                  </p>
                  <p className="text-sm text-muted-foreground">How many words do you want to learn each day?</p>
                </div>
                <Input type="number" defaultValue={5} className="w-20 text-center" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Arcanaz looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme Preference</p>
                <p className="text-sm text-muted-foreground">Toggle between Light and Dark mode.</p>
              </div>
              <ThemeToggle />
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card id="security" className="glass-card scroll-mt-24">
            <CardHeader>
              <CardTitle>Security & Access</CardTitle>
              <CardDescription>Manage your sign-in methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Authentication Method</p>
                    <p className="text-sm text-muted-foreground">You are currently signed in via Google OAuth.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
