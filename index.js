const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
	let opt;
	const searches = new Searches();

	while (opt !== 0) {
		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				const place = await readInput('City: ');
				console.log(place);

				console.log('\n-----Information-----');
				console.log('City: ',);
				console.log('Lat: ',);
				console.log('Lng: ',);
				console.log('Temp: ',);
				console.log('Min: ',);
				break;
			case 2:

				break;
		}

		opt !== 0 && await pause();
	};
};

main();