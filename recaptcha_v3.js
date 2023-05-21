//------------- reCAPTCHA v3 ----------------

//first take your access_token (change samples values with your correct values)

/**
 * @description authentication
 * @param {object} user credential use for get token
 * @example
 {
   grant_type: "password",
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    username: "YOUR_EMAIL",
    password: "YOUR_PASSWORD",
 }
 * @param {string} url https://app.metabypass.tech/CaptchaSolver/oauth/token

 * @return {string} token that use for other functions
 */
 const getToken = async (user, url) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  let access_token = null;

  let response = await fetch(url, options);
  try {
    const result = await response.json();
    access_token = result.access_token;
    return access_token;
  } catch {
    console.log("Invalid request");
  }
};
//----------------Call reCAPTCHA v3------------
/**
 * @description get recaptcha v3 and return recaptcha v3 response
 * @param {string} token get from getToken function
 * @param {string} url "https://app.metabypass.tech/CaptchaSolver/api/v1/services/bypassReCaptcha";
 * @param {object} data object which includes url, sitekey, version 
 * @example data = {
    url: "SITE_URL",
    sitekey: "SITE_KEY",
    version: "3",
 }
 * @return {string} recaptcha response
 */

const getRecaptchaResponse = async (token, url, data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);
  try {
    const result = await response.json();
    if(result.status_code === 200)
    {
      const reCaptchaResult = result.data.RecaptchaResponse;
      console.log('reCaptcha Response=>',reCaptchaResult)
      return reCaptchaResult;
    }
    else if(result.status_code === 401)
    {
      let user = {
        grant_type: "password",
        client_id: "YOUR_CLIENT_ID",
        client_secret: "YOUR_CLIENT_SECRET",
        username: "YOUR_EMAIL",
        password: "YOUR_PASSWORD",
      };
      let oauthUrl = "https://app.metabypass.tech/CaptchaSolver/oauth/token";
      let newToken = await getToken(user, oauthUrl);
      if(newToken !== null || newToken !== undefined){
        getRecaptchaResponse(newToken,url,data)
      }
      else{
        console.log('Authentication Failed')
      }
      
    }
    else{
      console.log(result.message)
    }
    
  } catch {
    console.log("Invalid request");
  }
};