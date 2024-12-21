document.getElementById("decision-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Collect user inputs
  const preference = document.getElementById("preference").value;
  const type = document.getElementById("type").value;
  const budget = document.getElementById("budget").value;

  // Send data to the server
  const response = await fetch("/recommendation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ preference, type, budget }),
  });

  // Display the result
  if (response.ok) {
    const data = await response.json();
    document.getElementById("recommendation-text").textContent = data.recommendation;

    if (data.imageUrl) {
      const imgElement = document.createElement("img");
      imgElement.src = data.imageUrl;
      imgElement.alt = "Recommendation Image";
      const imageContainer = document.getElementById("recommendation-image");
      imageContainer.innerHTML = ""; // Clear previous images
      imageContainer.appendChild(imgElement);
    }

    document.getElementById("result").classList.remove("hidden");
  } else {
    alert("Something went wrong. Please try again.");
  }
});
