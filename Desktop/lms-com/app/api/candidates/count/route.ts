import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const statuses = searchParams.get("statuses")?.split(",").filter(Boolean) || []
    const vacancyId = searchParams.get("vacancyId")

    const where: any = {}

    if (statuses.length > 0) {
      where.status = { in: statuses }
    }

    if (vacancyId && vacancyId !== "none") {
      where.currentVacancyId = vacancyId
    }

    const count = await prisma.candidateProfile.count({ where })

    return NextResponse.json({ count })
  } catch (error: any) {
    console.error("Error counting candidates:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

