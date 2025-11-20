"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Send, Users, FileCheck, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const CANDIDATE_STATUSES = [
  { value: "REGISTERED", label: "Registered" },
  { value: "PROFILE_COMPLETED", label: "Profile Completed" },
  { value: "IN_COURSE", label: "In Course" },
  { value: "TEST_COMPLETED", label: "Test Completed" },
  { value: "OFFER_SENT", label: "Offer Sent" },
  { value: "OFFER_ACCEPTED", label: "Offer Accepted" },
  { value: "OFFER_DECLINED", label: "Offer Declined" },
  { value: "HIRED", label: "Hired" },
  { value: "REJECTED", label: "Rejected" },
  { value: "IN_TALENT_POOL", label: "In Talent Pool" },
]

const NOTIFICATION_TYPES = [
  { value: "info", label: "Info" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
]

const CHANNELS = [
  { value: "INTERNAL", label: "Internal" },
  { value: "EMAIL", label: "Email" },
  { value: "PUSH", label: "Push" },
]

export default function BulkNotificationsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedVacancy, setSelectedVacancy] = useState<string>("")
  const [vacancies, setVacancies] = useState<any[]>([])
  const [candidateCount, setCandidateCount] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    channel: "INTERNAL",
    includeOffer: false,
    offerContent: "",
  })

  useEffect(() => {
    fetchVacancies()
  }, [])

  useEffect(() => {
    if (selectedStatuses.length > 0 || selectedVacancy) {
      fetchCandidateCount()
    } else {
      setCandidateCount(0)
    }
  }, [selectedStatuses, selectedVacancy])

  const fetchVacancies = async () => {
    try {
      const response = await fetch("/api/vacancies")
      if (response.ok) {
        const data = await response.json()
        setVacancies(data.vacancies || [])
      }
    } catch (error) {
      console.error("Error fetching vacancies:", error)
    }
  }

  const fetchCandidateCount = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedStatuses.length > 0) {
        params.set("statuses", selectedStatuses.join(","))
      }
      if (selectedVacancy) {
        params.set("vacancyId", selectedVacancy)
      }

      const response = await fetch(`/api/candidates/count?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setCandidateCount(data.count || 0)
      }
    } catch (error) {
      console.error("Error fetching candidate count:", error)
    }
  }

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (candidateCount === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one status or vacancy to send notifications.",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in title and message.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/notifications/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statuses: selectedStatuses,
          vacancyId: selectedVacancy || null,
          title: formData.title,
          message: formData.message,
          type: formData.type,
          channel: formData.channel,
          includeOffer: formData.includeOffer,
          offerContent: formData.includeOffer ? formData.offerContent : null,
          vacancyIdForOffer: formData.includeOffer ? selectedVacancy : null,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Notifications sent to ${candidateCount} candidate(s).`,
        })
        // Reset form
        setFormData({
          title: "",
          message: "",
          type: "info",
          channel: "INTERNAL",
          includeOffer: false,
          offerContent: "",
        })
        setSelectedStatuses([])
        setSelectedVacancy("")
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "Failed to send notifications.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notifications.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
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
          <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bulk Notifications</h1>
        <p className="text-gray-600 mt-2">Send notifications to candidates filtered by status or vacancy</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Filter Candidates
            </CardTitle>
            <CardDescription>Select candidate statuses or vacancy to target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Candidate Statuses</Label>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                {CANDIDATE_STATUSES.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={status.value}
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={() => handleStatusToggle(status.value)}
                    />
                    <label
                      htmlFor={status.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Vacancy (Optional)</Label>
              <Select value={selectedVacancy} onValueChange={setSelectedVacancy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vacancy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All vacancies</SelectItem>
                  {vacancies.map((vacancy) => (
                    <SelectItem key={vacancy.id} value={vacancy.id}>
                      {vacancy.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {candidateCount > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  {candidateCount} candidate(s) will receive this notification
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Details</CardTitle>
            <CardDescription>Compose your notification message</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Notification title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Notification message"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NOTIFICATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="channel">Channel</Label>
                  <Select
                    value={formData.channel}
                    onValueChange={(value) => setFormData({ ...formData, channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CHANNELS.map((channel) => (
                        <SelectItem key={channel.value} value={channel.value}>
                          {channel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeOffer"
                  checked={formData.includeOffer}
                  onCheckedChange={(checked) => setFormData({ ...formData, includeOffer: checked as boolean })}
                />
                <label
                  htmlFor="includeOffer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Include job offer
                </label>
              </div>

              {formData.includeOffer && (
                <div>
                  <Label htmlFor="offerContent">Offer Content</Label>
                  <Textarea
                    id="offerContent"
                    value={formData.offerContent}
                    onChange={(e) => setFormData({ ...formData, offerContent: e.target.value })}
                    placeholder="Job offer details..."
                    rows={4}
                  />
                  {!selectedVacancy && (
                    <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Please select a vacancy to create offers
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading || candidateCount === 0}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Sending..." : `Send to ${candidateCount} candidate(s)`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
          </div>
        </main>
      </div>
    </div>
  )
}

