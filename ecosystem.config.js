module.exports = {
  apps: [
    {
      name: "corefans",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
