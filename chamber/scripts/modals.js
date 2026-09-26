function displayCourseDetails(course) {
    CourseDetails.innerHTML = "";
    CourseDetails.innerHTML = `
        <div>
        <button id="closeModal">X</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certification</strong>: ${course.certification}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        </div>
    `;
    CourseDetails.showModal();

    closeModal.addEventListener("click", () => {
        CourseDetails.close();

        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        })
    });
}