export default {
  credentials: {
    preview: {
      orgId: process.env.REACT_APP_THREEKIT_PREVIEW_ORG_ID,
      publicToken: process.env.REACT_APP_THREEKIT_PREVIEW_PUBLIC_TOKEN,
    },
    'admin-fts': {
      orgId: process.env.REACT_APP_THREEKIT_ADMINFTS_ORG_ID,
      publicToken: process.env.REACT_APP_THREEKIT_ADMINFTS_PUBLIC_TOKEN,
    },
  },
  products: {
    preview: {
      // assetId: process.env.REACT_APP_THREEKIT_PREVIEW_ASSET_ID, // Catalog items load dynamically 
    },
    'admin-fts': {
      //assetId: process.env.REACT_APP_THREEKIT_ADMINFTS_ASSET_ID, // Catalog items load dynamically 
    },
  },
};
