export default function ContactUs() {
    const handleSubmit = () => {
            alert("Thank you, your response has been recorded!");
    };
  
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200"
      >
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-800">Contact Us</h2>
            <p className="mt-4 text-gray-700 text-lg">
              Need help or have a question about the e-Doc Portal? We’re here for you.
            </p>
          </div>
  
          <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Your message..."
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
  
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Reach Us</h3>
                <p className="mt-2 text-gray-700">Our team is available 9 AM to 6 PM, Monday to Friday.</p>
              </div>
  
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@edocportal.com</p>
                <p><strong>Phone:</strong> +91 12345667897</p>
                <p><strong>Address:</strong> Janakpuri, New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  