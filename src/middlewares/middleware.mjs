import https from 'https';  // Import the https module to make HTTPS requests

/**
 * Simulates downloads for a specified npm package by repeatedly making HTTP GET requests.
 * @param {number} intervalTime - Interval in milliseconds between each simulated download request.
 *                               Default is set to 5000 milliseconds (5 seconds).
 */
async function simulateDownloads(intervalTime = 5000) {  // Default interval set to 5 seconds
  const packageName = 'yocode';  // Hardcoded package name
  const version = '1.0.0-alpha.2';  // Hardcoded package version
  const downloadTarget = 100;  // Hardcoded target download count

  // Construct the URL to fetch the package from npm registry
  const url = `https://registry.npmjs.org/${packageName}/-/${packageName}-${version}.tgz`;
  let downloadCount = 0;  // Counter for the number of downloads

  // Set up a repeating interval to simulate downloads
  const interval = setInterval(() => {
    https.get(url, (res) => {  // Make a GET request to the npm package URL
      if (res.statusCode === 200) {
        downloadCount++;  // Increment the download count on successful response
        console.log(`Count: ${downloadCount}`);  // Log the current download count
      } else {
        console.error('Failed with status code:', res.statusCode);  // Log errors for unsuccessful attempts
      }

      // Check if the download count has reached the user's target
      if (downloadCount >= downloadTarget) {
        clearInterval(interval);  // Stop the interval
        console.log('Target reached.');  // Log that the target has been reached
      }
    }).on('error', (error) => {  // Handle network errors
      console.error('Error fetching URL:', error);  // Log any errors encountered during the request
      clearInterval(interval);  // Stop the interval on error
    });
  }, intervalTime);  // Use the intervalTime variable for setting the interval
}

simulateDownloads();  // Call the function to start the download simulation
