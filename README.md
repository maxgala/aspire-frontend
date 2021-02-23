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
REACT_APP_AWS_SECRET_ACCESS_KEY=xyz
REACT_APP_ACCESS_KEY_ID=xyz
REACT_APP_MAILCHIMP_URL=https://maxgala.us11.list-manage.com/subscribe/post?u=c170e62e41c55cfbc5b7e6d33&id=ee816450c3
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51Gug4qLfzbEt5UVhauq1BUNsK43H4mkdAChHAGxumOZ6Jpks8VaGIbGlbxG0bP0v2n3V5nl31yJG3ewzPzEs5N6E00wcmCJI8p
REACT_APP_COGNITO_REGION=us-east-1
REACT_APP_COGNITO_USER_POOL_ID=xyz
REACT_APP_COGNITO_APP_CLIENT_ID=xyz
REACT_APP_BACKEND_URL=https://services-d.aspire.maxgala.com
REACT_APP_ENV=prod
REACT_APP_S3_BUCKET_NAME=xyz
REACT_APP_SES_REGION=us-east-2
```

### Deployment

This project is deployed on [Heroku](https://max-aspire-frontend.herokuapp.com/).

### Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm install`

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
