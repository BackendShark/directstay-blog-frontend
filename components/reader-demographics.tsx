export function ReaderDemographics() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Reader Demographics</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🗺️</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">United States</p>
              <p className="text-xs text-gray-600">Age group : 19 - 25</p>
              <p className="text-xs text-gray-600">Mobile device : 80%</p>
              <p className="text-xs text-gray-600">Desktop device : 20%</p>
            </div>
          </div>
          <p className="text-lg font-bold text-blue-600">75%</p>
        </div>
      </div>
    </div>
  )
}
