# www.umkm.bri.co.id

## Prerequisites

Requirements prior to running/building this app:

### Tech Stack

* node v12
* npm v6
* create-react-app

### Environment Variables

| Name                | Description  | Example     | Location     |
| ------------------- | ------------ | ----------- | ------------ |
| `REACT_APP_API_URL` | API Base URL | `127.0.0.1` | File `.env*` |

## Installation Guides

### Without Docker

```bash
# install dependencies
$ npm install

# provide environment variables depending on the environment
$ vim .env
$ vim .env.local.development
$ vim .env.production

# serve with hot reload at localhost:3000
$ npm run start

# build for production and launch server
$ npm run build
$ npm run serve
```

### With Docker

```bash
# provide environment variables in a .env file
$ vim .env

# build docker image
$ docker build -t www.umkm.bri.co.id:latest .

# run docker container
$ docker run -p 3000:3000 www.umkm.bri.co.id:latest
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn serve`

Runs the app in the production mode. `build` script needed to run prior to running this.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
