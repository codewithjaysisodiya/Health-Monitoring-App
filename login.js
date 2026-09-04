// ========================================
// LOGIN ELEMENTS
// ========================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();


    // ========================================
    // GET INPUT VALUES
    // ========================================

    const email =
        emailInput.value.trim().toLowerCase();

    const password =
        passwordInput.value;


    // ========================================
    // VALIDATION
    // ========================================

    if (email === "" || password === "") {

        loginError.innerText =
            "⚠️ Please enter Email and Password.";

        loginError.style.display = "block";

        return;
    }


    // ========================================
    // GET REGISTERED USERS
    // ========================================

    let users = [];

    try {

        users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

    }

    catch (error) {

        console.error(
            "Users data error:",
            error
        );

        users = [];

    }


    // ========================================
    // FIND USER
    // ========================================

    const user = users.find(function (u) {

        if (!u || !u.email) {
            return false;
        }

        const registeredEmail =
            String(u.email)
                .trim()
                .toLowerCase();

        const registeredPassword =
            String(u.password ?? "");

        return (
            registeredEmail === email &&
            registeredPassword === password
        );

    });


    // ========================================
    // LOGIN SUCCESS
    // ========================================

    if (user) {

        console.log(
            "Login successful:",
            user
        );


        // Save current user

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Hide error

        loginError.style.display =
            "none";


        // Go dashboard

        window.location.href =
            "dashboard.html";

        return;
    }


    // ========================================
    // LOGIN FAILED
    // ========================================

    loginError.innerText =
        "❌ Invalid Email or Password";

    loginError.style.display =
        "block";


    // Keep values

    // Put cursor in email

    emailInput.focus();

});