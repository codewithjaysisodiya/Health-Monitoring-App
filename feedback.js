// ========================================
// Feedback Form
// ========================================

const feedbackForm = document.getElementById("feedbackForm");

const feedbackSuccess =
    document.getElementById("feedbackSuccess");


// ========================================
// Submit Feedback
// ========================================

feedbackForm.addEventListener("submit", function (e) {

    e.preventDefault();


    // Get values

    let name =
        document.getElementById("feedbackName").value.trim();

    let email =
        document.getElementById("feedbackEmail").value.trim();

    let message =
        document.getElementById("feedbackMessage").value.trim();


    // Get selected rating

    let selectedRating =
        document.querySelector(
            'input[name="rating"]:checked'
        );


    // ========================================
    // Validate Rating
    // ========================================

    if (!selectedRating) {

        alert("⭐ Please select a rating.");

        return;
    }


    let rating = selectedRating.value;


    // ========================================
    // Get Existing Feedback
    // ========================================

    let feedbacks =
        JSON.parse(
            localStorage.getItem("feedbacks")
        ) || [];


    // ========================================
    // Create Feedback Object
    // ========================================

    let newFeedback = {

        id: Date.now(),

        name: name,

        email: email,

        rating: rating,

        message: message,

        date: new Date().toLocaleString()

    };


    // ========================================
    // Save Feedback
    // ========================================

    feedbacks.push(newFeedback);

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );


    // ========================================
    // Show Success
    // ========================================

    feedbackForm.style.display = "none";

    feedbackSuccess.style.display = "block";

});