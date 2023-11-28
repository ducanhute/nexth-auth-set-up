import { db } from "@/lib/primaDb";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'
//Define a schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(5, 'Password must have than 8 characters'),
  })


export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, username, password } = userSchema.parse(body)
    // check if email  already exits
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    })
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "The user with this email is already exists"
      },
        { status: 409 }
      )
    }
    // check if username  already exits
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    })
    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "The username is already exists"
      },
        { status: 409 }
      )
    }
    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    const { password: userPassword, ...allTheRest } = newUser
    return NextResponse.json({ user: allTheRest, message: "User created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Some thing went wrong" }, { status: 500 })
  }
}
