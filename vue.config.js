module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/reset.scss";
          @import "@/assets/styles/grid.scss";
          @import "@/assets/styles/variables.scss";
        `,
      },
    },
  },
};
