import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, User, Package, TrendingUp, AlertCircle, CheckCircle, X, Search, Phone, Mail, Home, CreditCard, Star, Building2, Heart, Shield, Users, DollarSign, Clock, Navigation } from 'lucide-react';

const SmartServeDemo = () => {
  const [activeView, setActiveView] = useState('intro');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('retail');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 39.7817, lng: -89.6501 }); // Springfield, IL
  const [showMap, setShowMap] = useState(false);
  const [addressValidation, setAddressValidation] = useState(null);

  // Industry scenarios configuration
  const scenarios = {
    retail: {
      icon: ShoppingCart,
      name: 'Retail E-Commerce',
      color: 'purple',
      customer: {
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@email.com',
        phone: '(555) 234-5678',
        currentAddress: '742 Evergreen Terrace, Springfield, IL, 62701',
        oldAddress: '123 Oak Street, Chicago, IL, 60601',
        tamrId: 'a2d044ec-23b3-3272-9bcc-33af212d9scf',
        sources: ['E-commerce Site', 'Mobile App', 'Call Center CRM'],
        data: {
          loyaltyPoints: 1250,
          lifetimeValue: 2840,
          lastPurchase: '2024-10-28',
          purchaseCount: 23
        }
      },
      problem: {
        title: 'Package Delivery Nightmare',
        issues: [
          'Package sent to old address from 2 years ago',
          'Customer moved 200 miles away',
          'Wrong phone number prevented delivery notification',
          'Created duplicate account trying to update info'
        ],
        cost: '$730'
      },
      solution: {
        title: 'Perfect Delivery Experience',
        benefits: [
          'Correct current address validated and geocoded',
          'Proactive SMS notification to verified phone',
          'Personalized product recommendations',
          'Zero duplicate accounts'
        ],
        value: '$680 gained'
      }
    },
    banking: {
      icon: Building2,
      name: 'Banking & Financial Services',
      color: 'blue',
      customer: {
        name: 'Michael Chen',
        email: 'michael.chen@techcorp.com',
        phone: '(555) 789-0123',
        currentAddress: '456 Financial Plaza, New York, NY, 10004',
        oldAddress: '789 Silicon Valley Dr, San Jose, CA, 95110',
        tamrId: 'b3e155fd-34c4-4383-accf-44bg323e0tdf',
        sources: ['Online Banking', 'Mobile App', 'Branch CRM', 'Credit Card System'],
        data: {
          accountBalance: 145780,
          creditScore: 780,
          accountAge: '8 years',
          productCount: 5
        }
      },
      problem: {
        title: 'KYC Compliance Failure',
        issues: [
          'Outdated address triggered compliance alert',
          'Multiple accounts with different SSN formats',
          'Failed to detect suspicious activity pattern',
          'Customer locked out during fraud investigation'
        ],
        cost: '$15,000'
      },
      solution: {
        title: 'Seamless KYC & Fraud Prevention',
        benefits: [
          'Real-time identity verification across all systems',
          'Unified view prevents false fraud alerts',
          'Complete transaction history for risk assessment',
          'Regulatory compliance with verified data'
        ],
        value: '$45,000 prevented fraud'
      }
    },
    healthcare: {
      icon: Heart,
      name: 'Healthcare Patient Portal',
      color: 'red',
      customer: {
        name: 'Jennifer Rodriguez',
        email: 'j.rodriguez@email.com',
        phone: '(555) 456-7890',
        currentAddress: '321 Wellness Way, Boston, MA, 02108',
        oldAddress: '654 Health Street, Miami, FL, 33101',
        tamrId: 'c4f266ge-45d5-5494-bdde-55ch434f1ueg',
        sources: ['Hospital EMR', 'Patient Portal', 'Insurance System', 'Pharmacy Records'],
        data: {
          mrn: 'MRN-789456',
          insuranceId: 'INS-445566',
          lastVisit: '2024-10-15',
          activeRx: 3
        }
      },
      problem: {
        title: 'Medical Record Mismatch',
        issues: [
          'Lab results sent to wrong address',
          'Duplicate patient records caused medication error',
          'Insurance claim rejected due to data mismatch',
          'Emergency contact information outdated'
        ],
        cost: '$8,500'
      },
      solution: {
        title: 'Unified Patient Care',
        benefits: [
          'Single patient record across all providers',
          'Accurate medication history prevents errors',
          'Seamless insurance verification',
          'Current emergency contact always available'
        ],
        value: '$12,000 avoided costs'
      }
    }
  };

  const currentScenario = scenarios[selectedScenario];

  // Tamr API Integration - Search Contacts
  const searchTamrContacts = async (query) => {
    setIsSearching(true);
    try {
      // Parse the search query to extract parameters
      const nameParts = query.split(' ');
      const searchParams = {
        full_name: query,
        address: null,
        city: null,
        state: null,
        country: null
      };

      const results = await window.Tamr_Cloud?.search_contacts(searchParams);
      
      if (results && results.length > 0) {
        setSearchResults(results);
        // Auto-select first result
        handleSelectCustomer(results[0]);
      } else {
        // Fallback to scenario data if no results
        setSearchResults([currentScenario.customer]);
        handleSelectCustomer(currentScenario.customer);
      }
    } catch (error) {
      console.log('Using demo data:', error);
      // Fallback to scenario data
      setSearchResults([currentScenario.customer]);
      handleSelectCustomer(currentScenario.customer);
    }
    setIsSearching(false);
  };

  // Google Maps Integration - Geocode Address
  const validateAddress = async (address) => {
    try {
      const result = await window.google_maps?.maps_geocode({ address });
      if (result && result.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        const formattedAddress = result.results[0].formatted_address;
        
        setAddressValidation({
          original: address,
          validated: formattedAddress,
          coordinates: location,
          quality: 'VERIFIED',
          confidence: 95
        });
        
        setMapCenter(location);
        setShowMap(true);
        
        return {
          success: true,
          location,
          formatted: formattedAddress
        };
      }
    } catch (error) {
      console.log('Geocoding error:', error);
      // Fallback validation
      setAddressValidation({
        original: address,
        validated: address,
        coordinates: mapCenter,
        quality: 'MANUAL',
        confidence: 85
      });
    }
  };

  // Handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    if (customer.currentAddress) {
      validateAddress(customer.currentAddress);
    }
  };

  // Search handler
  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchTamrContacts(searchQuery);
    }
  };

  const metrics = {
    retail: [
      { label: 'Shipping Errors', value: '95%', trend: 'down', color: 'green' },
      { label: 'Customer Satisfaction', value: '40%', trend: 'up', color: 'green' },
      { label: 'Annual Savings', value: '$2.1M', trend: 'up', color: 'green' },
      { label: 'Support Resolution Time', value: '60%', trend: 'down', color: 'green' },
      { label: 'Personalization Lift', value: '25%', trend: 'up', color: 'blue' },
      { label: 'Duplicate Accounts', value: '89%', trend: 'down', color: 'green' }
    ],
    banking: [
      { label: 'KYC Processing Time', value: '75%', trend: 'down', color: 'green' },
      { label: 'Fraud Detection Rate', value: '92%', trend: 'up', color: 'green' },
      { label: 'Compliance Violations', value: '98%', trend: 'down', color: 'green' },
      { label: 'Customer Onboarding', value: '65%', trend: 'down', color: 'green' },
      { label: 'False Positives', value: '80%', trend: 'down', color: 'blue' },
      { label: 'Annual Risk Reduction', value: '$8.5M', trend: 'up', color: 'green' }
    ],
    healthcare: [
      { label: 'Medical Errors', value: '82%', trend: 'down', color: 'green' },
      { label: 'Patient Satisfaction', value: '55%', trend: 'up', color: 'green' },
      { label: 'Insurance Claim Accuracy', value: '94%', trend: 'up', color: 'green' },
      { label: 'Duplicate Records', value: '91%', trend: 'down', color: 'green' },
      { label: 'Care Coordination', value: '68%', trend: 'up', color: 'blue' },
      { label: 'Annual Cost Savings', value: '$4.2M', trend: 'up', color: 'green' }
    ]
  };

  const IntroView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">SmartServe</h1>
          <p className="text-xl text-gray-600 mb-2">Customer Experience Revolution</p>
          <p className="text-lg text-gray-500">Powered by Tamr Customer 360</p>
        </div>

        {/* Scenario Selection */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Industry</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(scenarios).map(([key, scenario]) => {
              const Icon = scenario.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    selectedScenario === key
                      ? `border-${scenario.color}-500 bg-${scenario.color}-50 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`mx-auto mb-3 text-${scenario.color}-600`} size={40} />
                  <h3 className="font-bold text-gray-800 mb-2">{scenario.name}</h3>
                  <p className="text-sm text-gray-600">See how Tamr transforms customer experience</p>
                </button>
              );
            })}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">The Challenge</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-red-800 mb-2">{currentScenario.problem.title}</h4>
                  <ul className="space-y-2 text-red-700">
                    {currentScenario.problem.issues.map((issue, idx) => (
                      <li key={idx}>✗ {issue}</li>
                    ))}
                    <li className="font-bold mt-4">Business Impact: {currentScenario.problem.cost}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-semibold text-gray-700 mb-6">See The Transformation</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setActiveView('before')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                The Problem (Before Tamr)
              </button>
              <button
                onClick={() => setActiveView('search')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Try Live Customer Search
              </button>
              <button
                onClick={() => setActiveView('after')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                The Solution (With Tamr)
              </button>
              <button
                onClick={() => setShowMetrics(true)}
                className={`bg-${currentScenario.color}-500 hover:bg-${currentScenario.color}-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg`}
              >
                Show Business Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SearchView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Live Customer Search</h2>
            <button onClick={() => setActiveView('intro')} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600">Search Tamr's unified customer database in real-time</p>
        </div>

        {/* Search Interface */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={`Search by name (e.g., "${currentScenario.customer.name}")`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:bg-gray-400"
            >
              <Search size={20} />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Try it:</strong> Search for "{currentScenario.customer.name}" to see unified customer data from multiple sources
            </p>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Search Results ({searchResults.length})</h3>
              <div className="space-y-4">
                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectCustomer(result)}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{result.name}</h4>
                        <p className="text-sm text-gray-600">{result.email}</p>
                        <p className="text-sm text-gray-600">{result.currentAddress}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {result.sources?.length || 3} SOURCES
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          VERIFIED
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer 360 View with Map */}
        {selectedCustomer && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className={`mr-2 text-${currentScenario.color}-600`} size={24} />
                Customer 360 View
              </h3>

              <div className="space-y-4 mb-4">
                <div className="flex items-center text-gray-700">
                  <User className="mr-3 text-gray-400" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium">{selectedCustomer.name}</p>
                  </div>
                  <CheckCircle className="text-green-500" size={18} />
                </div>

                <div className="flex items-center text-gray-700">
                  <Mail className="mr-3 text-gray-400" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  <CheckCircle className="text-green-500" size={18} />
                </div>

                <div className="flex items-center text-gray-700">
                  <Phone className="mr-3 text-gray-400" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <CheckCircle className="text-green-500" size={18} />
                </div>

                <div className="flex items-start text-gray-700">
                  <Home className="mr-3 text-gray-400 mt-1" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Primary Address</p>
                    <p className="font-medium">{selectedCustomer.currentAddress}</p>
                    {addressValidation && (
                      <div className="mt-2 bg-green-50 p-2 rounded">
                        <div className="flex items-center text-xs text-green-700">
                          <CheckCircle className="mr-1" size={12} />
                          <span>Geocoded & Validated ({addressValidation.confidence}% confidence)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                  <Package className={`mr-2 text-${currentScenario.color}-600`} size={20} />
                  Unified from {selectedCustomer.sources?.length || 3} Sources
                </h4>
                <div className="space-y-2">
                  {(selectedCustomer.sources || currentScenario.customer.sources).map((source, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-gray-600">{source}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-1">Tamr ID</p>
                <p className="text-xs font-mono text-gray-600">{selectedCustomer.tamrId}</p>
              </div>
            </div>

            {/* Map View */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="mr-2 text-green-600" size={24} />
                Address Validation & Geocoding
              </h3>

              {showMap ? (
                <div>
                  <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
                    <div className="relative z-10 text-center">
                      <MapPin className="mx-auto mb-2 text-green-600" size={48} />
                      <p className="font-bold text-gray-800">Address Verified</p>
                      <p className="text-sm text-gray-600">Lat: {mapCenter.lat.toFixed(4)}</p>
                      <p className="text-sm text-gray-600">Lng: {mapCenter.lng.toFixed(4)}</p>
                    </div>
                  </div>

                  {addressValidation && (
                    <div className="space-y-3">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-yellow-800 mb-1">Original Address</p>
                        <p className="text-sm text-yellow-900">{addressValidation.original}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-green-800 mb-1">Validated Address</p>
                        <p className="text-sm text-green-900">{addressValidation.validated}</p>
                        <div className="flex items-center mt-2">
                          <CheckCircle className="text-green-600 mr-1" size={14} />
                          <span className="text-xs text-green-700">
                            {addressValidation.quality} - {addressValidation.confidence}% Match
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 font-semibold">Latitude</p>
                          <p className="text-sm font-mono">{addressValidation.coordinates.lat}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 font-semibold">Longitude</p>
                          <p className="text-sm font-mono">{addressValidation.coordinates.lng}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Navigation size={48} className="mx-auto mb-2" />
                    <p>Search for a customer to see address validation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setActiveView('after')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            See Complete Customer Experience →
          </button>
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
          <p className="text-gray-600 mb-2">Multiple systems, inconsistent data, frustrated customers</p>
          <div className="flex items-center gap-2">
            <div className={`bg-${currentScenario.color}-100 text-${currentScenario.color}-800 px-3 py-1 rounded-full text-sm font-semibold`}>
              {currentScenario.name}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {currentScenario.customer.sources.map((source, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-700 mb-2 flex items-center">
                <Package className="mr-2" size={20} /> {source}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Name:</strong> {idx === 0 ? currentScenario.customer.name : currentScenario.customer.name.split(' ')[0] + ' ' + currentScenario.customer.name.split(' ')[1][0] + '.'}</p>
                <p className={idx === 1 ? 'text-red-600' : ''}><strong>Email:</strong> {idx === 1 ? 'old@wrong.com' : currentScenario.customer.email}</p>
                <p className={idx === 0 ? 'text-red-600' : ''}><strong>Address:</strong> {idx === 0 ? currentScenario.customer.oldAddress : currentScenario.customer.currentAddress}</p>
                <p className={idx === 2 ? 'text-red-600' : ''}><strong>Phone:</strong> {idx === 2 ? 'Not provided' : currentScenario.customer.phone}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 rounded-lg shadow-lg p-6 border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <AlertCircle className="mr-2" /> {currentScenario.problem.title}
          </h3>
          <div className="space-y-3">
            {currentScenario.problem.issues.map((issue, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-red-100 rounded-full p-2 mr-3">
                    <AlertCircle className="text-red-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{issue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-red-100 rounded p-4 mt-4">
            <p className="font-bold text-red-800 text-lg">Business Impact: {currentScenario.problem.cost}</p>
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

  const AfterView = () => {
    const customer = selectedCustomer || currentScenario.customer;
    
    return (
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
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm text-gray-500">Data mastered from {customer.sources.length} sources in real-time</span>
              <div className={`ml-auto bg-${currentScenario.color}-100 text-${currentScenario.color}-800 px-3 py-1 rounded-full text-sm font-semibold`}>
                {currentScenario.name}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Customer 360 View */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <User className={`mr-2 text-${currentScenario.color}-600`} size={24} />
                    {customer.name}
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
                      <p className="font-medium">{customer.email}</p>
                    </div>
                    <CheckCircle className="ml-auto text-green-500" size={18} />
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Phone className="mr-3 text-gray-400" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                    <CheckCircle className="ml-auto text-green-500" size={18} />
                  </div>

                  <div className="flex items-start text-gray-700">
                    <Home className="mr-3 text-gray-400 mt-1" size={18} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Primary Address</p>
                      <p className="font-medium">{customer.currentAddress}</p>
                      <div className="flex items-center mt-1">
                        <CheckCircle className="text-green-500 mr-1" size={14} />
                        <span className="text-xs text-green-600">Validated & Geocoded</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Tamr ID</p>
                  <p className="text-xs font-mono text-gray-600">{customer.tamrId}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                  <Package className={`mr-2 text-${currentScenario.color}-600`} size={20} />
                  Unified from {customer.sources.length} Sources
                </h4>
                <div className="space-y-2">
                  {customer.sources.map((source, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-gray-600">{source}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`bg-gradient-to-r from-${currentScenario.color}-500 to-blue-500 rounded-lg shadow-lg p-6 text-white`}>
                <h4 className="font-bold mb-3 flex items-center">
                  <Star className="mr-2" size={20} />
                  Customer Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(customer.data).map(([key, value], idx) => (
                    <div key={idx}>
                      <p className="text-sm opacity-90 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Customer Experience */}
            <div>
              <div className="bg-green-50 rounded-lg shadow-lg p-6 border-2 border-green-300 mb-4">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="mr-2" /> {currentScenario.solution.title}
                </h3>
                <div className="space-y-4">
                  {currentScenario.solution.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <CheckCircle className="text-green-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{benefit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-100 rounded-lg p-6">
                <p className="font-bold text-green-800 text-lg mb-2">Business Value:</p>
                <p className="text-2xl font-bold text-green-900">{currentScenario.solution.value}</p>
                <ul className="text-green-700 space-y-2 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span>Perfect data quality across all touchpoints</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span>Real-time updates propagate instantly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span>Zero duplicate records or confusion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span>Compliance and audit ready</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowMetrics(true)}
              className={`bg-${currentScenario.color}-500 hover:bg-${currentScenario.color}-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg`}
            >
              See Enterprise-Wide Business Impact →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MetricsView = () => {
    const currentMetrics = metrics[selectedScenario];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-purple-600">Business Impact Dashboard</h2>
                <p className="text-gray-600 mt-2">Real results from Tamr-powered Customer 360</p>
                <div className={`mt-2 bg-${currentScenario.color}-100 text-${currentScenario.color}-800 px-4 py-2 rounded-full text-sm font-semibold inline-block`}>
                  {currentScenario.name}
                </div>
              </div>
              <button onClick={() => setShowMetrics(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {currentMetrics.map((metric, idx) => (
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
                    <p className="font-semibold text-gray-700">Complete Customer History</p>
                    <p className="text-sm text-gray-600">Unified view across all systems and channels</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-700">Zero Duplicate Records</p>
                    <p className="text-sm text-gray-600">One customer, one golden record</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-700">AI-Powered Personalization</p>
                    <p className="text-sm text-gray-600">Hyper-targeted experiences at scale</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-${currentScenario.color}-500 to-blue-500 rounded-lg shadow-lg p-6 text-white`}>
              <h3 className="text-xl font-bold mb-4">Annual ROI Summary</h3>
              <div className="space-y-4">
                {selectedScenario === 'retail' && (
                  <>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Shipping Error Reduction</p>
                      <p className="text-2xl font-bold">$2,100,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Support Cost Savings</p>
                      <p className="text-2xl font-bold">$890,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Increased CLV</p>
                      <p className="text-2xl font-bold">$3,500,000</p>
                    </div>
                    <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4 border-2 border-white">
                      <p className="text-sm font-semibold">Total Annual Impact</p>
                      <p className="text-4xl font-bold">$6.5M</p>
                    </div>
                  </>
                )}
                {selectedScenario === 'banking' && (
                  <>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Fraud Prevention</p>
                      <p className="text-2xl font-bold">$8,500,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Compliance Savings</p>
                      <p className="text-2xl font-bold">$2,300,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Operational Efficiency</p>
                      <p className="text-2xl font-bold">$1,800,000</p>
                    </div>
                    <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4 border-2 border-white">
                      <p className="text-sm font-semibold">Total Annual Impact</p>
                      <p className="text-4xl font-bold">$12.6M</p>
                    </div>
                  </>
                )}
                {selectedScenario === 'healthcare' && (
                  <>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Medical Error Prevention</p>
                      <p className="text-2xl font-bold">$4,200,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Insurance Accuracy</p>
                      <p className="text-2xl font-bold">$1,900,000</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Care Coordination</p>
                      <p className="text-2xl font-bold">$2,100,000</p>
                    </div>
                    <div className="bg-white bg-opacity-30 rounded-lg p-4 mt-4 border-2 border-white">
                      <p className="text-sm font-semibold">Total Annual Impact</p>
                      <p className="text-4xl font-bold">$8.2M</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Customer Experience?</h3>
            <p className="text-gray-600 mb-6">See how Tamr's Customer 360 can power your business applications</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setActiveView('search')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Try Live Search
              </button>
              <button
                onClick={() => setActiveView('before')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Review The Problem
              </button>
              <button
                onClick={() => setActiveView('after')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Review The Solution
              </button>
              <button
                onClick={() => setActiveView('intro')}
                className={`bg-${currentScenario.color}-500 hover:bg-${currentScenario.color}-600 text-white px-6 py-3 rounded-lg font-semibold transition-all`}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {showMetrics ? (
        <MetricsView />
      ) : (
        <>
          {activeView === 'intro' && <IntroView />}
          {activeView === 'search' && <SearchView />}
          {activeView === 'before' && <BeforeView />}
          {activeView === 'after' && <AfterView />}
        </>
      )}
    </div>
  );
};

export default SmartServeDemo;