document.addEventListener("DOMContentLoaded", function() {
    fetch("model/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });
    fetch("model/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});
function openPage(pageName) {
    window.location = `${pageName}.html`;
}
async function searchTerm() {
    // Clear previous results
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    // Get the search term
    const searchTerm = document.getElementById("searchTerm").value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    try {
        // Fetch data from the JSON file
        const response = await fetch('data.json');
        const data = await response.json();

        // Filter data based on the search term
        const filteredResults = data.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.price.toLowerCase().includes(searchTerm) ||
            item.address.toLowerCase().includes(searchTerm)
        );

        // Display results
        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result");
                resultDiv.innerHTML = `<strong>ID:</strong> ${item.id}<br>
                                       <strong>Title:</strong> ${item.title}<br>
                                       <strong>Address:</strong> ${item.address}<br>
                                       <strong>Price:</strong> ${item.price}`;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
        }

    } catch (error) {
        console.error("Error fetching the JSON file:", error);
        resultsContainer.innerHTML = "<p>Error loading data.</p>";
    }
}
