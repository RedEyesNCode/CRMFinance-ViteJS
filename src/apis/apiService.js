// apiService.js
const BASE_URL = "https://megmab2b.com:3000/";

// you can pass endpoint, method and data to this javascript function.

import LocalStorageManager from '../session/LocalStorageManager';
import { LOCAL_STORAGE_KEY } from '../session/Constants';

async function apiService(endpoint, method, data = null) {
    const url = BASE_URL + endpoint; // Assuming API endpoints are relative
    const options = { method, headers: { 'Content-Type': 'application/json' } };

    if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    const cacheKey = url + JSON.stringify(options); // Unique key
    const cachedData = LocalStorageManager.getItem(cacheKey);

    // Check if cached data exists and is not expired
    if (
        cachedData &&
        cachedData.timestamp &&
        Date.now() - cachedData.timestamp < (options.cacheTTL || 3600000)
    ) {
      // still call the api if cache is present 
      const response = await fetch(url, options);
        const data = await response.json();

        // Store response in cache with timestamp
        if (response.ok) { // Cache only successful responses
          LocalStorageManager.setItem(cacheKey, { data, timestamp: Date.now() });
        }

        // returning the old response only next time it will be new.
        return data;

        // return cachedData.data;
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Store response in cache with timestamp
        if (response.ok) { // Cache only successful responses
          LocalStorageManager.setItem(cacheKey, { data, timestamp: Date.now() });
        }

        return data;
    } catch (error) {
        throw error; 
    }
}

export default apiService;

