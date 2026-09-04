
// ===============================
// LOGGED-IN USER
// ===============================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ===============================
// CHECK LOGIN
// ===============================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ===============================
// USER-SPECIFIC STORAGE KEY
// ===============================

const predictionKey =
    "aiPrediction_" + currentUser.email;


// ===============================
// SHOW USER NAME
// ===============================

const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser) {

    welcomeUser.innerText =
        currentUser.name;

}


// ===============================
// LOGOUT
// ===============================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const confirmLogout =
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


// ===============================
// GET ELEMENTS
// ===============================

const predictBtn =
    document.getElementById("predictBtn");

const risk =
    document.getElementById("risk");

const recommendation =
    document.getElementById("recommendation");


// ===============================
// PREDICT BUTTON
// ===============================

if (predictBtn) {

    predictBtn.addEventListener(
        "click",
        predictDisease
    );

}


// ===============================
// PREDICTION FUNCTION
// ===============================

function predictDisease() {

    // ===============================
    // GET INPUT VALUES
    // ===============================

    const ph =
        parseFloat(
            document.getElementById("ph").value
        );

    const tds =
        parseFloat(
            document.getElementById("tds").value
        );

    const turbidity =
        parseFloat(
            document.getElementById("turbidity").value
        );

    const temperature =
        parseFloat(
            document.getElementById("temperature").value
        );


    // ===============================
    // INPUT VALIDATION
    // ===============================

    if (
        isNaN(ph) ||
        isNaN(tds) ||
        isNaN(turbidity) ||
        isNaN(temperature)
    ) {

        alert(
            "Please enter all values."
        );

        return;

    }


    // ===============================
    // PH VALIDATION
    // ===============================

    if (ph < 0 || ph > 14) {

        alert(
            "pH value must be between 0 and 14."
        );

        return;

    }


    // ===============================
    // NEGATIVE VALUE VALIDATION
    // ===============================

    if (
        tds < 0 ||
        turbidity < 0 ||
        temperature < 0
    ) {

        alert(
            "Values cannot be negative."
        );

        return;

    }


    // ===============================
    // AI PREDICTION LOGIC
    // ===============================

    let score = 0;


    // pH

    if (
        ph < 6.5 ||
        ph > 8.5
    ) {

        score++;

    }


    // TDS

    if (tds > 300) {

        score++;

    }


    // Turbidity

    if (turbidity > 3) {

        score++;

    }


    // Temperature

    if (temperature > 35) {

        score++;

    }


    // ===============================
    // RESULT VARIABLES
    // ===============================

    let prediction = "";
    let recommendationText = "";


    // ===============================
    // LOW RISK
    // ===============================

    if (score === 0) {

        prediction =
            "🟢 LOW RISK";

        recommendationText =
            "Water quality is safe. Continue regular monitoring.";

        risk.innerHTML =
            prediction;

        risk.style.color =
            "green";

        recommendation.innerHTML =
            recommendationText;

    }


    // ===============================
    // MEDIUM RISK
    // ===============================

    else if (score <= 2) {

        prediction =
            "🟡 MEDIUM RISK";

        recommendationText =
            "Water quality needs attention. Monitor frequently and consider treatment.";

        risk.innerHTML =
            prediction;

        risk.style.color =
            "orange";

        recommendation.innerHTML =
            recommendationText;

    }


    // ===============================
    // HIGH RISK
    // ===============================

    else {

        prediction =
            "🔴 HIGH RISK";

        recommendationText =
            "Water quality is unsafe. Immediate treatment is recommended.";

        risk.innerHTML =
            prediction;

        risk.style.color =
            "red";

        recommendation.innerHTML =
            recommendationText;

    }


    // ===============================
    // SAVE PREDICTION
    // ===============================

    const predictionData = {

        ph: ph,

        tds: tds,

        turbidity: turbidity,

        temperature: temperature,

        prediction: prediction,

        recommendation:
            recommendationText,

        score: score,

        date:
            new Date().toISOString()

    };


    localStorage.setItem(

        predictionKey,

        JSON.stringify(
            predictionData
        )

    );


    // ===============================
    // SUCCESS MESSAGE
    // ===============================

    console.log(
        "AI Prediction saved successfully."
    );

}


// ===============================
// LOAD PREVIOUS PREDICTION
// ===============================

const savedPrediction =
    JSON.parse(
        localStorage.getItem(
            predictionKey
        )
    );


if (savedPrediction) {

    // Show previous prediction

    if (risk) {

        risk.innerHTML =
            savedPrediction.prediction;


        if (
            savedPrediction.prediction
                .includes("LOW")
        ) {

            risk.style.color =
                "green";

        }

        else if (
            savedPrediction.prediction
                .includes("MEDIUM")
        ) {

            risk.style.color =
                "orange";

        }

        else {

            risk.style.color =
                "red";

        }

    }


    if (recommendation) {

        recommendation.innerHTML =
            savedPrediction.recommendation;

    }


    // Load previous input values

    const phInput =
        document.getElementById("ph");

    const tdsInput =
        document.getElementById("tds");

    const turbidityInput =
        document.getElementById("turbidity");

    const temperatureInput =
        document.getElementById("temperature");


    if (phInput) {

        phInput.value =
            savedPrediction.ph;

    }


    if (tdsInput) {

        tdsInput.value =
            savedPrediction.tds;

    }


    if (turbidityInput) {

        turbidityInput.value =
            savedPrediction.turbidity;

    }


    if (temperatureInput) {

        temperatureInput.value =
            savedPrediction.temperature;

    }

}

