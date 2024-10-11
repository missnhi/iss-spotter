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
    // Returned coordinates: { latitude: 51.0486151, longitude: -114.0708459 }
  });
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 *
 *     URL: https://iss-flyover.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE.
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    
    const flyOverTimes = body.response;
    callback(null, flyOverTimes);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  })
}

module.exports = {nextISSTimesForMyLocation};
