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

// Initialize the camera and set up the video stream
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const capturedPhotoDiv = document.getElementById('capturedPhoto');

// Access the camera and set up the video stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

// Event listener to capture photo
captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL and display it
    const photoDataURL = canvas.toDataURL('image/png');
    capturedPhotoDiv.innerHTML = `<img src="${photoDataURL}" alt="Captured Photo" style="max-width: 100%;">`;
});

// Handle form submission for feedback
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const feedbackInput = document.getElementById('feedbackInput');
    const submissionMessage = document.getElementById('submissionMessage');
    const feedbackList = document.getElementById('feedbackList');

    if (canvas.toDataURL()) {
        const feedbackText = feedbackInput.value;

        // Create a list item for the feedback
        const feedbackItem = document.createElement('li');
        feedbackItem.innerHTML = `<img src="${canvas.toDataURL()}" alt="Submitted Photo" style="width: 100px; height: auto;"> Feedback: ${feedbackText}`;
        feedbackList.appendChild(feedbackItem);

        // Display a success message
        submissionMessage.innerText = "Your photo and feedback have been submitted successfully!";
        submissionMessage.style.color = "green";

        // Reset the form
        feedbackInput.value = "";
        capturedPhotoDiv.innerHTML = ""; // Clear the captured photo preview
    } else {
        submissionMessage.innerText = "Please capture a photo before submitting.";
        submissionMessage.style.color = "red";
    }
}

// Event listener for form submission
document.getElementById('photoForm').addEventListener('submit', handleFormSubmission);

// Call function to display announcements on page load
window.onload = displayAnnouncements;