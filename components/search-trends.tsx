export function SearchTrends() {
  const trends = ["Miami apartments", "Budget travel", "Host income", "Shortlet in Atlanta", "Shortlet in Atlanta"]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Search Trends</h2>
      <div className="space-y-3">
        {trends.map((trend, idx) => (
          <p key={idx} className="text-sm text-gray-700 py-2 border-b border-gray-100 last:border-b-0">
            {trend}
          </p>
        ))}
      </div>
    </div>
  )
}
