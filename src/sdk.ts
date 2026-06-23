import packageJson from "../package.json";

export const sdkInfo = () => {
  return {
    name: packageJson.name,
    version: packageJson.version,
  };
};
