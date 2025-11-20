import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CandidateStatus } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { statuses, vacancyId, title, message, type, channel, includeOffer, offerContent, vacancyIdForOffer } = body

    if (!title || !message) {
      return NextResponse.json({ message: "Title and message are required" }, { status: 400 })
    }

    // Build where clause
    const where: any = {}
    if (statuses && statuses.length > 0) {
      where.status = { in: statuses }
    }
    if (vacancyId && vacancyId !== "none") {
      where.currentVacancyId = vacancyId
    }

    // Find candidates
    const candidates = await prisma.candidateProfile.findMany({
      where,
      include: {
        user: true,
      },
    })

    if (candidates.length === 0) {
      return NextResponse.json({ message: "No candidates found matching criteria" }, { status: 400 })
    }

    // Create notifications
    const notifications = await Promise.all(
      candidates.map((candidate) =>
        prisma.notification.create({
          data: {
            userId: candidate.userId,
            title,
            message,
            type: type || "info",
            channel: channel || "INTERNAL",
          },
        })
      )
    )

    // Create offers if requested
    let offersCreated = 0
    if (includeOffer && vacancyIdForOffer && vacancyIdForOffer !== "none" && offerContent) {
      const vacancy = await prisma.vacancy.findUnique({
        where: { id: vacancyIdForOffer },
      })

      if (vacancy) {
        const offers = await Promise.all(
          candidates.map((candidate) =>
            prisma.offer.create({
              data: {
                type: "personal",
                candidateId: candidate.id,
                vacancyId: vacancyIdForOffer,
                content: offerContent,
                status: "sent",
              },
            })
          )
        )
        offersCreated = offers.length

        // Update candidate statuses
        await prisma.candidateProfile.updateMany({
          where: { id: { in: candidates.map((c) => c.id) } },
          data: { status: CandidateStatus.OFFER_SENT },
        })
      }
    }

    return NextResponse.json({
      success: true,
      notificationsSent: notifications.length,
      offersCreated,
    })
  } catch (error: any) {
    console.error("Error sending bulk notifications:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

