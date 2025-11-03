import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, User, Package, TrendingUp, AlertCircle, CheckCircle, X, Search, Phone, Mail, Home, CreditCard, Star } from 'lucide-react';

const SmartServeDemo = () => {
  const [activeView, setActiveView] = useState('intro');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);

  // Sample customer data - simulating Tamr's unified view
  const customerData = {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(555) 234-5678',
    currentAddress: '742 Evergreen Terrace, Springfield, IL, 62701',
    oldAddress: '123 Oak Street, Chicago, IL, 60601',
    tamrId: 'a2d044ec-23b3-3272-9bcc-33af212d9scf',
    sources: ['E-commerce Site', 'Mobile App', 'Call Center CRM'],
    purchaseHistory: [
      { item: 'Running Shoes', date: '2024-09-15', channel: 'Mobile App' },
      { item: 'Yoga Mat', date: '2024-08-22', channel: 'Website' },
      { item: 'Water Bottle', date: '2024-07-10', channel: 'In-Store' }
    ],
    loyaltyPoints: 1250,
    lifetimeValue: 2840,
    lastInteraction: '2024-10-28'
  };

  const metrics = [
    { label: 'Shipping Errors', value: '95%', trend: 'down', color: 'green' },
    { label: 'Customer Satisfaction', value: '40%', trend: 'up', color: 'green' },
    { label: 'Annual Savings', value: '$2.1M', trend: 'up', color: 'green' },
    { label: 'Support Resolution Time', value: '60%', trend: 'down', color: 'green' },
    { label: 'Personalization Lift', value: '25%', trend: 'up', color: 'blue' },
    { label: 'Duplicate Accounts', value: '89%', trend: 'down', color: 'green' }
  ];

  const IntroView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">SmartServe</h1>
          <p className="text-xl text-gray-600 mb-2">Retail Experience Revolution</p>
          <p className="text-lg text-gray-500">Powered by Tamr Customer 360</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">The Challenge</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Meet Sarah - Your Frustrated Customer</h3>
                <ul className="space-y-2 text-red-700">
                  <li>✗ Ordered overnight delivery for a birthday gift</li>
                  <li>✗ Package went to her OLD address from 2 years ago</li>
                  <li>✗ Called support - they had the WRONG phone number</li>
                  <li>✗ Tried to update profile - created a DUPLICATE account</li>
                  <li className="font-bold mt-4">Result: Lost customer, negative review, $150 refund cost</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-semibold text-gray-700 mb-6">What if this could be different?</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setActiveView('before')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                See The Problem (Before Tamr)
              </button>
              <button
                onClick={() => setActiveView('after')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                See The Solution (With Tamr)
              </button>
              <button
                onClick={() => setShowMetrics(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Show Business Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BeforeView = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-red-600">Without Tamr: Fragmented Data</h2>
            <button onClick={() => setActiveView('intro')} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">Multiple systems, inconsistent data, frustrated customers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center">
              <Package className="mr-2" size={20} /> E-commerce System
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> Sarah Mitchell</p>
              <p><strong>Email:</strong> sarah.mitchell@email.com</p>
              <p className="text-red-600"><strong>Address:</strong> 123 Oak Street, Chicago (OLD!)</p>
              <p><strong>Phone:</strong> (555) 234-5678</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center">
              <Phone className="mr-2" size={20} /> Call Center CRM
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> S. Mitchell</p>
              <p className="text-red-600"><strong>Email:</strong> sarahmitchell@oldmail.com (WRONG!)</p>
              <p><strong>Address:</strong> 742 Evergreen Terrace, Springfield</p>
              <p className="text-red-600"><strong>Phone:</strong> (555) 999-0000 (DISCONNECTED!)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center">
              <ShoppingCart className="mr-2" size={20} /> Mobile App
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> Sarah M.</p>
              <p><strong>Email:</strong> sarah.mitchell@email.com</p>
              <p><strong>Address:</strong> 742 Evergreen Terrace</p>
              <p className="text-red-600"><strong>Phone:</strong> Not provided</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg shadow-lg p-6 border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <AlertCircle className="mr-2" /> The Customer Experience
          </h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-start mb-3">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <Package className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Checkout Experience</p>
                <p className="text-sm text-gray-600">System shows OLD Chicago address as default</p>
                <p className="text-sm text-red-600">Sarah doesn't notice - rushes through checkout</p>
              </div>
            </div>
            <div className="flex items-start mb-3">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Delivery Problem</p>
                <p className="text-sm text-gray-600">Package delivered to empty apartment in Chicago</p>
                <p className="text-sm text-red-600">Sarah is in Springfield - package is 200 miles away!</p>
              </div>
            </div>
            <div className="flex items-start mb-3">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <Phone className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Support Nightmare</p>
                <p className="text-sm text-gray-600">Call center can't reach her - wrong phone number</p>
                <p className="text-sm text-red-600">Sarah has to call them, wait 45 minutes on hold</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <User className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Account Chaos</p>
                <p className="text-sm text-gray-600">Tries to update address - creates duplicate account</p>
                <p className="text-sm text-red-600">Now has 2 profiles, loyalty points split across both</p>
              </div>
            </div>
          </div>
          <div className="bg-red-100 rounded p-4 mt-4">
            <p className="font-bold text-red-800 text-lg">Business Impact:</p>
            <ul className="text-red-700 mt-2 space-y-1">
              <li>• $150 refund + $30 shipping cost</li>
              <li>• 2 hours of support agent time ($80)</li>
              <li>• Lost future revenue: $500/year customer lifetime value</li>
              <li>• 1-star review seen by 10,000+ potential customers</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setActiveView('after')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            See How Tamr Solves This →
          </button>
        </div>
      </div>
    </div>
  );

  const AfterView = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-600">With Tamr: Unified Customer 360</h2>
            <button onClick={() => setActiveView('intro')} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-2">One golden record, complete accuracy, delighted customers</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle size={16} className="text-green-500" />
            <span>Data mastered from 3 sources in real-time</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Customer 360 View */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="mr-2 text-purple-600" size={24} />
                  {customerData.name}
                </h3>
                <div className="flex gap-2">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    VERIFIED
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ACTIVE
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="mr-3 text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{customerData.email}</p>
                  </div>
                  <CheckCircle className="ml-auto text-green-500" size={18} />
                </div>

                <div className="flex items-center text-gray-700">
                  <Phone className="mr-3 text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{customerData.phone}</p>
                  </div>
                  <CheckCircle className="ml-auto text-green-500" size={18} />
                </div>

                <div className="flex items-start text-gray-700">
                  <Home className="mr-3 text-gray-400 mt-1" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Primary Address</p>
                    <p className="font-medium">{customerData.currentAddress}</p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="text-green-500 mr-1" size={14} />
                      <span className="text-xs text-green-600">Validated & Geocoded</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">Tamr ID</p>
                <p className="text-xs font-mono text-gray-600">{customerData.tamrId}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                <Package className="mr-2 text-blue-600" size={20} />
                Unified from {customerData.sources.length} Sources
              </h4>
              <div className="space-y-2">
                {customerData.sources.map((source, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span className="text-gray-600">{source}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-6 text-white">
              <h4 className="font-bold mb-3 flex items-center">
                <Star className="mr-2" size={20} />
                Customer Value
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-90">Loyalty Points</p>
                  <p className="text-2xl font-bold">{customerData.loyaltyPoints.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Lifetime Value</p>
                  <p className="text-2xl font-bold">${customerData.lifetimeValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Experience */}
          <div>
            <div className="bg-green-50 rounded-lg shadow-lg p-6 border-2 border-green-300 mb-4">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <CheckCircle className="mr-2" /> The SmartServe Experience
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <User className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Smart Recognition</p>
                      <p className="text-sm text-gray-600 mt-1">Sarah logs in - system instantly recognizes her across all channels</p>
                      <p className="text-sm text-green-600 font-medium mt-1">✓ "Welcome back, Sarah! We found your profile"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Intelligent Address</p>
                      <p className="text-sm text-gray-600 mt-1">System shows current, verified Springfield address</p>
                      <p className="text-sm text-green-600 font-medium mt-1">✓ No confusion, package goes to right place</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <ShoppingCart className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Personalized Recommendations</p>
                      <p className="text-sm text-gray-600 mt-1">Based on complete purchase history from all channels</p>
                      <p className="text-sm text-green-600 font-medium mt-1">✓ "You might also like: Fitness Tracker"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <Phone className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Proactive Support</p>
                      <p className="text-sm text-gray-600 mt-1">Support can reach her with correct phone number</p>
                      <p className="text-sm text-green-600 font-medium mt-1">✓ SMS delivery notification sent instantly</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <Package className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Perfect Delivery</p>
                      <p className="text-sm text-gray-600 mt-1">Package arrives on time, correct address</p>
                      <p className="text-sm text-green-600 font-medium mt-1">✓ Birthday saved! 5-star review posted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 rounded-lg p-6">
              <p className="font-bold text-green-800 text-lg mb-2">Business Impact:</p>
              <ul className="text-green-700 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>Zero shipping errors - correct address every time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>Happy customer - will buy again (predicted $500/year)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>5-star review drives 10+ new customers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>No support time needed - self-service success</span>
                </li>
                <li className="flex items-start font-bold text-lg mt-3">
                  <TrendingUp className="mr-2 mt-0.5 flex-shrink-0" size={20} />
                  <span>Net gain: $680 from this one transaction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowMetrics(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            See Enterprise-Wide Business Impact →
          </button>
        </div>
      </div>
    </div>
  );

  const MetricsView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-purple-600">Business Impact Dashboard</h2>
              <p className="text-gray-600 mt-2">Real results from Tamr-powered Customer 360</p>
            </div>
            <button onClick={() => setShowMetrics(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-gray-600 font-medium">{metric.label}</h3>
                {metric.trend === 'up' ? (
                  <TrendingUp className={`text-${metric.color}-500`} size={20} />
                ) : (
                  <TrendingUp className={`text-${metric.color}-500 transform rotate-180`} size={20} />
                )}
              </div>
              <p className={`text-4xl font-bold text-${metric.color}-600`}>{metric.value}</p>
              <p className="text-sm text-gray-500 mt-2">
                {metric.trend === 'up' ? 'Increase' : 'Reduction'}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Capabilities Enabled</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Real-Time Customer Recognition</p>
                  <p className="text-sm text-gray-600">Instant identification across all touchpoints</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Validated Address Data</p>
                  <p className="text-sm text-gray-600">Geocoded, standardized, always current</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Complete Purchase History</p>
                  <p className="text-sm text-gray-600">Unified view across web, mobile, and in-store</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Zero Duplicate Accounts</p>
                  <p className="text-sm text-gray-600">One customer, one golden record</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-700">Hyper-Personalization at Scale</p>
                  <p className="text-sm text-gray-600">AI-driven recommendations from complete data</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Annual ROI Summary</h3>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90">Shipping Error Reduction</p>
                <p className="text-2xl font-bold">$2,100,000</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90">Support Cost Savings</p>
                <p className="text-2xl font-bold">$890,000</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90">Increased Customer Lifetime Value</p>
                <p className="text-2xl font-bold">$3,500,000</p>
              </div>
              <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4 border-2 border-white">
                <p className="text-sm font-semibold">Total Annual Impact</p>
                <p className="text-4xl font-bold">$6.5M</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mt-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Customer Experience?</h3>
          <p className="text-gray-600 mb-6">See how Tamr's Customer 360 can power your business applications</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveView('before')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              ← Review The Problem
            </button>
            <button
              onClick={() => setActiveView('after')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              ← Review The Solution
            </button>
            <button
              onClick={() => setActiveView('intro')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {showMetrics ? (
        <MetricsView />
      ) : (
        <>
          {activeView === 'intro' && <IntroView />}
          {activeView === 'before' && <BeforeView />}
          {activeView === 'after' && <AfterView />}
        </>
      )}
    </div>
  );
};

export default SmartServeDemo;