"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

function User() {
  const { data, update, status } = useSession();
  return (
    <>
      <pre>
        {JSON.stringify(data)}
      </pre>
      <p>{status}</p>
    </>
  )
}

export default User
