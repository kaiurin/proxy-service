const fastify = require('fastify')({logger: false});
const proxy = require('./proxy.service');

const interval = 1000; //300000

fastify.register(require('fastify-cors'));

fastify.get('/btcusd', proxy.getBtcUsdtInfo);
fastify.get('/gbytebtc', proxy.getGbyteBtcInfo);

const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();

setInterval(proxy.updateCurrencyInfoCache, interval)
