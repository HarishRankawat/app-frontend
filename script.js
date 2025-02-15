document.addEventListener('DOMContentLoaded', function() {
    const addAppLinkForm = document.getElementById('addAppLinkForm');
    const appLinksTable = document.getElementById('appLinksTable').getElementsByTagName('tbody')[0];  

    // Add new app link
    addAppLinkForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const link = document.getElementById('link').value;
        const platform = document.getElementById('platform').value;

        fetch('http://localhost:5000/api/appLinks/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, link, platform })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAppLinks(); // Reload app links after adding
            addAppLinkForm.reset(); // Clear the form
        })
        .catch(error => console.error('Error adding app link:', error));
    });

    fetchAppLinks();
});

   // Fetch all app links and display them
function fetchAppLinks() {
    console.log('Fetching app links...'); // Log when the function is called
    fetch('http://localhost:5000/api/appLinks')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched app links:', data); // Log the fetched data to check if it's correct
            appLinksTable.innerHTML = ''; // Clear the table
            data.forEach(appLink => {
                let row = appLinksTable.insertRow();
                row.innerHTML = `
                    <td>${appLink.name}</td>
                    <td><a href="${appLink.link}" target="_blank">${appLink.link}</a></td>
                    <td>${appLink.platform}</td>
                    <td>
                        <button onclick="deleteAppLink('${appLink._id}')">Delete</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error fetching app links:', error));
}

// Define the deleteAppLink function in the global scope
function deleteAppLink(id) {
    console.log(`Deleting app link with id: ${id}`); // Log the id of the link being deleted
    fetch(`http://localhost:5000/api/appLinks/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deleted app link response data:', data); 
        alert(data.message); // Show success message
        fetchAppLinks(); // Reload the list after deletion
    })
    .catch(error => console.error('Error deleting app link:', error));
}