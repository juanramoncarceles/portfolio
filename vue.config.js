module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: "source-map"
  },
  publicPath: process.env.NODE_ENV === "production" ? "/portfolio/" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Ramón Cárceles | Web developer";
      return args;
    });
  }
};
