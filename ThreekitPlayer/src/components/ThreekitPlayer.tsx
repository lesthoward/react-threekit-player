import { ThreekitProvider } from "@threekit-tools/treble";
import { IProject } from "@threekit-tools/treble/dist/threekit";
import CustomPlayer from "./CustomPlayer";

const threekitEnv: string | undefined = process.env.REACT_APP_THREEKIT_ENV;
const tkAsset: string | undefined = process.env.REACT_APP_THREEKIT_ASSETKEY;

const ThreekitPlayer = () => {
  if (!threekitEnv) {
    throw new Error("Threekit Env is missing");
  }

  if (!tkAsset) {
    throw new Error("Asset key is missing");
  }

  const assetId = localStorage.getItem(tkAsset!);
  if (!assetId) {
    throw new Error("Asset is missing");
  }

  const project: IProject = {
    credentials: {
      preview: {
        orgId: process.env.REACT_APP_THREEKIT_PREVIEW_ORG_ID!,
        publicToken: process.env.REACT_APP_THREEKIT_PREVIEW_PUBLIC_TOKEN!,
      },
      "admin-fts": {
        orgId: process.env.REACT_APP_THREEKIT_ADMINFTS_ORG_ID!,
        publicToken: process.env.REACT_APP_THREEKIT_ADMINFTS_PUBLIC_TOKEN!,
      },
    },
    products: {
      preview: {
        assetId: assetId ?? undefined,
      },
      "admin-fts": {
        assetId: assetId ?? undefined,
      },
    },
  };

  return (
    <ThreekitProvider
      project={assetId ? project : undefined}
      threekitEnv={threekitEnv}
    >
      <CustomPlayer />
    </ThreekitProvider>
  );
};

export default ThreekitPlayer;
