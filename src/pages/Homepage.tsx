function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Our Homepage</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover our community and connect with others who share your faith and values.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">Join our vibrant community of believers and grow together in faith.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Events</h3>
            <p className="text-gray-600">Stay updated with our latest events and activities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
