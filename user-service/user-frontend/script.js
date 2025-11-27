const API_URL = "http://localhost:4000/users";

function loadUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#userTable tbody");
            tbody.innerHTML = "";

            data.forEach(user => {
                tbody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Load error:", err));
}


document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();

   
    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value
    };

    const errorBox = document.getElementById("errorBox");
    errorBox.classList.add("d-none");
    errorBox.innerHTML = "";


    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
        .then(async res => {
            if (!res.ok) {
                const errorData = await res.json();

                if (errorData.errors) {
                    errorBox.classList.remove("d-none");
                    errorData.errors.forEach(err => {
                        errorBox.innerHTML += `• ${err}<br>`;
                    });
                }
                throw new Error("Validation error");
            }
            return res.json();
        })
        .then(newUser => {
            alert("User successfully added!");
            document.getElementById("addUserForm").reset();
            loadUsers();
        })
        .catch(err => console.log("Add user error:", err));
});


loadUsers();
