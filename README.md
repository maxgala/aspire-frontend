## Aspire Frontend

![Deploy to Prod](https://github.com/maxgala/aspire-frontend/workflows/Deploy%20to%20Prod/badge.svg)

The directory hierarchy will be as following:


- frontend
  - public
  - src
    - Components
      - feature1
        - file.js
      - feature2
        - file.js
      - ...
  - public (will be built from the prod build)
    - All Static Files
  - package.json (contains any packages we will be using)

## Dev mode

Define the following environment variables in your shell before launching the application:

```sh
export REACT_APP_CLIENT_ID=""
export REACT_APP_USER_POOL_ID=""
export REACT_APP_BACKEND_URL=""
```

Or you can add a file named `.env` in the root directory of this project, containing the following:

```
REACT_APP_CLIENT_ID=""
REACT_APP_USER_POOL_ID=""
REACT_APP_BACKEND_URL=""
```

### Deployment

This project is deployed on [Heroku](https://max-aspire-frontend.herokuapp.com/).

### Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run dev`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
