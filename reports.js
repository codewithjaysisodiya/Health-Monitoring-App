
// ========================================
// CHECK CURRENT LOGGED-IN USER
// ========================================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ========================================
// LOGIN CHECK
// ========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

} else {

    // ========================================
    // CURRENT USER EMAIL
    // ========================================

    const userEmail = currentUser.email;


    // ========================================
    // USER-SPECIFIC REPORTS KEY
    // ========================================

    const reportsKey =
        "healthReports_" + userEmail;


    // ========================================
    // REPORT CONTAINER
    // ========================================

    const container =
        document.getElementById("reportContainer");


    // ========================================
    // LOAD REPORTS
    // ========================================

    let reports =
        JSON.parse(
            localStorage.getItem(reportsKey)
        );


    // ========================================
    // FIRST TIME USER
    // CREATE DEMO REPORTS
    // ========================================

    if (!reports) {

        reports = [

            {
                id: Date.now(),
                title: "Weekly Water Quality Report",
                date: "2026-08-01",
                status: "Safe",
                details:
                    "Water quality remained safe throughout the week."
            },

            {
                id: Date.now() + 1,
                title: "Disease Prediction Report",
                date: "2026-08-03",
                status: "Medium Risk",
                details:
                    "AI detected medium disease risk due to increased TDS."
            },

            {
                id: Date.now() + 2,
                title: "Monthly Health Report",
                date: "2026-08-05",
                status: "Healthy",
                details:
                    "Overall health indicators are within normal limits."
            }

        ];


        saveReports();

    }


    // ========================================
    // SAVE REPORTS
    // ========================================

    function saveReports() {

        localStorage.setItem(
            reportsKey,
            JSON.stringify(reports)
        );

    }


    // ========================================
    // DISPLAY REPORTS
    // ========================================

    function loadReports(list) {

        container.innerHTML = "";


        if (list.length === 0) {

            container.innerHTML =
                "<h2 style='text-align:center;'>" +
                "No Reports Found" +
                "</h2>";

            return;
        }


        list.forEach(function(report) {

            container.innerHTML +=

                '<div class="report-card">' +

                    '<h3>' +
                    report.title +
                    '</h3>' +

                    '<p>' +
                    '<b>📅 Date:</b> ' +
                    report.date +
                    '</p>' +

                    '<p>' +
                    '<b>🩺 Status:</b> ' +
                    report.status +
                    '</p>' +

                    '<p>' +
                    report.details +
                    '</p>' +

                    '<div class="report-buttons">' +

                        '<button ' +
                        'class="viewBtn" ' +
                        'onclick="viewReport(' +
                        report.id +
                        ')">' +

                        '👁 View' +

                        '</button>' +


                        '<button ' +
                        'class="downloadBtn" ' +
                        'onclick="downloadReport(' +
                        report.id +
                        ')">' +

                        '📥 Download' +

                        '</button>' +


                        '<button ' +
                        'class="deleteBtn" ' +
                        'onclick="deleteReport(' +
                        report.id +
                        ')">' +

                        '🗑️ Delete' +

                        '</button>' +

                    '</div>' +

                '</div>';

        });

    }


    // ========================================
    // INITIAL LOAD
    // ========================================

    loadReports(reports);


    // ========================================
    // SEARCH BOX
    // ========================================

    const searchBox =
        document.getElementById("searchBox");


    searchBox.addEventListener(
        "input",
        function() {

            applyFilters();

        }
    );


    // ========================================
    // DATE FILTER
    // ========================================

    const dateFilter =
        document.getElementById("dateFilter");


    dateFilter.addEventListener(
        "change",
        function() {

            applyFilters();

        }
    );


    // ========================================
    // SEARCH + DATE FILTER
    // ========================================

    function applyFilters() {

        const searchText =
            searchBox.value
                .toLowerCase()
                .trim();


        const selectedDate =
            dateFilter.value;


        const filteredReports =
            reports.filter(function(report) {

                const title =
                    report.title
                        .toLowerCase();


                const searchMatch =
                    title.includes(searchText);


                const dateMatch =
                    selectedDate === "" ||
                    report.date === selectedDate;


                return searchMatch && dateMatch;

            });


        loadReports(filteredReports);

    }


    // ========================================
    // VIEW REPORT
    // ========================================

    window.viewReport = function(id) {

        const report =
            reports.find(function(item) {

                return item.id === id;

            });


        if (!report) {
            return;
        }


        alert(

            "📄 " +
            report.title +

            "\n\n" +

            "📅 Date: " +
            report.date +

            "\n\n" +

            "🩺 Status: " +
            report.status +

            "\n\n" +

            "📋 Details:\n" +
            report.details

        );

    };


    // ========================================
    // DOWNLOAD SINGLE REPORT
    // ========================================

    window.downloadReport = function(id) {

        const report =
            reports.find(function(item) {

                return item.id === id;

            });


        if (!report) {
            return;
        }


        const content =

            "================================\n" +
            "          HEALTH REPORT\n" +
            "================================\n\n" +

            "Report Title : " +
            report.title +

            "\n\nDate : " +
            report.date +

            "\n\nStatus : " +
            report.status +

            "\n\nDetails :\n" +
            report.details +

            "\n\n================================\n";


        const blob =
            new Blob(
                [content],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;


        link.download =
            report.title.replace(/\s+/g, "_") +
            ".txt";


        link.click();


        URL.revokeObjectURL(url);

    };


    // ========================================
    // DELETE REPORT
    // ========================================

    window.deleteReport = function(id) {

        const report =
            reports.find(function(item) {

                return item.id === id;

            });


        if (!report) {
            return;
        }


        const confirmDelete =
            confirm(
                "Are you sure you want to delete this report?"
            );


        if (!confirmDelete) {
            return;
        }


        reports =
            reports.filter(function(item) {

                return item.id !== id;

            });


        // Save updated reports

        saveReports();


        // Refresh display

        applyFilters();

    };


    // ========================================
    // DOWNLOAD ALL REPORTS
    // ========================================

    document
        .getElementById("downloadBtn")
        .addEventListener(
            "click",
            function() {


                if (reports.length === 0) {

                    alert(
                        "No reports available."
                    );

                    return;
                }


                let content =

                    "================================\n" +
                    "        ALL HEALTH REPORTS\n" +
                    "================================\n\n";


                reports.forEach(
                    function(report, index) {

                        content +=

                            "Report " +
                            (index + 1) +
                            "\n\n" +

                            "Title : " +
                            report.title +

                            "\nDate : " +
                            report.date +

                            "\nStatus : " +
                            report.status +

                            "\nDetails : " +
                            report.details +

                            "\n\n--------------------------\n\n";

                    }
                );


                const blob =
                    new Blob(
                        [content],
                        {
                            type: "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");


                link.href = url;


                link.download =
                    "All_Health_Reports.txt";


                link.click();


                URL.revokeObjectURL(url);

            }
        );

}
