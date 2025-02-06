import type { ModuleFederationPluginOptions } from "@rspack/core";

export const mfConfig: ModuleFederationPluginOptions = {
  name: "home",
  filename: "remoteEntry.js",
  exposes: {
    "./RemoteEntry": "./src/RemoteEntry.tsx",
  },
  remotes: {
    host: "host@http://localhost:3000/remoteEntry.js",
  },
  shared: {
    react: {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
    },
    "react-router": {
      singleton: true,
    },
  },
};
