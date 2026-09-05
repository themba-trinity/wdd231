



const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: false },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false },
    { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

const container = document.querySelector("#courses");
const totalCreditsElement = document.querySelector("#totalCredits");

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = total;
}
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));

displayCourses(courses);
