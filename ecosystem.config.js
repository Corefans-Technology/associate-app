module.exports = {
  apps: [
    {
      name: "corefans-manager",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
