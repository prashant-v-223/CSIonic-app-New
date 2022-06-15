// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/api/v1/", //server - https://prosprr.in/api/v1/  Labhu - 192.168.43.135 Yash - 192.168.0.112
  //baseUrl: "https://prosppr.com/api/v1/", //server - https://prosprr.in/api/v1/  Labhu - 192.168.43.135 Yash - 192.168.0.112
  COGNITO_IDENTITY_POOL_ID: "ap-south-1:19ff8828-ee7e-4155-b99a-5d490d83f246",
  AWS_REGION: "ap-south-1",
  COGNITO_USER_POOL_ID: "ap-south-1_Oj7GfEVr1",
  COGNITO_USER_POOL_CLIENT_ID: "7r09ln3dhgo52u5csglok841ld",
  APP_NAME: "prosppr-mobile",
  TO_EMAIL: ['yash.technocomet@gmail.com'],
  CC_EMAIL: ['adatiyayashu1909@gmail.com','arjun.technocomet@gmail.com'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
