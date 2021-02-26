const fs = require('fs');
const axios = require('axios');

class Searches {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapitalized() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');
        });
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

    async searchWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                }
            });
            const resp = await instance.get();

            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp,
            };
        } catch (error) {
            console.log(error);
        }
    }

    addHistory(place = '') {
        if (this.history.includes(place.toLocaleLowerCase())) return;

        this.history = this.history.splice(0, 5);
        this.history.unshift(place.toLocaleLowerCase());
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;
        const db = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' }));
        this.history = db.history;
    }
}

module.exports = Searches;