const axios = require('axios');

const currencyInfoCache = {
    price1: {},
    price2: {}
}

let isFirstCurrencyUpdate = true;

const getBtcUsdtInfo = async (request, reply) => {
    reply.send({price1: currencyInfoCache.price1})
}

const getGbyteBtcInfo = async (request, reply) => {
    reply.send({price2: currencyInfoCache.price2})
}

const updateCurrencyInfoCache = async () => {
    try {
        currencyInfoCache.price1 = (await axios.get('https://api.bitfinex.com/v1/pubticker/btcusd')).data;
        currencyInfoCache.price2 = (await axios.get('https://api.bittrex.com/v3/markets/GBYTE-BTC/ticker')).data;
    } catch (e) {
        if (isFirstCurrencyUpdate) process.exit(0);
    }

    isFirstCurrencyUpdate = false;
}

module.exports = {
    getBtcUsdtInfo,
    getGbyteBtcInfo,
    updateCurrencyInfoCache
}
