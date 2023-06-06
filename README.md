# Metabypass captcha solver javascript

Free demo (no credit card required) -> https://app.metabypass.tech/application




to install these packages use npm install metabypass-captcha-solver

for using this package first import metabypass-captcha-solver
const solver = require("metabypass-captcha-solver");

# 1.authentication


to authenticate and get the token first create the below object with your credentials


const user = {
  grant_type: "password", // Dont change it
  client_id: ",
  client_secret: ",
  username: "",
  password: "",
};


use getToken function from solver object


const token = await solver.getToken(user);


then saved the token in file or anywhere else for use in another function

# 2-text captcha


for solving text captcha use captchaSolver from solver object
pass token and data 


data ={
image:(string) base 64 you can use solver.getBase64Encoded('image url')
numeric:0
min_len:0,
max_len:0
}


const result = await solver.captchaSolver(token, data);

# 3-reCaptcha version 2
 
const data = {
    url: "", define protocol http or https
    sitekey: "",
    version: "2",
  };
  
 const recaptchaId = await solver.getRecaptchaId(token, data);
 
 
 after you get recaptcha Id you can use below function to get response
 
 
 const result = await solver.getRecaptchaResult(token, recaptchaId);
  
 # 4-reCatpcha version 3
 
 
 const data = {
    url: "", define protocol http or https
    sitekey: "",
    version: "3",
  };
  
  const result = await solver.getRecaptchaResponse(token, data);
 

