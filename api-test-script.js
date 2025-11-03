/**
 * SmartServe API Test Script
 * 
 * This script demonstrates how to test the Tamr Cloud and Google Maps APIs
 * used in the SmartServe demo. Use this to verify connectivity and understand
 * the API responses before presenting the demo.
 */

// ==============================================================================
// TAMR CLOUD API TESTING
// ==============================================================================

/**
 * Test Tamr Cloud Customer Search
 * 
 * This function tests the search_contacts API to find customer records
 * based on various search criteria.
 */
async function testTamrSearch() {
  console.log('🔍 Testing Tamr Cloud Customer Search...\n');
  
  // Test Case 1: Search by full name
  console.log('Test 1: Search by full name');
  try {
    const result1 = await window.Tamr_Cloud?.search_contacts({
      full_name: 'Sarah Mitchell',
      address: null,
      city: null,
      state: null,
      country: null
    });
    
    console.log('✅ Search successful!');
    console.log(`Found ${result1?.length || 0} records`);
    if (result1 && result1.length > 0) {
      console.log('Sample record:', JSON.stringify(result1[0], null, 2));
    }
  } catch (error) {
    console.error('❌ Search failed:', error.message);
  }
  console.log('\n---\n');
  
  // Test Case 2: Search by city and state
  console.log('Test 2: Search by location');
  try {
    const result2 = await window.Tamr_Cloud?.search_contacts({
      full_name: null,
      address: null,
      city: 'Springfield',
      state: 'IL',
      country: 'US'
    });
    
    console.log('✅ Location search successful!');
    console.log(`Found ${result2?.length || 0} records in Springfield, IL`);
  } catch (error) {
    console.error('❌ Location search failed:', error.message);
  }
  console.log('\n---\n');
  
  // Test Case 3: Search by address
  console.log('Test 3: Search by address');
  try {
    const result3 = await window.Tamr_Cloud?.search_contacts({
      full_name: null,
      address: '742 Evergreen Terrace',
      city: null,
      state: null,
      country: null
    });
    
    console.log('✅ Address search successful!');
    console.log(`Found ${result3?.length || 0} records at this address`);
  } catch (error) {
    console.error('❌ Address search failed:', error.message);
  }
  console.log('\n---\n');
}

/**
 * Test Tamr Cloud Contact Update
 * 
 * This function tests the update_contact API to modify customer records.
 * CAUTION: This will actually modify data. Use with care!
 */
async function testTamrUpdate(recordId) {
  console.log('✏️ Testing Tamr Cloud Contact Update...\n');
  console.log('⚠️  WARNING: This will modify actual data!\n');
  
  // Example: Update phone number
  const updateData = {
    phone: '(555) 123-4567',
    // Add other fields as needed
  };
  
  try {
    console.log('Attempting to update record:', recordId);
    console.log('Update data:', JSON.stringify(updateData, null, 2));
    
    // Uncomment the line below to actually perform the update
    // const result = await window.Tamr_Cloud?.update_contact(recordId, updateData);
    
    console.log('🚫 Update skipped - uncomment code to enable');
    console.log('✅ When enabled, this would update the contact record');
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
  console.log('\n---\n');
}

// ==============================================================================
// GOOGLE MAPS API TESTING
// ==============================================================================

/**
 * Test Google Maps Geocoding
 * 
 * This function tests address validation and geocoding to convert
 * addresses into latitude/longitude coordinates.
 */
async function testGoogleGeocoding() {
  console.log('🗺️  Testing Google Maps Geocoding...\n');
  
  const testAddresses = [
    '742 Evergreen Terrace, Springfield, IL, 62701',
    '123 Oak Street, Chicago, IL, 60601',
    '456 Financial Plaza, New York, NY, 10004',
    '321 Wellness Way, Boston, MA, 02108'
  ];
  
  for (const address of testAddresses) {
    console.log(`Testing address: ${address}`);
    try {
      const result = await window.google_maps?.maps_geocode({ address });
      
      if (result && result.results && result.results.length > 0) {
        const geocoded = result.results[0];
        console.log('✅ Geocoding successful!');
        console.log(`   Formatted: ${geocoded.formatted_address}`);
        console.log(`   Coordinates: (${geocoded.geometry.location.lat}, ${geocoded.geometry.location.lng})`);
        console.log(`   Type: ${geocoded.geometry.location_type}`);
      } else {
        console.log('⚠️  No results found');
      }
    } catch (error) {
      console.error('❌ Geocoding failed:', error.message);
    }
    console.log('');
  }
  console.log('\n---\n');
}

/**
 * Test Google Maps Reverse Geocoding
 * 
 * This function tests converting coordinates back into addresses.
 */
async function testGoogleReverseGeocoding() {
  console.log('📍 Testing Google Maps Reverse Geocoding...\n');
  
  const testCoordinates = [
    { lat: 39.7817, lng: -89.6501, name: 'Springfield, IL' },
    { lat: 41.8781, lng: -87.6298, name: 'Chicago, IL' },
    { lat: 40.7128, lng: -74.0060, name: 'New York, NY' }
  ];
  
  for (const coord of testCoordinates) {
    console.log(`Testing coordinates: ${coord.name} (${coord.lat}, ${coord.lng})`);
    try {
      const result = await window.google_maps?.maps_reverse_geocode({
        latitude: coord.lat,
        longitude: coord.lng
      });
      
      if (result && result.results && result.results.length > 0) {
        console.log('✅ Reverse geocoding successful!');
        console.log(`   Address: ${result.results[0].formatted_address}`);
      } else {
        console.log('⚠️  No results found');
      }
    } catch (error) {
      console.error('❌ Reverse geocoding failed:', error.message);
    }
    console.log('');
  }
  console.log('\n---\n');
}

/**
 * Test Google Maps Place Search
 * 
 * This function tests finding nearby places or businesses.
 */
async function testGooglePlaceSearch() {
  console.log('🏪 Testing Google Maps Place Search...\n');
  
  const testSearches = [
    { query: 'pharmacy near Springfield IL', name: 'Pharmacy search' },
    { query: 'bank near New York NY', name: 'Bank search' },
    { query: 'hospital near Boston MA', name: 'Hospital search' }
  ];
  
  for (const search of testSearches) {
    console.log(`Testing: ${search.name}`);
    try {
      const result = await window.google_maps?.maps_search_places({
        query: search.query
      });
      
      if (result && result.results && result.results.length > 0) {
        console.log(`✅ Found ${result.results.length} places`);
        console.log(`   First result: ${result.results[0].name}`);
        console.log(`   Address: ${result.results[0].formatted_address}`);
      } else {
        console.log('⚠️  No results found');
      }
    } catch (error) {
      console.error('❌ Place search failed:', error.message);
    }
    console.log('');
  }
  console.log('\n---\n');
}

/**
 * Test Google Maps Distance Matrix
 * 
 * This function tests calculating distance and travel time between locations.
 * Useful for showing "nearest store" type features.
 */
async function testGoogleDistanceMatrix() {
  console.log('📏 Testing Google Maps Distance Matrix...\n');
  
  const origin = '742 Evergreen Terrace, Springfield, IL';
  const destinations = [
    'Pharmacy, Springfield, IL',
    'Hospital, Springfield, IL',
    'Bank, Springfield, IL'
  ];
  
  console.log(`Origin: ${origin}`);
  console.log('Calculating distances to nearby services...\n');
  
  try {
    const result = await window.google_maps?.maps_distance_matrix({
      origins: [origin],
      destinations: destinations,
      mode: 'driving'
    });
    
    if (result && result.rows && result.rows.length > 0) {
      const elements = result.rows[0].elements;
      
      destinations.forEach((dest, idx) => {
        if (elements[idx].status === 'OK') {
          console.log(`✅ ${dest}`);
          console.log(`   Distance: ${elements[idx].distance.text}`);
          console.log(`   Duration: ${elements[idx].duration.text}`);
        } else {
          console.log(`⚠️  ${dest} - No route found`);
        }
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Distance calculation failed:', error.message);
  }
  console.log('\n---\n');
}

// ==============================================================================
// COMPREHENSIVE TEST SUITE
// ==============================================================================

/**
 * Run All Tests
 * 
 * Execute all API tests in sequence to verify complete functionality.
 */
async function runAllTests() {
  console.log('='.repeat(80));
  console.log('SmartServe API Test Suite');
  console.log('='.repeat(80));
  console.log('\n');
  
  // Tamr Cloud Tests
  console.log('📦 TAMR CLOUD API TESTS');
  console.log('='.repeat(80));
  await testTamrSearch();
  // await testTamrUpdate('rec_example123'); // Uncomment with real record ID
  
  // Google Maps Tests
  console.log('\n🗺️  GOOGLE MAPS API TESTS');
  console.log('='.repeat(80));
  await testGoogleGeocoding();
  await testGoogleReverseGeocoding();
  await testGooglePlaceSearch();
  await testGoogleDistanceMatrix();
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ All tests completed!');
  console.log('='.repeat(80));
}

// ==============================================================================
// QUICK TEST FUNCTIONS FOR DEMO
// ==============================================================================

/**
 * Quick Tamr Search Test
 * Simple function to quickly test Tamr search during a demo
 */
async function quickTamrTest(customerName = 'Sarah Mitchell') {
  console.log(`🔍 Quick Tamr Search: "${customerName}"`);
  try {
    const result = await window.Tamr_Cloud?.search_contacts({
      full_name: customerName,
      address: null,
      city: null,
      state: null,
      country: null
    });
    
    console.log(`✅ Found ${result?.length || 0} customer(s)`);
    return result;
  } catch (error) {
    console.error('❌ Search failed:', error.message);
    return null;
  }
}

/**
 * Quick Geocoding Test
 * Simple function to quickly test address validation during a demo
 */
async function quickGeocodeTest(address = '742 Evergreen Terrace, Springfield, IL') {
  console.log(`📍 Quick Geocode: "${address}"`);
  try {
    const result = await window.google_maps?.maps_geocode({ address });
    
    if (result?.results?.[0]) {
      const location = result.results[0].geometry.location;
      console.log(`✅ Geocoded: (${location.lat}, ${location.lng})`);
      return result.results[0];
    }
    return null;
  } catch (error) {
    console.error('❌ Geocoding failed:', error.message);
    return null;
  }
}

// ==============================================================================
// USAGE INSTRUCTIONS
// ==============================================================================

/**
 * HOW TO USE THIS SCRIPT:
 * 
 * 1. Open your browser console while the SmartServe demo is running
 * 
 * 2. Copy and paste this entire script into the console
 * 
 * 3. Run individual tests:
 *    - testTamrSearch()           // Test customer search
 *    - testGoogleGeocoding()       // Test address validation
 *    - testGooglePlaceSearch()     // Test place search
 *    - testGoogleDistanceMatrix()  // Test distance calculations
 * 
 * 4. Or run all tests:
 *    - runAllTests()               // Run complete test suite
 * 
 * 5. Quick tests for demos:
 *    - quickTamrTest('Customer Name')    // Quick customer search
 *    - quickGeocodeTest('123 Main St')   // Quick address validation
 * 
 * TIPS:
 * - Tests use console.log for output - watch the console
 * - Failed tests show ❌ and error messages
 * - Successful tests show ✅ and results
 * - Tests handle errors gracefully and continue
 * - Update test data to match your Tamr instance
 * 
 * BEFORE YOUR DEMO:
 * - Run quickTamrTest() with your demo customer names
 * - Run quickGeocodeTest() with your demo addresses
 * - Verify all APIs are responding
 * - Check that data quality is good
 * 
 * DURING YOUR DEMO:
 * - Keep console open (but hidden from screen share)
 * - Run quick tests if APIs seem slow
 * - Use results to verify data is correct
 * 
 * TROUBLESHOOTING:
 * - If tests fail, check API credentials
 * - Verify network connectivity
 * - Ensure Tamr Cloud is accessible
 * - Check Google Maps API quota
 * - Use fallback demo data if needed
 */

// Export for use in demo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testTamrSearch,
    testTamrUpdate,
    testGoogleGeocoding,
    testGoogleReverseGeocoding,
    testGooglePlaceSearch,
    testGoogleDistanceMatrix,
    runAllTests,
    quickTamrTest,
    quickGeocodeTest
  };
}

console.log('✅ SmartServe API Test Script loaded!');
console.log('📖 Type "runAllTests()" to test all APIs');
console.log('🚀 Type "quickTamrTest()" or "quickGeocodeTest()" for quick tests');