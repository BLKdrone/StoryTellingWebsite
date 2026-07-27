'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <Button 
        variant="secondary" 
        onClick={() => signOut()}
        className="rounded-2xl"
      >
        Sign out ({session.user?.name})
      </Button>
    )
  }
  
  return (
    <Button 
      variant="secondary" 
      onClick={() => signIn('google')}
      className="rounded-2xl"
    >
      Sign in with Google
    </Button>
  )
}
