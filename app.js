let watchID;
let audioTriggered = [];

function selectRun(runName) {
    if (runName === 'castroToDolores') {
        // Hide the menu
        document.getElementById('menu').style.display = 'none';
        
        // Show the runArea
        document.getElementById('runArea').style.display = 'block';
    }
    // Future conditions for other runs can be added here
}

document.getElementById("startRun").addEventListener("click", function() {
    if ("geolocation" in navigator) {
        watchID = navigator.geolocation.watchPosition(function(position) {
            checkProximity(position.coords.latitude, position.coords.longitude);
        }, function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
        }, {
            enableHighAccuracy: true
        });
    }
});

const checkPoints = [
    {lat: 37.762476062675866, lng: -122.43510896536054, audioElement: 'audio1'},
    {lat: 37.761367799903425, lng: -122.43501034156996, audioElement: 'audio2'},
    {lat: 37.760919477830186, lng: -122.43370005408697, audioElement: 'audio3'},
    {lat: 37.760612244195606, lng: -122.43287543330902, audioElement: 'audio4'},
    {lat: 37.75951303611205, lng: -122.43275924571032, audioElement: 'audio5'},
    {lat: 37.75971205828923, lng: -122.42895603827426, audioElement: 'audio6'},
    {lat: 37.758285210552394, lng: -122.427763178921, audioElement: 'audio7'}
];

function checkProximity(lat, lng) {
    checkPoints.forEach((point, index) => {
        const distance = getDistanceFromLatLonInKm(lat, lng, point.lat, point.lng);
        if (distance < 0.005 && !audioTriggered.includes(index)) {  // 0.005 km is 5 meters
            document.getElementById(point.audioElement).play();
            audioTriggered.push(index);
        }
    });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
