const axios = require('axios');

const API_KEY = 'IWAfAh-7_8a9esJQ7Lk2Xg';
const BASE_URL = 'https://student-751753787357174933.myfreshworks.com/';

const createContact = async (contact) => {
    try {
        const response = await axios.post(
            `${BASE_URL}contacts`,
            contact,
            {
                headers: {
                    'Authorization': `Token token=${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getContact = async (contactId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}contacts/${contactId}`,
            {
                headers: {
                    'Authorization': `Token token=${API_KEY}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateContact = async (contactId, data) => {
    try {
        const response = await axios.put(
            `${BASE_URL}contacts/${contactId}`,
            data,
            {
                headers: {
                    'Authorization': `Token token=${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteContact = async (contactId) => {
    try {
        await axios.delete(
            `${BASE_URL}contacts/${contactId}`,
            {
                headers: {
                    'Authorization': `Token token=${API_KEY}`
                }
            }
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact
};
