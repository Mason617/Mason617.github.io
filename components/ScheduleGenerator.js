import { useState } from "react";
import "./ScheduleGenerator.css"; // CSS file

function ScheduleGenerator() {
  const [schedule, setSchedule] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const courses = [
    { id: "CS101", name: "Intro to Programming", size: 50, prereq: "None", enrolled: 45 },
    { id: "MATH201", name: "Calculus I", size: 40, prereq: "MATH101", enrolled: 30 },
    { id: "ENG150", name: "English Composition", size: 35, prereq: "None", enrolled: 33 },
    { id: "HIST210", name: "World History", size: 45, prereq: "None", enrolled: 42 },
  ];

  const addClass = (event) => {
    const selectedId = event.target.value;
    setSelectedCourseId(""); // Reset dropdown

    if (!selectedId) return;

    const selectedCourse = courses.find(course => course.id === selectedId);
    if (!selectedCourse) return;

    // Optional: prevent adding full classes
    if (selectedCourse.enrolled >= selectedCourse.size) {
      alert("Course is full!");
      return;
    }

    if (schedule.some(course => course.id === selectedCourse.id)) {
      alert("Course already added!");
      return;
    }

    setSchedule([...schedule, selectedCourse]);
  };

  const removeClass = (id) => {
    setSchedule(schedule.filter(course => course.id !== id));
  };

  return (
    <div className="container">
      <h1>Class Schedule Generator</h1>

      <label htmlFor="course-select">Choose a course:</label>
      <select
        id="course-select"
        value={selectedCourseId}
        onChange={(e) => {
          setSelectedCourseId(e.target.value);
          addClass(e);
        }}
      >
        <option value="">-- Select a Course --</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {`${course.id} - ${course.name}`}
          </option>
        ))}
      </select>

      <h2>Generated Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Class Size</th>
            <th>Prerequisites</th>
            <th>Current Enrollment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.length > 0 ? (
            schedule.map((course, index) =>
              course ? (
                <tr key={index}>
                  <td>{course.id} - {course.name}</td>
                  <td>{course.size}</td>
                  <td>{course.prereq}</td>
                  <td>{course.enrolled}</td>
                  <td>
                    <button onClick={() => removeClass(course.id)}>Remove</button>
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No courses added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleGenerator;
