import { buttonVariants } from "@/components/ui/button";
import User from "@/components/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1 className='text-4xl mb-4'>Home</h1>
      <Link className={buttonVariants()} href='/admin'>Open my admin</Link>
      <h2>User session</h2>
      <User />
      <h2>Server session here</h2>
      <p>{JSON.stringify(session)}</p>
    </div>
  )
}
