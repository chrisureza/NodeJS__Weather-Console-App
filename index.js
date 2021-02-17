const { inquirerMenu, pause } = require('./helpers/inquirer');

const main = async () => {
    let opt;

    while (opt !== 0) {
        opt = await inquirerMenu();
        console.log({ opt });
        opt !== 0 && await pause();
    };
};

main();