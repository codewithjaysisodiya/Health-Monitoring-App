
// ===============================
// CURRENT LOGGED-IN USER
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

const waterKey =
    "waterQuality_" + currentUser.email;


// ===============================
// ALERT STORAGE KEY
// ===============================

const alertsKey =
    "healthAlerts_" + currentUser.email;


// ===============================
// PROGRESS BARS
// ===============================

const phBar =
    document.getElementById("phBar");

const tdsBar =
    document.getElementById("tdsBar");

const turbidityBar =
    document.getElementById("turbidityBar");

const tempBar =
    document.getElementById("tempBar");


// ===============================
// VALUE TEXT
// ===============================

const phValue =
    document.getElementById("phValue");

const tdsValue =
    document.getElementById("tdsValue");

const turbidityValue =
    document.getElementById("turbidityValue");

const tempValue =
    document.getElementById("tempValue");


// ===============================
// STATUS
// ===============================

const statusText =
    document.getElementById("statusText");


// ===============================
// REFRESH BUTTON
// ===============================

const refreshBtn =
    document.getElementById("refreshBtn");


// ===============================
// CREATE WATER QUALITY ALERT
// ===============================

function createWaterAlert(status, ph, tds, turbidity) {

    // Safe water = no alert

    if (status.includes("Safe")) {

        return;

    }


    // Load existing alerts

    let alerts =
        JSON.parse(
            localStorage.getItem(alertsKey)
        ) || [];


    // ===============================
    // Avoid Duplicate Alert
    // ===============================

    let lastAlertStatus =
        localStorage.getItem(
            "lastWaterAlert_" + currentUser.email
        );


    // Same status already alerted

    if (lastAlertStatus === status) {

        return;

    }


    // ===============================
    // Alert Details
    // ===============================

    let title = "";

    let message = "";

    let level = "";


    if (status.includes("Warning")) {

        title =
            "Water Quality Warning";

        message =
            "Water quality requires attention. " +
            "Please monitor the water parameters.";

        level =
            "medium";

    }


    else {

        title =
            "Critical Water Quality Alert";

        message =
            "Water quality is unsafe. " +
            "Immediate treatment is recommended.";

        level =
            "high";

    }


    // ===============================
    // Create Alert
    // ===============================

    const newAlert = {

        id:
            Date.now(),

        title:
            title,

        message:
            message,

        level:
            level,

        time:
            new Date().toLocaleString(),

        details: {

            ph:
                ph,

            tds:
                tds,

            turbidity:
                turbidity

        }

    };


    // Add alert

    alerts.unshift(newAlert);


    // Save alerts

    localStorage.setItem(

        alertsKey,

        JSON.stringify(alerts)

    );


    // Remember last alerted status

    localStorage.setItem(

        "lastWaterAlert_" +
        currentUser.email,

        status

    );

}


// ===============================
// GENERATE WATER DATA
// ===============================

function generateData() {

    // ===============================
    // Random Values
    // ===============================

    let ph =
        Number(
            (Math.random() * 6 + 4).toFixed(1)
        );


    let tds =
        Math.floor(
            Math.random() * 700 + 100
        );


    let turbidity =
        Math.floor(
            Math.random() * 10
        );


    let temp =
        Math.floor(
            Math.random() * 20 + 20
        );


    // ===============================
    // WATER STATUS
    // ===============================

    let status = "";

    let statusColor = "";


    if (
        ph >= 6.5 &&
        ph <= 8.5 &&
        tds <= 300 &&
        turbidity <= 3
    ) {

        status =
            "🟢 Safe Water";

        statusColor =
            "green";

    }


    else if (
        ph >= 6 &&
        ph <= 9 &&
        tds <= 500 &&
        turbidity <= 5
    ) {

        status =
            "🟡 Warning";

        statusColor =
            "orange";

    }


    else {

        status =
            "🔴 Dangerous Water";

        statusColor =
            "red";

    }


    // ===============================
    // UPDATE UI
    // ===============================

    phBar.value =
        ph;

    tdsBar.value =
        tds;

    turbidityBar.value =
        turbidity;

    tempBar.value =
        temp;


    phValue.innerHTML =
        ph;

    tdsValue.innerHTML =
        tds + " ppm";

    turbidityValue.innerHTML =
        turbidity + " NTU";

    tempValue.innerHTML =
        temp + " °C";


    statusText.innerHTML =
        status;

    statusText.style.color =
        statusColor;


    // ===============================
    // SAVE WATER DATA
    // ===============================

    const waterData = {

        ph:
            ph,

        tds:
            tds,

        turbidity:
            turbidity,

        temperature:
            temp,

        status:
            status,

        date:
            new Date().toISOString()

    };


    localStorage.setItem(

        waterKey,

        JSON.stringify(waterData)

    );


    // ===============================
    // CREATE ALERT
    // ===============================

    createWaterAlert(

        status,

        ph,

        tds,

        turbidity

    );

}


// ===============================
// REFRESH BUTTON
// ===============================

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        function () {

            generateData();

        }
    );

}


// ===============================
// THEME TOGGLE
// ===============================

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                themeToggle.innerHTML =
                    "☀️ Light Mode";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

            else {

                themeToggle.innerHTML =
                    "🌙 Dark Mode";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


// ===============================
// LOAD SAVED THEME
// ===============================

const savedTheme =
    localStorage.getItem("theme");


if (
    savedTheme === "dark" &&
    themeToggle
) {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.innerHTML =
        "☀️ Light Mode";

}


// ===============================
// LOAD SAVED WATER DATA
// ===============================

const savedWaterData =
    JSON.parse(
        localStorage.getItem(waterKey)
    );


if (savedWaterData) {

    phBar.value =
        savedWaterData.ph;

    tdsBar.value =
        savedWaterData.tds;

    turbidityBar.value =
        savedWaterData.turbidity;

    tempBar.value =
        savedWaterData.temperature;


    phValue.innerHTML =
        savedWaterData.ph;

    tdsValue.innerHTML =
        savedWaterData.tds +
        " ppm";

    turbidityValue.innerHTML =
        savedWaterData.turbidity +
        " NTU";

    tempValue.innerHTML =
        savedWaterData.temperature +
        " °C";


    statusText.innerHTML =
        savedWaterData.status;


    if (
        savedWaterData.status.includes(
            "Safe"
        )
    ) {

        statusText.style.color =
            "green";

    }

    else if (
        savedWaterData.status.includes(
            "Warning"
        )
    ) {

        statusText.style.color =
            "orange";

    }

    else {

        statusText.style.color =
            "red";

    }

}


// ===============================
// FIRST TIME LOAD
// ===============================

else {

    generateData();

}

