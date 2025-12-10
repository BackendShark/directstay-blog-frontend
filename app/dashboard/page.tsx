import { MetricsCards } from "@/components/metrics-cards"
import { UserActivityTrend } from "@/components/user-activity-trend"
import { RecentActivities } from "@/components/recent-activities"
import { CollaborationRequests } from "@/components/collaboration-requests"
import { CollaborationSummary } from "@/components/collaboration-summary"
import { TopPerformingPost } from "@/components/top-performing-post"
import { SystemHealth } from "@/components/system-health"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Date Range and Create Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📅 Dec 24 - Dec 31</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 flex items-center gap-2">
          ✏️ Create Blog
        </button>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserActivityTrend />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>

      {/* Collaboration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CollaborationRequests />
        </div>
        <div>
          <CollaborationSummary />
        </div>
      </div>

      {/* Top Performing Post */}
      <TopPerformingPost />

      {/* System Health */}
      <SystemHealth />
    </div>
  )
}
