// Project: Achievement Unlocked UI Interactions
// Focus: Button click handler and interactivity for achievements

// DOM Elements
const certificateButton = document.querySelector('button'); // Select the certificate download button
const achievementCards = document.querySelectorAll('.achievement-card'); // Select all achievement cards

// Function to handle certificate download (simulated)
certificateButton.addEventListener('click', () => {
    alert('🎉 Congratulations! Your certificate is being generated!');
    // You could trigger a real download here or redirect to a certificate generation service
});

// Add interactivity to each achievement card
achievementCards.forEach((card) => {
    card.addEventListener('click', () => {
        const achievementName = card.querySelector('h3').textContent;
        alert(`You've unlocked the achievement: ${achievementName}!`);
        // You could add further actions here, like showing more details in a modal
    });
});

/*
Project Steps:
1. Grab the button element for the "Download Your Certificate" action.
2. Add an event listener to the button to simulate a download with an alert.
3. Select all achievement cards and add click handlers to display an achievement-specific message.
*/
