"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Zap, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Trigger {
  id: string
  name: string
  event: string
  conditions: string | null
  channels: string[]
  template: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export function AutomationList({ triggers }: { triggers: Trigger[] }) {
  const { toast } = useToast()
  const [localTriggers, setLocalTriggers] = useState(triggers)

  const handleToggle = async (triggerId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/automation/${triggerId}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        setLocalTriggers((prev) =>
          prev.map((t) => (t.id === triggerId ? { ...t, isActive: !t.isActive } : t))
        )
        toast({
          title: "Success",
          description: `Automation ${!isActive ? "activated" : "deactivated"}.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update automation.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (triggerId: string) => {
    if (!confirm("Are you sure you want to delete this automation?")) return

    try {
      const response = await fetch(`/api/automation/${triggerId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLocalTriggers((prev) => prev.filter((t) => t.id !== triggerId))
        toast({
          title: "Success",
          description: "Automation deleted.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete automation.",
        variant: "destructive",
      })
    }
  }

  const getEventLabel = (event: string) => {
    const labels: Record<string, string> = {
      CANDIDATE_REGISTERED: "Candidate Registered",
      COURSE_COMPLETED: "Course Completed",
      TEST_PASSED: "Test Passed",
      TEST_FAILED: "Test Failed",
      OFFER_SENT: "Offer Sent",
      OFFER_ACCEPTED: "Offer Accepted",
      OFFER_DECLINED: "Offer Declined",
      STATUS_CHANGED: "Status Changed",
    }
    return labels[event] || event
  }

  if (localTriggers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Zap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No automations yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first automation to streamline your workflow
          </p>
          <Link href="/hr/automation/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {localTriggers.map((trigger) => (
        <Card key={trigger.id} className={trigger.isActive ? "" : "opacity-75"}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle>{trigger.name}</CardTitle>
                  <Badge variant={trigger.isActive ? "default" : "secondary"}>
                    {trigger.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="space-y-1">
                    <p>
                      <strong>Trigger:</strong> {getEventLabel(trigger.event)}
                    </p>
                    {trigger.conditions && (
                      <p>
                        <strong>Conditions:</strong> {trigger.conditions}
                      </p>
                    )}
                    <p>
                      <strong>Channels:</strong> {trigger.channels.join(", ")}
                    </p>
                  </div>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={trigger.isActive}
                  onCheckedChange={() => handleToggle(trigger.id, trigger.isActive)}
                />
                <Link href={`/hr/automation/${trigger.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(trigger.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

