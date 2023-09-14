// const apiUrl = "https://fluffy-garbanzo-g949pr65v763pwpj-3000.app.github.dev";
const apiUrl = "http://localhost:3001";

// Function to login user data
export async function loginUser(username) {
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(username), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json();
}

export async function singoutUser(username) {
  const response = await fetch(`${apiUrl}/api/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(username), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to singout user");
  }
  return response.json();
}
export async function deletetProfile(username) {
  const response = await fetch(`${apiUrl}/api/auth/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(username), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to delete profile user");
  }
  return response.json();
}
