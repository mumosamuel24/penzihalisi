const counties = [
    "mombasa","kwale","kilifi","tana river","lamu","taita-taveta","garissa","wajir","mandera","marsabit","isiolo","meru","tharaka-nithi","embu","kitui","machakos","makueni","nyandarua","nyeri","kirinyaga","murang'a","kiambu","turkana","west pokot","samburu","trans-nzoia","uasin gishu","elgeyo-marakwet","nandi","baringo","laikipia","nakuru","narok","kajiado","kericho","bomet","kakamega","vihiga","bungoma","busia","siaya","kisumu","homa bay","migori","kisii","nyamira","nairobi"
];

function populateCounties(selectId) {
    const select = document.querySelector(selectId);
    if (!select) return;
    counties.forEach(county => {
        const option = document.createElement('option');
        option.value = county;
        option.textContent = county.charAt(0).toUpperCase() + county.slice(1);
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateCounties('#registrationForm select[name="county"]');
    populateCounties('#profileForm select[name="county"]');
    populateCounties('#matchForm select[name="county"]');
});

// Registration
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(registrationForm));
    const message = `start#${data.name}#${data.age}#${data.gender}#${data.county}#${data.town}`;
    const number = data.number;
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, number })
    });
    const result = await res.json();
    document.getElementById('registrationResult').textContent = result.response;
    // Store registered number
    localStorage.setItem('userNumber', number);
    registrationForm.reset();
    // Optionally reload after registration
    location.reload();
});

// Profile Update
const profileForm = document.getElementById('profileForm');
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(profileForm));
    const message = `details#${data.education}#${data.profession}#${data.marital}#${data.religion}#${data.ethnicity}`;
    const number = data.number;
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, number })
    });
    const result = await res.json();
    document.getElementById('profileResult').textContent = result.response;
    profileForm.reset();
    // Reload if number matches registered user
    if (number === localStorage.getItem('userNumber')) {
        location.reload();
    }
});

// Description
const descriptionForm = document.getElementById('descriptionForm');
descriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(descriptionForm));
    const message = `myself ${data.description}`;
    const number = data.number;
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, number })
    });
    const result = await res.json();
    document.getElementById('descriptionResult').textContent = result.response;
    descriptionForm.reset();
    if (number === localStorage.getItem('userNumber')) {
        location.reload();
    }
});

// Match Search
const matchForm = document.getElementById('matchForm');
matchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(matchForm));
    const message = `match#${data.minAge}-${data.maxAge}#${data.county}`;
    const number = data.number;
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, number })
    });
    const result = await res.json();
    document.getElementById('matchResult').textContent = result.response;
    matchForm.reset();
    if (number === localStorage.getItem('userNumber')) {
        location.reload();
    }
});

// Messaging
const messageForm = document.getElementById('messageForm');
const conversationDiv = document.getElementById('conversation');
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(messageForm));
    const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: data.message, number: data.number })
    });
    const result = await res.json();
    const msg = document.createElement('div');
    msg.textContent = `You: ${data.message}`;
    conversationDiv.appendChild(msg);
    const reply = document.createElement('div');
    reply.textContent = `System: ${result.response}`;
    conversationDiv.appendChild(reply);
    messageForm.reset();
    if (data.number === localStorage.getItem('userNumber')) {
        // Optionally reload to update conversation
        location.reload();
    }
});