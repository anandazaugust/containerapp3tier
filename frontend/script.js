async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    const users = await res.json();

    const ul = document.getElementById("user-list");
    ul.innerHTML = "";

    users.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.Name} (${u.Email})`;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load users:", err);
    const ul = document.getElementById("user-list");
    ul.innerHTML = "<li class='error'>Failed to load users</li>";
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
