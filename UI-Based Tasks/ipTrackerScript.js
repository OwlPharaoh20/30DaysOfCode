// Your API key from ipgeolocation.io
const API_KEY = '1044842f53c9446385893216dd4f1c32';
const API_URL = 'https://api.ipgeolocation.io/ipgeo';

// Fetch geolocation information for an IP address
async function fetchIpGeolocation(ipAddress) {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&ip=${ipAddress}`);
        const data = await response.json();
        displayGeolocation(data);
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        displayError();
    }
}

// Display geolocation information on the page
function displayGeolocation(data) {
    const ipInfo = document.getElementById('ipInfo');
    if (data && data.ip) {
        ipInfo.innerHTML = `
            <p><strong>IP Address:</strong> ${data.ip}</p>
            <p><strong>Country:</strong> ${data.country_name}</p>
            <p><strong>State:</strong> ${data.state_prov}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>Latitude:</strong> ${data.latitude}</p>
            <p><strong>Longitude:</strong> ${data.longitude}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>
        `;
    } else {
        displayError();
    }
}

// Display an error message
function displayError() {
    const ipInfo = document.getElementById('ipInfo');
    ipInfo.innerHTML = `<p class="text-red-500">Failed to retrieve geolocation information. Please try again.</p>`;
}

// Handle form submission
document.getElementById('ipForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const ipAddress = document.getElementById('ipAddress').value.trim();
    if (ipAddress) {
        fetchIpGeolocation(ipAddress);
    }
});
