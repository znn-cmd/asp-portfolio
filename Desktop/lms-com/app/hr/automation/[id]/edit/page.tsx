"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

const TRIGGER_EVENTS = [
  { value: "CANDIDATE_REGISTERED", label: "Candidate Registered" },
  { value: "PROFILE_COMPLETED", label: "Profile Completed" },
  { value: "COURSE_STARTED", label: "Course Started" },
  { value: "COURSE_COMPLETED", label: "Course Completed" },
  { value: "TEST_STARTED", label: "Test Started" },
  { value: "TEST_PASSED", label: "Test Passed" },
  { value: "TEST_FAILED", label: "Test Failed" },
  { value: "OFFER_SENT", label: "Offer Sent" },
  { value: "OFFER_ACCEPTED", label: "Offer Accepted" },
  { value: "OFFER_DECLINED", label: "Offer Declined" },
  { value: "STATUS_CHANGED", label: "Status Changed" },
]

const CHANNELS = [
  { value: "INTERNAL", label: "Internal Notification" },
  { value: "EMAIL", label: "Email" },
  { value: "PUSH", label: "Push Notification" },
]

export default function EditAutomationPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    event: "",
    conditions: "",
    channels: [] as string[],
    template: "",
    isActive: true,
  })

  useEffect(() => {
    fetchTrigger()
  }, [params.id])

  const fetchTrigger = async () => {
    try {
      const response = await fetch(`/api/automation/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        const trigger = data.trigger
        setFormData({
          name: trigger.name,
          event: trigger.event,
          conditions: trigger.conditions || "",
          channels: trigger.channels || [],
          template: trigger.template || "",
          isActive: trigger.isActive,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load automation.",
        variant: "destructive",
      })
    } finally {
      setFetching(false)
    }
  }

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.event || formData.channels.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in name, event, and select at least one channel.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/automation/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          conditions: formData.conditions || null,
          template: formData.template || null,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Automation updated successfully.",
        })
        router.push("/hr/automation")
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "Failed to update automation.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update automation.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || fetching) {
    return (
      <div className="flex min-h-screen">
        <Sidebar role="HR" />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-8 mt-16">
            <div className="text-center py-12">Loading...</div>
          </main>
        </div>
      </div>
    )
  }

  if (!session || !["HR", "ADMIN"].includes((session.user as any)?.role)) {
    router.push("/auth/signin")
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={(session.user as any).role} />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-16">
          <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/hr/automation">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Automation</h1>
          <p className="text-gray-600 mt-2">Update automation settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Automation Details</CardTitle>
            <CardDescription>Configure when and how the automation should run</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Send welcome email to new candidates"
                required
              />
            </div>

            <div>
              <Label htmlFor="event">Trigger Event *</Label>
              <Select value={formData.event} onValueChange={(value) => setFormData({ ...formData, event: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger event" />
                </SelectTrigger>
                <SelectContent>
                  {TRIGGER_EVENTS.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="conditions">Conditions (JSON, optional)</Label>
              <Textarea
                id="conditions"
                value={formData.conditions}
                onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                placeholder='{"status": "IN_COURSE", "progress": {"gte": 50}}'
                rows={3}
              />
            </div>

            <div>
              <Label>Notification Channels *</Label>
              <div className="mt-2 space-y-2">
                {CHANNELS.map((channel) => (
                  <div key={channel.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.value}
                      checked={formData.channels.includes(channel.value)}
                      onCheckedChange={() => handleChannelToggle(channel.value)}
                    />
                    <label
                      htmlFor={channel.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {channel.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="template">Notification Template (optional)</Label>
              <Textarea
                id="template"
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                placeholder="Notification message template"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Link href="/hr/automation">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
          </div>
        </main>
      </div>
    </div>
  )
}

