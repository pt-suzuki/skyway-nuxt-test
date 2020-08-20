import { Configuration, Context } from "@nuxt/types";

const envPath = `../.env.${process.env.NODE_ENV || "local"}`;
const { API_URL, SECRET_ID, SECRET_KEY } = process.env;

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [],
    link: [
      {
        rel: "icon",
        type: "image/x-icon"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      "@nuxt/typescript-build",
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ]
  ],
  dotenv: {
    filename: envPath
  },
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/toast", "@nuxtjs/font-awesome", "@nuxtjs/dotenv"],

  toast: {
    position: "top-right",
    duration: 3000
  },
  srcDir: "src/",
  router: {
    base: process.env.BASE_URL || ""
  },

  env: {
    API_URL,
    SECRET_ID,
    SECRET_KEY
  },

  build: {
    /*
      You can extend webpack config here
    */
    postcss: {
      plugins: {
        "postcss-preset-env": {
          autoprefixer: { grid: true }
        }
      }
    },

    extend(config: Configuration, ctx: Context) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = "inline-cheap-module-source-map";
        // Run ESLint on save
        if (config.module) {
          config.module.rules.push({
            enforce: "pre",
            test: /\.(ts|js|vue)$/,
            loader: "eslint-loader",
            exclude: /(node_modules)/
          });
        }

        // Run StyleLint on save
        /* eslint import/no-extraneous-dependencies: 0 */
        /* eslint global-require: 0 */
        if (config.plugins) {
          const StylelintPlugin = require("stylelint-webpack-plugin");
          config.plugins.push(
            new StylelintPlugin({
              files: ["**/*.vue", "**/*.css", "**/*.scss"]
            })
          );
        }
      }
    }
  }
};
