# Angular Authentication + NgRx 8

I'm was developing a web app and thought will be helpful to share some code for this frequently asked task that is authentication.
I used Brandon Roberts member of the NgRx team talk on Ng-Conf 2018 about authentication as a guide here is the link to the talk https://www.youtube.com/watch?v=46IRQgNtCGw

##Architecture

###Key Requirements

- Login with email and password
- Credentials must be enter once and remember by the app

###App Features
####Login

- Email and password authentication
- Json Web Tokens attached by Http Interceptor
  ###Domain Rules
- User must be logged in to enter home page
  ###Logging
- Bugsnag service for production
  ###Services / Communication
- Restful services with nodejs ( For demostration purposes will simulate http request with Authentication Service uncoment code to test localy in authentication/services/authentication.service.ts)
- Authentication Service (Angular Service)
- Authentication Guard (Angular Service)
- Http Interceptor will attached token to header
  ###Data Models

#### User

```
interface User {
id: string | number;
name: string;
email: string;
}
```

####LoginData

```
interface LoginData {
username: string;
password: string;
}
```

#### AuthenticationData

```
interface AuthenticationData {
token: string;
user: User;
}
```

###Components

- Feature Component
   LoginComponent
- Presentational 
  LoginFormComponent
  Layout

### Shared Functionality

- Toastr
- Layout
  Angular Flex
- State Management
   NgRx

###Set Up Environment
- Install NodeJs 12.8.1 https://nodejs.org/en/

- Install Visual Studio Code https://code.visualstudio.com/

- Install Angular cli

- Download Repo https://github.com/BePasquet/angular-components

- Install dependencies
```npm i```

- Run dev environment
```ng serve```
- Test
```ng test```

