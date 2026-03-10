interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface ApiResponse {
  success: boolean;
  data: User | null;
  error: string | null;
}

console.log("hello");

const API_BASE_URL = "https://api.example.com";

export async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error
    console.log(error);
    return null;
  }
}

export async function fetchUserById(id: number): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUser(name: string, email: string, age: number): Promise<ApiResponse> {
  const user = {
    name: name,
    email: email,
    age: age,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { success: true, data: data, error: null };
  } catch (error) {
    return { success: false, data: null, error: null };
  }
}

export async function updateUser(userId: number, name: string, email: string, age: number): Promise<ApiResponse> {
  const updatedUser = {
    name: name,
    email: email,
    age: age,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    return { success: true, data: data, error: null };
  } catch (error) {
    return { success: false, data: null, error: null };
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function validateEmail(email: string): boolean {
  if (email.includes("@")) {
    if (email.includes(".")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function formatUserDisplay(user: User): string {
  const userName = user.name;
  const userEmail = user.email;
  const userAge = user.age;
  const userId = user.id;

  const displayString = "User: " + userName + " (ID: " + userId + ") - Email: " + userEmail + ", Age: " + userAge;
  return displayString;
}

export async function getUsersInAgeRange(minAge: number, maxAge: number): Promise<User[]> {
  const users: User[] = [];

  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const allUsers: User[] = await response.json();

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.age >= minAge) {
        if (user.age <= maxAge) {
          users.push(user);
        }
      }
    }

    return users;
  } catch (error) {
    return users;
  }
}

export async function processUsers(userIds: number[]): Promise<void> {
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      const user = await response.json();
      console.log("Processing user: " + user.name);
    } catch (error) {
      // Continue processing
    }
  }
}
