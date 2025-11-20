import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const trigger = await prisma.trigger.findUnique({
      where: { id: params.id },
    })

    if (!trigger) {
      return NextResponse.json({ message: "Trigger not found" }, { status: 404 })
    }

    return NextResponse.json({ trigger })
  } catch (error: any) {
    console.error("Error fetching trigger:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, event, conditions, channels, template, isActive } = body

    const trigger = await prisma.trigger.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(event && { event }),
        ...(conditions !== undefined && { conditions: conditions || null }),
        ...(channels && { channels }),
        ...(template !== undefined && { template: template || null }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({ trigger })
  } catch (error: any) {
    console.error("Error updating trigger:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prisma.trigger.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting trigger:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

