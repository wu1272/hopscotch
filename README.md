# hopscotch
407 Project

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html2.svg)](https://forthebadge.com)

## Dev Environment Setup

### DB info
Web access: http://web.ics.purdue.edu/software/phpMyAdmin/?_ga=2.261829517.125188418.1612816247-752467662.1554262665
Username: david22
Password: Hunter123

### Environment Prep

1. Make sure you have a `frontend/.env` file set up with the following parameters (list will be updated as needed):

    - REACT_APP_AUTH0_DOMAIN
    - REACT_APP_AUTH0_CLIENT_ID

    To get the values for these parameters. Contact Jack.

2. Edit your hosts file to add the following line:
    `127.0.0.1 myapp.example`
    If you are using a UNIX based system, this can be found in `/etc/hosts`.

### How to run

1. Everytime you pull, or checkout a new branch, run the following:

    ```{bash}
    cd frontend && rm -rf node_modules && npm install && cd ..
    cd backend && rm -rf node_modules && npm install && cd ..
    ```

2. Make sure your `.env` file is present.

3. When you are ready to go, start each component with the following commands:
    - Backend: `npm run dev`
    - Frontend: `npm start`

4. Your web browser should give you a security since we are using a self-signed certificate for local testing purposes.