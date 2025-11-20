import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const triggers = await prisma.trigger.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ triggers })
  } catch (error: any) {
    console.error("Error fetching triggers:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, event, conditions, channels, template, isActive } = body

    if (!name || !event || !channels || channels.length === 0) {
      return NextResponse.json(
        { message: "Name, event, and at least one channel are required" },
        { status: 400 }
      )
    }

    const trigger = await prisma.trigger.create({
      data: {
        name,
        event,
        conditions: conditions || null,
        channels,
        template: template || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json({ trigger }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating trigger:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

