// ========================================
// CURRENT LOGGED-IN USER
// ========================================

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ========================================
// CHECK LOGIN
// ========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ========================================
// USER-SPECIFIC PROFILE KEY
// ========================================

const profileKey =
    "profile_" + currentUser.email;


// ========================================
// LOAD SAVED PROFILE
// ========================================

let profile =
    JSON.parse(
        localStorage.getItem(profileKey)
    ) || {

        mobile: currentUser.mobile || "",

        age: 20,

        gender: "Male",

        blood: "B+",

        address: "Delhi",

        condition: "None",

        medicine: "Vitamin D",

        emergency: ""

    };


// ========================================
// GET HTML ELEMENTS
// ========================================

const profileImage =
    document.getElementById("profileImage");

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const userMobile =
    document.getElementById("userMobile");

const userAge =
    document.getElementById("userAge");

const userGender =
    document.getElementById("userGender");

const userBlood =
    document.getElementById("userBlood");

const userAddress =
    document.getElementById("userAddress");

const condition =
    document.getElementById("condition");

const medicine =
    document.getElementById("medicine");

const emergency =
    document.getElementById("emergency");


// ========================================
// EDIT ELEMENTS
// ========================================

const editBtn =
    document.getElementById("editBtn");

const editCard =
    document.getElementById("editCard");

const saveBtn =
    document.getElementById("saveBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const editProfileImage =
    document.getElementById("editProfileImage");

const editProfilePreview =
    document.getElementById("editProfilePreview");


// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");


// ========================================
// GET PROFILE IMAGE
// ========================================

function getProfileImage() {

    return (
        currentUser.profileImage ||
        "images/profile.jpg"
    );

}


// ========================================
// LOAD PROFILE IMAGE
// ========================================

function loadProfileImage() {

    if (!profileImage) {
        return;
    }

    profileImage.src =
        getProfileImage();


    // If image does not exist

    profileImage.onerror =
        function () {

            this.src =
                "images/profile.jpg";

        };

}


// ========================================
// LOAD PROFILE DATA
// ========================================

function loadProfile() {

    // Name

    if (userName) {

        userName.innerText =
            currentUser.name ||
            "Patient";

    }


    // Email

    if (userEmail) {

        userEmail.innerText =
            currentUser.email ||
            "-";

    }


    // Mobile

    if (userMobile) {

        userMobile.innerText =
            profile.mobile ||
            "-";

    }


    // Age

    if (userAge) {

        userAge.innerText =
            profile.age ||
            "-";

    }


    // Gender

    if (userGender) {

        userGender.innerText =
            profile.gender ||
            "-";

    }


    // Blood

    if (userBlood) {

        userBlood.innerText =
            profile.blood ||
            "-";

    }


    // Address

    if (userAddress) {

        userAddress.innerText =
            profile.address ||
            "-";

    }


    // Medical Condition

    if (condition) {

        condition.innerText =
            profile.condition ||
            "None";

    }


    // Medicine

    if (medicine) {

        medicine.innerText =
            profile.medicine ||
            "None";

    }


    // Emergency Contact

    if (emergency) {

        emergency.innerText =
            profile.emergency ||
            "-";

    }


    // Profile Photo

    loadProfileImage();

}


// ========================================
// LOAD PROFILE
// ========================================

loadProfile();


// ========================================
// EDIT PROFILE BUTTON
// ========================================

if (editBtn) {

    editBtn.addEventListener(
        "click",
        function () {

            // Show edit card

            editCard.style.display =
                "block";


            // Load current values

            document.getElementById(
                "editMobile"
            ).value =
                profile.mobile || "";


            document.getElementById(
                "editAge"
            ).value =
                profile.age || "";


            document.getElementById(
                "editGender"
            ).value =
                profile.gender || "Male";


            document.getElementById(
                "editBlood"
            ).value =
                profile.blood || "B+";


            document.getElementById(
                "editAddress"
            ).value =
                profile.address || "";


            document.getElementById(
                "editCondition"
            ).value =
                profile.condition || "";


            document.getElementById(
                "editMedicine"
            ).value =
                profile.medicine || "";


            document.getElementById(
                "editEmergency"
            ).value =
                profile.emergency || "";


            // Show current photo in preview

            if (editProfilePreview) {

                editProfilePreview.src =
                    getProfileImage();

            }


            // Scroll to edit section

            window.scrollTo({

                top:
                    document.body.scrollHeight,

                behavior:
                    "smooth"

            });

        }
    );

}


// ========================================
// PROFILE PHOTO PREVIEW
// ========================================

if (editProfileImage) {

    editProfileImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            // Check image

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }


            // File size check - 2 MB

            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "Image size should be less than 2 MB."
                );

                this.value = "";

                return;

            }


            // Preview

            const reader =
                new FileReader();


            reader.onload =
                function (e) {

                    if (editProfilePreview) {

                        editProfilePreview.src =
                            e.target.result;

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


// ========================================
// SAVE PROFILE
// ========================================

if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        function () {

            // ============================
            // SAVE PROFILE INFORMATION
            // ============================

            profile.mobile =
                document
                    .getElementById("editMobile")
                    .value
                    .trim();


            profile.age =
                document
                    .getElementById("editAge")
                    .value;


            profile.gender =
                document
                    .getElementById("editGender")
                    .value;


            profile.blood =
                document
                    .getElementById("editBlood")
                    .value;


            profile.address =
                document
                    .getElementById("editAddress")
                    .value
                    .trim();


            profile.condition =
                document
                    .getElementById("editCondition")
                    .value
                    .trim();


            profile.medicine =
                document
                    .getElementById("editMedicine")
                    .value
                    .trim();


            profile.emergency =
                document
                    .getElementById("editEmergency")
                    .value
                    .trim();


            // ============================
            // SAVE PROFILE DATA
            // ============================

            localStorage.setItem(

                profileKey,

                JSON.stringify(profile)

            );


            // ============================
            // CHECK NEW PHOTO
            // ============================

            if (
                editProfileImage &&
                editProfileImage.files.length > 0
            ) {

                const file =
                    editProfileImage.files[0];


                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        const imageData =
                            e.target.result;


                        // =====================
                        // UPDATE CURRENT USER
                        // =====================

                        currentUser.profileImage =
                            imageData;


                        localStorage.setItem(

                            "currentUser",

                            JSON.stringify(
                                currentUser
                            )

                        );


                        // =====================
                        // UPDATE USERS LIST
                        // =====================

                        let users =
                            JSON.parse(
                                localStorage.getItem(
                                    "users"
                                )
                            ) || [];


                        const userIndex =
                            users.findIndex(

                                user =>
                                    user.email ===
                                    currentUser.email

                            );


                        if (userIndex !== -1) {

                            users[userIndex].profileImage =
                                imageData;


                            localStorage.setItem(

                                "users",

                                JSON.stringify(
                                    users
                                )

                            );

                        }


                        // =====================
                        // UPDATE MAIN PHOTO
                        // =====================

                        if (profileImage) {

                            profileImage.src =
                                imageData;

                        }


                        // =====================
                        // CLOSE EDIT CARD
                        // =====================

                        editCard.style.display =
                            "none";


                        editProfileImage.value =
                            "";


                        loadProfile();


                        alert(
                            "✅ Profile Updated Successfully"
                        );

                    };


                reader.readAsDataURL(file);

            }


            // ============================
            // NO NEW PHOTO
            // ============================

            else {

                editCard.style.display =
                    "none";


                loadProfile();


                alert(
                    "✅ Profile Updated Successfully"
                );

            }

        }
    );

}


// ========================================
// CANCEL EDIT
// ========================================

if (cancelBtn) {

    cancelBtn.addEventListener(
        "click",
        function () {

            editCard.style.display =
                "none";


            // Clear selected image

            if (editProfileImage) {

                editProfileImage.value =
                    "";

            }


            // Restore original preview

            if (editProfilePreview) {

                editProfilePreview.src =
                    getProfileImage();

            }

        }
    );

}


// ========================================
// LOGOUT
// ========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            localStorage.removeItem(
                "currentUser"
            );


            window.location.href =
                "login.html";

        }
    );

}