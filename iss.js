/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const needle = require('needle');

const fetchMyIP = function(callback) {
  // use needle to fetch IP address from JSON API
  needle.get('https://api.ipify.org?format=json', (error, response) => {
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }
    // if there is an error, pass it to the callback
    if (error) {
      callback(error, null);
    } else {
      //parse and extract the IP address using JSON and then pass that through to the callback
      const ip = response.body.ip;
      callback(null, ip);
    }
  });
}

module.exports = {fetchMyIP};