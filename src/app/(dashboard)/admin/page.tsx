import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (session?.user.username) {
    return (
      <h2>Well come back to admin page {` ${session?.user.username}`} </h2>
    )
  }
  return (
    <div>
      Please login to see admin page
    </div>
  )
}

export default AdminPage
