# Metabypass captcha solver javascript

Free demo (no credit card required) -> https://app.metabypass.tech/application




to install these packages use 
```javascript
npm install metabypass
```

for using this package first import metabypass
```javascript
const solver = require("metabypass");
````

# 1.authentication


to authenticate and obtain the token first create the below object with your credentials and use getToken function from solver object

```javascript
const user = {
  grant_type: "password", // Dont change it
  client_id: ",
  client_secret: ",
  username: "",
  password: "",
};
const token = await solver.getToken(user);
```


then saved the token in file or anywhere else for use in another function

# 2-text captcha


for solving text captcha use captchaSolver from solver object
pass token and data 
```javascript
const image = await soler.getBase64LocalCaptcha('local image url)

const image = await solver.getBase64Encoded('external image url') 
data ={
image: image
numeric:0,
min_len:0,
max_len:0
}
const result = await solver.captchaSolver(token, data);
```

# 3-reCaptcha version 2
 ```javascript
const data = {
    url: "", define protocol http or https
    sitekey: "",
    version: "2",
  };
  
 const recaptchaId = await solver.getRecaptchaId(token, data);
 ```
 after you get recaptcha Id you can use below function to get response
```javascript 
 const result = await solver.getRecaptchaResult(token, recaptchaId);
 ```
  
 # 4-reCatpcha version 3
 
 ```javascript
 const data = {
    url: "", define protocol http or https
    sitekey: "",
    version: "3",
  };
  const result = await solver.getRecaptchaResponse(token, data);
```
# 5-Example for captcha
```javascript
const solveCaptcha = async()=>{
  const user = {
  grant_type: "password", // Dont change it
  client_id: ",
  client_secret: ",
  username: "",
  password: "",
};
const token = await solver.getToken(user);
// use one of below function for base64 <b>getBase64LocalCaptcha</b> for local image and <b>getBase64Encoded</b> for external image
const image = await soler.getBase64LocalCaptcha('local image url)
const image = await solver.getBase64Encoded('external image url') 
data ={
image: image
numeric:0,
min_len:0,
max_len:0
}
const result = await solver.captchaSolver(token, data);
}
```
