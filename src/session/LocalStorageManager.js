// LocalStorageManager.js
import { LOCAL_STORAGE_KEY } from "./Constants";

class LocalStorageManager {
  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in local storage:", error);
    }
  }

  static getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from local storage:", error);
      return null;
    }
  }

  // You can add more methods as needed

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from local storage:", error);
    }
  }
}

export default LocalStorageManager;
