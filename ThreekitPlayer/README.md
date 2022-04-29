# Project: Century Martial Arts - Threekit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before running the App

### Env Variables
Create a new file in the root with the name `.env`, and copy the content from `.env.example`.\
Add the values for `REACT_APP_THREEKIT_PREVIEW_ORG_ID`, `REACT_APP_THREEKIT_PREVIEW_PUBLIC_TOKEN`, `REACT_APP_THREEKIT_PREVIEW_ASSET_ID`.\

### Local storage
To load an specific product you must to add in localStorage an especific key with the assetId from threekit:
``` javascript
localStorage.setItem("tkAsset", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
```
If you update the env var `REACT_APP_THREEKIT_ASSETKEY`, make sure you are using it in the script above.

To load the snapshot button over the player, set the localStorage key described in the env var `REACT_APP_SNAPSHOT_BUTTONKEY`:
``` javascript
localStorage.setItem("snpBtn", 1)
```

### Ready for deploy

Add the correct values in `REACT_APP_THREEKIT_ADMINFTS_ORG_ID`, `REACT_APP_THREEKIT_ADMINFTS_PUBLIC_TOKEN`, `REACT_APP_THREEKIT_ADMINFTS_ASSET_ID`.

Update the env var `REACT_APP_THREEKIT_ENV` with `admin-fts`.

## Available Scripts
### Run

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### build
```
yarn build:embed
```
Builds the app for production (as an unique script to add it to the shopping site) to the `embed` folder.\
You need to run this command from linux-base (git bash) terminal.

## Available custom API functions

### Take snapshots
``` javascript
const snapshotsFiles = await window.threekitCentury.takeSnapshots('Camera', ['Persp']);
```
This function is only available is window.threekitCentury object is created from shopping site scripts.\
About parameters: 
 - `'Camera'` is the name used for the attribute that constrols the perspectives (differents camera) frm threekit.
 - `['Persp']` is an array with camera item values to except in the proccess of snapshots generation.

## Some API functions used from shopping site

For details open [Threekit API](https://community.threekit.com/hc/en-us/sections/4411715731483-APIs), [Threekit/Treble API](https://treble.threekit.com/docs/treble-js-treble-api)
### Get Attributes
``` javascript
const attributes = window.threekit.configurator.getAttributes();
```

### Set Attributes
``` javascript
window.threekit.configurator.setConfiguration({ [attr]: { assetId: value } }); // For Assets. i.e. Images
window.threekit.configurator.setConfiguration({ [attr]: value }); //For strings, numbers.
```

### Upload Images
``` javascript
window.threekit.treble._api.catalog.uploadAsset(file)
  .then((assetId) => {
    callback(assetId); //you could set an attribute with the assetId to load the image uploaded
  })
```

