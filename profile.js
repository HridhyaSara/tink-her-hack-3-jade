document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('authToken');
    console.log("Token fetched from localStorage:", token);  // Log the token

    if (!token) {
        alert("You are not logged in. Redirecting to home...");
        window.location.href = 'home.html'; // Redirect to home if no token
        return;
    }

    try {
        // Fetch profile and donation data
        const response = await fetch('http://localhost:5000/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send the token in Authorization header
            }
        });

        const result = await response.json();
        console.log("Profile data:", result);  // Log the response data

        if (response.ok) {
            // Display profile details
            document.getElementById('profileDetails').innerHTML = `
                <p>Email: ${result.profile.email}</p>
            `;

            // Display donation details
            if (result.donations.length > 0) {
                let donationsHtml = '<ul>';
                result.donations.forEach(donation => {
                    donationsHtml += `
                        <li>
                            <strong>Food Type:</strong> ${donation.foodType}<br>
                            <strong>Quantity:</strong> ${donation.quantity} kg<br>
                            <strong>Manufactured Date:</strong> ${new Date(donation.manufacturedDate).toLocaleDateString()}<br>
                            <strong>Expiry Date:</strong> ${new Date(donation.expiryDate).toLocaleDateString()}<br>
                        </li>
                    `;
                });
                donationsHtml += '</ul>';
                document.getElementById('donationsList').innerHTML = donationsHtml;
            } else {
                document.getElementById('donationsList').innerHTML = '<p>You have no donations yet.</p>';
            }
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
});
