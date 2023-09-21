// const apiUrl = "https://fluffy-garbanzo-g949pr65v763pwpj-3000.app.github.dev";
const apiUrl = "http://localhost:3000";

// Function to get restaurant data
export async function createReservation(newObj) {
  const response = await fetch(`${apiUrl}/api/reservation/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(newObj), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to create the retaurant");
  }
  return response.json();
}

export async function checkReservation(newObj) {
  const response = await fetch(`${apiUrl}/api/reservation/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(newObj), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to create the retaurant");
  }
  return response.json();
}

export async function getUserReservations(userID) {
  const response = await fetch(`${apiUrl}/api/reservation/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(userID), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to get restaurants for the user");
  }
  return response.json();
}

export async function deleteReservation(delObj) {
  const response = await fetch(`${apiUrl}/api/reservation/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(delObj), // Convert the data to JSON
  });
  if (!response.ok) {
    throw new Error("Failed to delete retaurant");
  }
  return response.json();
}
