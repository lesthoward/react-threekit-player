# Project: Century Martial Arts - Threekit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

