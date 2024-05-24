// apiService.js
const BASE_URL = "http://192.168.1.6:3000/";

// you can pass endpoint, method and data to this javascript function.

const apiService = async (endpoint, method = "GET", data = null) => {
  const url = BASE_URL + endpoint;
  const headers = {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data'
    // Add any other headers if needed
  };

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default apiService;
