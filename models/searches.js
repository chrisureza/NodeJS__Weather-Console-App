const axios = require('axios');

class Searches {
    history = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {
        // Read file if exists
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en',
        };
    }

    async searchCity(city = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (e) {
            console.log('catch');
            return [];
        }
    }
}

module.exports = Searches;