import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
// make a POST request to the login route
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

      const data = await response.json();
      if (!response.ok) {
      throw new Error("Failed to login");
    }
    return data;
  } catch (error) {
    console.log('error', error);
    return Promise.reject('Failed to login');
}
};

export { login };
