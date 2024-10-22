const Fastify = require('fastify');

require("pino-pretty")

const { IS_DEV_ENV } = require('./config');
const { patchRouting } = require('./routes');

const bootstrapFastify = () => {
    const fastify = Fastify({
        exposeHeadRoutes: false,
        connectionTimeout: 20000,
        ignoreTrailingSlash: false,
        logger: !IS_DEV_ENV || {
            level: 'debug',
            transport: {
                target: '@mgcrea/pino-pretty-compact',
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss Z",
                    ignore: 'pid,hostname',
                },
            },
        },
        disableRequestLogging: true,
    });

    patchRouting(fastify);

    if (IS_DEV_ENV) {
        fastify.register(require("@mgcrea/fastify-request-logger"), {});

        fastify.ready(() => {
            console.log(`\nAPI Structure\n ${fastify.printRoutes()}`);
        });
    }
    return fastify;
};

module.exports = { bootstrapFastify };
