// Show login modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Show signup modal
function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

// Close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Login functionality
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        
        if (response.ok) {
            // Store the token in localStorage
            localStorage.setItem('authToken', result.token);
            alert("Login Successful!");
            window.location.href = 'donatefood.html'; // Redirect to donation page
        } else {
            alert(result.message); // Display error message
        }
    } catch (error) {
        console.error("Login failed", error);
    }
}

// Signup functionality
async function signupUser(email, password) {
    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Signup Successful! Please Login.");
            closeModal('signupModal');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Signup failed", error);
    }
}

// Form submission event listeners
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password);
});

document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    signupUser(email, password);
});
// Fetch and display donation amount
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = 'home.html'; // Redirect to home if not logged in
        return;
    }

    try {
        // Fetch donations data
        const response = await fetch('http://localhost:5000/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send the token in Authorization header
            }
        });

        const result = await response.json();

        if (response.ok) {
            // Calculate total donation amount
            let totalDonationAmount = 0;
            result.donations.forEach(donation => {
                totalDonationAmount += donation.quantity; // Add quantity to total
            });

            // Display total donation amount
            document.getElementById('donationAmountDisplay').innerHTML = `Total Quantity Donated: ${totalDonationAmount} kg`;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error fetching donation data:', error);
    }
});
