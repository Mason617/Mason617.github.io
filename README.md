<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Schedule Generator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; }
        .container { max-width: 800px; margin: auto; }
        label, select, button { display: block; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>

    <div class="container">
        <h1>Class Schedule Generator</h1>
        
        <label for="course-select">Choose a course:</label>
        <select id="course-select">
            <option value="CS101" data-size="50" data-prereq="None" data-enrolled="45">CS101 - Intro to Programming</option>
            <option value="MATH201" data-size="40" data-prereq="MATH101" data-enrolled="30">MATH201 - Calculus I</option>
            <option value="ENG150" data-size="35" data-prereq="None" data-enrolled="33">ENG150 - English Composition</option>
            <option value="HIST210" data-size="45" data-prereq="None" data-enrolled="42">HIST210 - World History</option>
        </select>

        <button onclick="addClass()">Add to Schedule</button>

        <h2>Generated Schedule</h2>
        <table id="schedule-table">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Class Size</th>
                    <th>Prerequisites</th>
                    <th>Current Enrollment</th>
                </tr>
            </thead>
            <tbody id="schedule-body">
                <!-- Schedule data will appear here -->
            </tbody>
        </table>
    </div>

    <script>
        function addClass() {
            const select = document.getElementById("course-select");
            const selectedOption = select.options[select.selectedIndex];

            const courseName = selectedOption.text;
            const classSize = selectedOption.getAttribute("data-size");
            const prereq = selectedOption.getAttribute("data-prereq");
            const enrolled = selectedOption.getAttribute("data-enrolled");

            const tableBody = document.getElementById("schedule-body");

            // Check if the course is already added
            for (let row of tableBody.rows) {
                if (row.cells[0].innerText === courseName) {
                    alert("Course already added!");
                    return;
                }
            }

            // Insert new row
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = courseName;
            row.insertCell(1).innerText = classSize;
            row.insertCell(2).innerText = prereq;
            row.insertCell(3).innerText = enrolled;
        }
    </script>

</body>
</html>
