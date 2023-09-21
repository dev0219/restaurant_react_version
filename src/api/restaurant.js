// const apiUrl = "https://fluffy-garbanzo-g949pr65v763pwpj-3000.app.github.dev";
const apiUrl = "http://localhost:3000";

// Function to get restaurant data
export async function createRestaurnt(newObj) {
  const response = await fetch(`${apiUrl}/api/restaurant/create`, {
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

export async function EditRestaurnt(newObj) {
  const response = await fetch(`${apiUrl}/api/restaurant/update`, {
    method: "PUT",
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

export async function getUserRestaurnts(userID) {
  const response = await fetch(`${apiUrl}/api/restaurant/all`, {
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

export async function getAllRestaurnts(userID) {
  const response = await fetch(`${apiUrl}/api/restaurant/member/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // You can add other headers here if needed, like authentication headers
    },
    body: JSON.stringify(userID),
  });
  if (!response.ok) {
    throw new Error("Failed to get all restaurants for the member");
  }
  return response.json();
}

export async function deleteRestaurnt(delObj) {
  const response = await fetch(`${apiUrl}/api/restaurant/delete`, {
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
