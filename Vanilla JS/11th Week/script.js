// Step 1: Define JSON Data
// This simulates the locations that we might get from a server.
const locations = [
    { "name": "Eiffel Tower", "lat": 48.8584, "lng": 2.2945 },
    { "name": "Statue of Liberty", "lat": 40.6892, "lng": -74.0445 },
    { "name": "Great Wall of China", "lat": 40.4319, "lng": 116.5704 },
    { "name": "Red Deer Hospital", "lat": 52.260274, "lng": -113.817420},
    { "name": "Chesapeake", "lat": 14.410015, "lng": 120.953738}
   ];
   // Step 2: Initialize the Map
   function initMap() {
    // Center map at an initial location (Eiffel Tower)
    const mapCenter = { lat: 48.8584, lng: 2.2945 };
   // Create a new Google Map object
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3, // Zoom level
    center: mapCenter // Initial center of the map
    });
   // Step 3: Fetch Locations via AJAX
    fetchLocations(map);
   }
   
   // Step 4: Fetch Location Data (Simulating AJAX)
    function fetchLocations(map) {
        // Simulate an AJAX call (in real scenarios, you'd use fetch() or XMLHttpRequest to get data from a server)
        setTimeout(() => {
   
   // Parse the locations data (pretend it's coming from a server)
   
   const data = locations;
   // Step 5: Add Markers to the Map
    data.forEach(location => {
    addMarker(map, location);
    });
    }, 1000); // Simulate a 1-second delay
   }
   // Step 6: Add Marker Function
   function addMarker(map, location) {
   
   // Create a new marker for each location
    const marker = new google.maps.Marker({
    position: { lat: location.lat, lng: location.lng }, // Location coordinates
    map: map, // The map object
    title: location.name // Tooltip text
    });
    // Step 7: Add Info Window to Marker
    const infoWindow = new google.maps.InfoWindow({
    content: `<h2>${location.name}</h2>` // Info window content
    });
    // Open info window when the marker is clicked
    marker.addListener("click", () => {
    infoWindow.open(map, marker);
    });
   }
   // Initialize the map when the window loads
   window.onload = initMap;
   