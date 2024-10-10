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
    // if there is an error, pass it to the callback
    if (error) {
      callback(error, null);
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }
    
    // if all went well, pass the data to the callback
    //parse and extract the IP address using JSON and then pass that through to the callback
    const ip = response.body.ip;
    callback(null, ip);
  });
}

const fetchCoordsByIP = function(ip, callback) {
  // use ipwho.is APIs to fetch coordinates from IP address
  needle.get(`https://ipwho.is/${ip}`, (error, response) => {
    // if there is an error, pass it to the callback
    if (error) {
      callback(error, null);
      return;
    }
    
    if (!response.body.success) {
      const message = `Success status was ${response.body.success}. Server message says: ${response.body.message} when fetching for IP ${response.body.ip}`;
      callback(Error(message), null);
      return;
    }
    
    // if all went well, pass the data to the callback
    const {latitude, longitude} = response.body;
    callback(null, {latitude, longitude});
  });
}


module.exports = {fetchMyIP};
module.exports = {fetchCoordsByIP};