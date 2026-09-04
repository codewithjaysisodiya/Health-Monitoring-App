// ========================================
// Load Current Logged-in User
// ========================================

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ========================================
// Check Login
// ========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ========================================
// Load Patient Information
// ========================================

function loadHealthRecords() {

    // ========================================
    // Welcome User
    // ========================================

    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser) {

        welcomeUser.innerText =
            currentUser.name || "User";

    }


    // ========================================
    // Patient Name
    // ========================================

    document.getElementById("patientName").innerText =
        currentUser.name || "Not Added";


    // ========================================
    // Blood Group
    // ========================================

    document.getElementById("bloodGroup").innerText =
        currentUser.blood || "Not Added";


    // ========================================
    // Age
    // ========================================

    document.getElementById("patientAge").innerText =
        currentUser.age || "Not Added";


    // ========================================
    // Gender
    // ========================================

    document.getElementById("patientGender").innerText =
        currentUser.gender || "Not Added";


    // ========================================
    // Current Medicine
    // ========================================

    let medicineName =
        currentUser.medicine;


    if (
        medicineName &&
        medicineName.trim() !== ""
    ) {

        document.getElementById("medicineName").innerText =
            medicineName;

    } else {

        document.getElementById("medicineName").innerText =
            "No Medication Added";

    }


    // ========================================
    // Emergency Contact
    // ========================================

    if (
        currentUser.emergency &&
        currentUser.emergency.trim() !== ""
    ) {

        document.getElementById("emergencyContact").innerText =
            currentUser.emergency;

    } else {

        document.getElementById("emergencyContact").innerText =
            "Not Added";

    }

}


// ========================================
// Logout
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            let confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                localStorage.removeItem(
                    "currentUser"
                );

                window.location.href =
                    "login.html";

            }

        }
    );

}


// ========================================
// Load Data
// ========================================

loadHealthRecords();