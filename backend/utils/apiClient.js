const axios = require('axios');

const getCurrencyByCountry = async (countryName) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const currencies = response.data[0].currencies;
        return Object.keys(currencies)[0]; // e.g., 'USD', 'INR'
    } catch (error) {
        console.error('Error fetching country currency:', error);
        return 'USD'; // Fallback
    }
};

const getExchangeRate = async (from, to) => {
    if (from === to) return 1.0;
    try {
        const apiKey = process.env.EXCHANGE_RATE_API_KEY;
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
        return response.data.conversion_rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return 1.0; // Fallback
    }
};

module.exports = { getCurrencyByCountry, getExchangeRate };
