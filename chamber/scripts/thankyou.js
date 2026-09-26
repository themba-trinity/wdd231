const params = new URLSearchParams(window.location.search);
const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = `
    <h3>Application Details:</h3>
    <p><strong>First Name:</strong> ${params.get("firstName")}</p>
    <p><strong>Last Name:</strong> ${params.get("lastName")}</p>
    <p><strong>Email:</strong> ${params.get("email")}</p>
    <p><strong>Phone:</strong> ${params.get("phone")}</p>
    <p><strong>Business Name:</strong> ${params.get("businessName")}</p>
    <p><strong>Submitted:</strong> ${new Date(params.get("timestamp")).toLocaleString()}</p>
    <p>Membership Level: ${params.get("membership")}</p>
`;