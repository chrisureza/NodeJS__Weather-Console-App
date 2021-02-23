require('dotenv').config();

const { inquirerMenu, pause, readInput, citiesList } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
	let opt;
	const searches = new Searches();

	while (opt !== 0) {
		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				const place = await readInput('City: ');
				const cities = await searches.searchCity(place);
				const selectedId = await citiesList(cities);

				const selectedCity = cities.find(city => city.id === selectedId);

				const { name, lat, lng } = selectedCity;
				console.log('\n-----Information-----');
				console.log('City: ', name);
				console.log('Lat: ', lat);
				console.log('Lng: ', lng);
				console.log('Temp: ',);
				console.log('Min: ',);
				console.log('Max: ',);
				break;
			case 2:

				break;
		}

		opt !== 0 && await pause();
	};
};

main();