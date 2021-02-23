const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What you want to do?',
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Search city`
			},
			{
				value: 2,
				name: `${'2.'.green} History`
			},
			{
				value: 0,
				name: `${'0.'.green} Exit`
			},
		]
	}
];

const inquirerMenu = async () => {
	console.clear();
	console.log('============================='.green);
	console.log('      Select an option'.white);
	console.log('=============================\n'.green);

	const { option } = await inquirer.prompt(questions);

	return Number.parseInt(option);
};

const pause = async () => {
	const inputQuestion = [
		{
			type: 'input',
			name: 'enter',
			message: `Perss ${'ENTER'.green} to continue`

		}
	];
	console.log('\n');
	await inquirer.prompt(inputQuestion);
};

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				return value.length ? true : 'please type a value';
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const citiesList = async (places = []) => {
	const choices = places.map((place, index) => {
		const { id, name } = place;
		const placeIndex = `${index + 1}.`.green;
		return {
			value: id,
			name: `${placeIndex} ${name}`
		};
	});
	choices.unshift({
		value: '0',
		name: '0. '.green + 'Cancel'
	});
	const { id } = await inquirer.prompt({
		type: 'list',
		name: 'id',
		message: 'Select place: ',
		choices
	});
	return id;
};

// const tasksListToComplete = async (tasks = []) => {
// 	const choices = tasks.map((task, index) => {
// 		const { id, desc } = task;
// 		const taskIndex = `${index + 1}.`.green;
// 		return {
// 			value: id,
// 			name: `${taskIndex} ${desc}`,
// 			checked: (task.completedAt),
// 		};
// 	});
// 	const { ids } = await inquirer.prompt({
// 		type: 'checkbox',
// 		name: 'ids',
// 		message: 'Select the task(s) to complete: ',
// 		choices
// 	});
// 	return ids;
// };

const confirm = async (message) => {
	const question = {
		type: 'confirm',
		name: 'ok',
		message,
	};

	const { ok } = await inquirer.prompt(question);
	return ok;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	citiesList,
	confirm
};