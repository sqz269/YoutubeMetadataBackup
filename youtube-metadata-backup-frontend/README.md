# Youtube Metadata Backup (Frontend)
Uses Vue.js, and Bootstrap 5 (Template from [Examples/Cover](https://getbootstrap.com/docs/4.0/examples/cover/))

## Installation
1. Clone this Repository

        git clone https://github.com/sqz269/YoutubeMetadataBackup

2. Install Required NPM Packages (Change Directory to `YoutubeMetadataBackup/youtube-metadata-backup-frontend/` first)

        npm install

3. `@types/gapi.client.youtube` module need to be installed separatly ([reference](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9607))

    1. Clone the __google-api-typings-generator__ repositroy

            git clone https://github.com/Maxim-Mazurok/google-api-typings-generator 

    2. cd to __google-api-typings-generator__

    3. Install dependencies:

            npm install

    4. Discovered Google APIs

            npm start

    5. Copy `google-api-typings-generator/types/gapi.client.youtube` to `youtube-metadata-backup-frontend/node_modules/@types`

4. Edit `src/main.ts` in the front-end folder and replace `window.apiEndpointDomain`'s value with your backend server's domain (Note: Do __NOT__ Include Trailing Backslash)

5. __Optional__, but strongly recommended. Edit `src/main.ts` and add an Youtube Data API Key at `Utils.SetCookie("apiKey", "");`

6. Build Frontend

        npm run build

7. Host the `./dist` folder with github pages or any web hosting service

    1. If you are hosting the front end on github pages, create a `vue.config.js` in the same folder as this README

    2. Paste the following code to `vue.config.js` and replace with your github repo name

            // vue.config.js
            module.exports = {
                publicPath: "<YOUR PROJECT NAME>"
            }