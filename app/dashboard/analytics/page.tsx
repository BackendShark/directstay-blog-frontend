"use client"


import { AnalyticsMetrics } from "@/components/analytics-metrics"
import { TrafficOverview } from "@/components/traffic-overview"
import { ReaderDemographics } from "@/components/reader-demographics"
import { EngagementAnalytics } from "@/components/engagement-analytics"
import { CategoryPerformance } from "@/components/category-performance"
import { SearchTrends } from "@/components/search-trends"
import { RecentActivities } from "@/components/recent-activities"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
   
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            {/* Date Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm">
                <span>📅</span>
                <span className="text-gray-700">Dec 24 - Dec 31</span>
              </div>
              <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer">
                <option>Country</option>
              </select>
              <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer">
                <option>User type</option>
              </select>
            </div>

            {/* Metrics Cards */}
            <AnalyticsMetrics />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficOverview />
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Top Posts</h2>
                <div className="bg-white rounded-lg p-6 space-y-4">
                  {["Lagos Home Tour Guide", "Weekend Stay in Lekki", "Best Furniture for Small Spaces"].map(
                    (title, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                            <span>👁️ 3.8k</span>
                            <span>❤️ 3.8k</span>
                            <span>🕐 1min</span>
                            <span>📤 3.8k</span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Reader Demographics and Engagement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReaderDemographics />
              <EngagementAnalytics />
            </div>

            {/* Category Performance and Search Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryPerformance />
              <SearchTrends />
            </div>

            {/* Recent Activities */}
            <RecentActivities />
          </div>
        </main>
      </div>
    </div>
  )
}
