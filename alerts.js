
// ========================================
// CURRENT LOGGED-IN USER
// ========================================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ========================================
// CHECK LOGIN
// ========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ========================================
// USER-SPECIFIC ALERT KEY
// ========================================

const alertKey =
    "healthAlerts_" + currentUser.email;


// ========================================
// FIRST-TIME INITIALIZATION KEY
// ========================================

const alertsInitializedKey =
    "alertsInitialized_" + currentUser.email;


// ========================================
// ALERT CONTAINER
// ========================================

const alertContainer =
    document.getElementById("alertContainer");


// ========================================
// LOAD SAVED ALERTS
// ========================================

let alerts =
    JSON.parse(
        localStorage.getItem(alertKey)
    ) || [];


// ========================================
// FIRST TIME DEMO ALERTS
// ========================================

const alertsInitialized =
    localStorage.getItem(
        alertsInitializedKey
    );


if (!alertsInitialized) {

    alerts = [

        {
            id: Date.now(),

            title:
                "Water Quality Warning",

            message:
                "TDS level is higher than recommended.",

            level:
                "medium",

            time:
                "Today 09:30 AM"
        },


        {
            id: Date.now() + 1,

            title:
                "Disease Risk",

            message:
                "AI Prediction detected Medium Risk.",

            level:
                "medium",

            time:
                "Today 10:15 AM"
        },


        {
            id: Date.now() + 2,

            title:
                "Critical Alert",

            message:
                "Water quality is unsafe. Immediate treatment required.",

            level:
                "high",

            time:
                "Yesterday 07:20 PM"
        },


        {
            id: Date.now() + 3,

            title:
                "System Status",

            message:
                "All sensors are working normally.",

            level:
                "low",

            time:
                "Yesterday 05:00 PM"
        }

    ];


    // Save demo alerts

    localStorage.setItem(
        alertKey,
        JSON.stringify(alerts)
    );


    // Mark initialization complete

    localStorage.setItem(
        alertsInitializedKey,
        "true"
    );

}


// ========================================
// SAVE ALERTS
// ========================================

function saveAlerts() {

    localStorage.setItem(
        alertKey,
        JSON.stringify(alerts)
    );

}


// ========================================
// LOAD ALERTS ON SCREEN
// ========================================

function loadAlerts() {

    alertContainer.innerHTML = "";


    // ====================================
    // NO ALERTS
    // ====================================

    if (alerts.length === 0) {

        alertContainer.innerHTML = `

            <h2 class="no-alerts">
                ✅ No Alerts Available
            </h2>

        `;

        return;

    }


    // ====================================
    // DISPLAY ALERTS
    // ====================================

    alerts.forEach(alert => {

        alertContainer.innerHTML += `

            <div class="alert-card ${alert.level}">

                <h3>
                    ${alert.title}
                </h3>

                <p>
                    ${alert.message}
                </p>

                <p>
                    <strong>
                        Priority:
                    </strong>

                    ${alert.level.toUpperCase()}
                </p>

                <p>
                    <strong>
                        Time:
                    </strong>

                    ${alert.time}
                </p>

            </div>

        `;

    });

}


// ========================================
// INITIAL LOAD
// ========================================

loadAlerts();


// ========================================
// CLEAR ALERTS BUTTON
// ========================================

const clearBtn =
    document.getElementById("clearBtn");


if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        function () {


            // No alerts

            if (alerts.length === 0) {

                alert(
                    "No alerts available."
                );

                return;

            }


            // Confirmation

            const confirmClear =
                confirm(
                    "Are you sure you want to clear all alerts?"
                );


            if (!confirmClear) {

                return;

            }


            // ====================================
            // DELETE ALERTS
            // ====================================

            alerts = [];


            // Save empty array

            saveAlerts();


            // Reload screen

            loadAlerts();


            alert(
                "✅ All alerts cleared successfully."
            );

        }
    );

}
