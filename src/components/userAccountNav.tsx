'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

function UserAccountNav() {
  return (
    <div>
      <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
      })} variant="destructive">Sign out</Button>
    </div>
  )
}

export default UserAccountNav
