const { echoRouter } = require("./echo")

module.exports.patchRouting = (fastify) => {
    fastify.register(echoRouter);
};