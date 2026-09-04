// ========================================
// LOGGED-IN USER
// ========================================

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ========================================
// CHECK LOGIN
// ========================================

if (!currentUser) {

    window.location.href =
        "login.html";

}


// ========================================
// SHOW USER NAME
// ========================================

else {

    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser) {

        welcomeUser.innerText =
            currentUser.name;

    }

}


// ========================================
// LOGOUT
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
// WATER QUALITY CHART
// ========================================

const waterChart =
    document.getElementById("waterChart");


if (waterChart) {

    new Chart(

        waterChart,

        {

            type: "line",

            data: {

                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],

                datasets: [

                    {

                        label:
                            "Water Quality (%)",

                        data: [
                            80,
                            82,
                            85,
                            90,
                            88,
                            92,
                            95
                        ],

                        borderColor:
                            "#0d6efd",

                        backgroundColor:
                            "rgba(13,110,253,.2)",

                        fill: true,

                        tension: 0.4

                    }

                ]

            },

            options: {

                responsive: true

            }

        }

    );

}


// ========================================
// HEALTH MONITORING
// STEP + HEART RATE
// ========================================


// User-specific storage

let healthKey =
    "healthData_" +
    currentUser.email;


// ========================================
// LOAD SAVED HEALTH DATA
// ========================================

let healthData =
    JSON.parse(
        localStorage.getItem(healthKey)
    ) || {

        steps: 0,

        heartRate: 0

    };


// ========================================
// STEP ELEMENTS
// ========================================

const stepCount =
    document.getElementById("stepCount");

const stepProgress =
    document.getElementById("stepProgress");

const stepPercentage =
    document.getElementById("stepPercentage");

const stepBtn =
    document.getElementById("stepBtn");


// ========================================
// HEART ELEMENTS
// ========================================

const heartRate =
    document.getElementById("heartRate");

const heartStatus =
    document.getElementById("heartStatus");

const heartBtn =
    document.getElementById("heartBtn");


// ========================================
// UPDATE STEP UI
// ========================================

function updateSteps() {

    if (!stepCount) {
        return;
    }


    stepCount.innerText =
        healthData.steps;


    stepProgress.value =
        healthData.steps;


    let percentage =
        Math.min(
            (healthData.steps / 10000) * 100,
            100
        );


    stepPercentage.innerText =
        Math.floor(percentage) +
        "% completed";

}


// ========================================
// ADD STEPS
// ========================================

if (stepBtn) {

    stepBtn.addEventListener(
        "click",
        function () {


            // Demo steps

            const newSteps =
                Math.floor(
                    Math.random() * 501
                ) + 100;


            healthData.steps +=
                newSteps;


            // Save

            localStorage.setItem(

                healthKey,

                JSON.stringify(
                    healthData
                )

            );


            updateSteps();

        }
    );

}


// ========================================
// HEART RATE STATUS
// ========================================

function updateHeartStatus(bpm) {

    if (!heartStatus) {
        return;
    }


    if (bpm < 60) {

        heartStatus.innerText =
            "🔵 Low Heart Rate";

        heartStatus.style.color =
            "blue";

    }

    else if (bpm <= 100) {

        heartStatus.innerText =
            "🟢 Normal Heart Rate";

        heartStatus.style.color =
            "green";

    }

    else {

        heartStatus.innerText =
            "🔴 High Heart Rate";

        heartStatus.style.color =
            "red";

    }

}


// ========================================
// MEASURE HEART RATE
// ========================================

function measureHeartRate() {

    if (!heartRate) {
        return;
    }


    // Demo BPM

    const bpm =
        Math.floor(
            Math.random() * 31
        ) + 60;


    healthData.heartRate =
        bpm;


    heartRate.innerText =
        bpm;


    updateHeartStatus(
        bpm
    );


    // Save

    localStorage.setItem(

        healthKey,

        JSON.stringify(
            healthData
        )

    );

}


// ========================================
// HEART BUTTON
// ========================================

if (heartBtn) {

    heartBtn.addEventListener(
        "click",
        measureHeartRate
    );

}


// ========================================
// LOAD SAVED STEPS
// ========================================

updateSteps();


// ========================================
// LOAD SAVED HEART RATE
// ========================================

if (
    healthData.heartRate > 0 &&
    heartRate
) {

    heartRate.innerText =
        healthData.heartRate;


    updateHeartStatus(
        healthData.heartRate
    );

}