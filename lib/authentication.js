const fetch = require("node-fetch");
//first take your access_token (change samples values with your correct values)

/**
 * @description authentication
 * @param {object} user  user information
 * @example user={
    grant_type: "password", // Dont change it
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    username: "YOUR_EMAIL",
    password: "YOUR_PASSWORD",
 * }
 * @return {string} token that use for other functions
 */
module.exports = getToken = async (user) => {
  const url = "https://app.metabypass.tech/CaptchaSolver/oauth/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  console.log("Authenticating...");

  const response = await fetch(url, options);

  try {
    const result = await response.json();
    const access_token = result.access_token;
    console.log("Authentication done successfuly");
    return access_token;
  } catch {
    console.log("Invalid request");
  }
};
