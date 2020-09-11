/**
 * Auth config.
 */
import devConfig from "./dev";
import predevConfig from "./predev";

const NODE_ENV = process.env.NODE_ENV;

export const apiConfig = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: devConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'predev'
  // ======================================================
  // test: predevConfig,
  predev: predevConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: predevConfig,
};

export const apiList = apiConfig[NODE_ENV].apiList;
export default apiConfig[NODE_ENV];
