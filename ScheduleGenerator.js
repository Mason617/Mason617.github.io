import { useState, useEffect } from "react";

export default function Home() {
  const [schedule, setSchedule] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    // Fetch all available courses from Spring Boot backend
    fetch("http://localhost:8080/api/sections")
      .then((res) => res.json())
      .then((data) => {
        setAvailableCourses(data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
      });
  }, []);

  const addClass = () => {
    const select = document.getElementById("course-select");
    const selectedCrn = select.value;
    const selectedCourse = availableCourses.find(
      (course) => course.crn.toString() === selectedCrn
    );

    if (!selectedCourse) return;

    const alreadyAdded = schedule.some(
      (item) => item.crn === selectedCourse.crn
    );
    if (alreadyAdded) {
      alert("Course already added!");
      return;
    }

    setSchedule([...schedule, selectedCourse]);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        MTU Class Schedule Generator
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
        <select id="course-select" className="p-2 border rounded-md bg-white text-black">
          {availableCourses.map((course) => (
            <option
              key={course.crn}
              value={course.crn}
            >
              {`${course.subject} ${course.crse} - ${course.title}`}
            </option>
          ))}
        </select>

        <button
          onClick={addClass}
          className="p-2 bg-yellow-600 text-white rounded-md"
        >
          Add to Schedule
        </button>
      </div>

      <h2 className="text-2xl text-center mb-4">Generated Schedule</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Section</th>
            <th className="border px-4 py-2">Seats Taken</th>
            <th className="border px-4 py-2">Seats Available</th>
            <th className="border px-4 py-2">Instructor</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((course, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{`${course.subject} ${course.crse}`}</td>
              <td className="border px-4 py-2">{course.section}</td>
              <td className="border px-4 py-2">{course.seatsTaken}</td>
              <td className="border px-4 py-2">{course.seatsAvailable}</td>
              <td className="border px-4 py-2">{course.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
