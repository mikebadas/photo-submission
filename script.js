// Sample announcements
const announcements = [
    "Welcome to the Photo Submission Platform!",
    "Please submit your photos by the end of the month.",
    "New features will be coming soon!"
];

// Function to display announcements
function displayAnnouncements() {
    const announcementDiv = document.getElementById('announcement');
    announcementDiv.innerText = announcements.join(' | ');
}

// Function to handle photo submissions
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const photoInput = document.getElementById('photoInput');
    const feedbackInput = document.getElementById('feedbackInput');
    const submissionMessage = document.getElementById('submissionMessage');
    const feedbackList = document.getElementById('feedbackList');

    const photoFile = photoInput.files[0];
    const feedbackText = feedbackInput.value;

    if (photoFile) {
        // Create a list item for the feedback
        const feedbackItem = document.createElement('li');
        feedbackItem.innerText = `Photo submitted: ${photoFile.name} | Feedback: ${feedbackText}`;
        feedbackList.appendChild(feedbackItem);

        // Display a success message
        submissionMessage.innerText = "Your photo has been submitted successfully!";
        submissionMessage.style.color = "green";

        // Reset the form
        photoInput.value = "";
        feedbackInput.value = "";
    } else {
        submissionMessage.innerText = "Please select a photo.";
        submissionMessage.style.color = "red";
    }
}

// Event listener for form submission
document.getElementById('photoForm').addEventListener('submit', handleFormSubmission);

// Call function to display announcements on page load
window.onload = displayAnnouncements;
