function MyChurch() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Church</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To spread love, hope, and faith throughout our community while providing 
              spiritual guidance and support to all who seek it.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Service Times</h2>
            <div className="space-y-2 text-gray-600">
              <p><strong>Sunday:</strong> 9:00 AM & 11:00 AM</p>
              <p><strong>Wednesday:</strong> 7:00 PM</p>
              <p><strong>Friday:</strong> 6:30 PM (Youth)</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ministries</h2>
            <ul className="space-y-1 text-gray-600">
              <li>• Youth Ministry</li>
              <li>• Women's Ministry</li>
              <li>• Men's Ministry</li>
              <li>• Children's Ministry</li>
              <li>• Music Ministry</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">About Our Church</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our History</h3>
              <p className="text-gray-600 mb-4">
                Founded in 1985, our church has been a cornerstone of the community for nearly 
                four decades. We've grown from a small congregation of 20 members to a thriving 
                community of over 500 families.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Faith and spiritual growth</li>
                <li>• Community service and outreach</li>
                <li>• Love and acceptance for all</li>
                <li>• Biblical teaching and discipleship</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Pastor's Message</h3>
              <p className="text-gray-600 mb-4">
                "Welcome to our church family! We believe that everyone has a place here, 
                regardless of where they are in their spiritual journey. Come as you are, 
                and let's grow together in faith and love."
              </p>
              <p className="text-gray-600 italic">- Pastor John Smith</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
                <p className="text-gray-600">
                  Join one of our many ministries, volunteer for community outreach, 
                  or simply come and worship with us. There are many ways to connect 
                  and make a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyChurch
