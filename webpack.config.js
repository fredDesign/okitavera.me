const path = require("path");
const webpack = require("webpack");
const metadata = require("./manifest/metadata.json");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const config = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets"),
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus),
      buildstamp: JSON.stringify(Date.now())
    })
  ],
  output: {
    pathinfo: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
const inline = {
  entry: {
    Critical: "./assets/js/Critical.js"
  },
  output: {
    path: path.resolve(__dirname, "./modules/partial/generated"),
    filename: "[name].js"
  }
};

const external = {
  entry: {
    Okitavera: "./assets/js/Okitavera.js",
    FontLoaderData: "./assets/js/FontLoaderData.js"
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js`),
    filename: "[name].js"
  }
};

const polyfills = {
  entry: {
    FontLoaderFallback: "./assets/js/polyfills/FontLoaderFallback.js",
    ScrollBehaviour: "./assets/js/polyfills/ScrollBehaviour.js"
  },
  output: {
    path: path.resolve(
      __dirname,
      `${metadata.site.output}/assets/js/polyfills/`
    ),
    filename: "[name].js"
  }
};

module.exports = [
  { ...config, ...inline },
  { ...config, ...external },
  { ...config, ...polyfills }
];
