const inquirer = require("inquirer");
const fs = require("fs");
const generateCards = require("./src/page-template");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");



// array for different class
const managerArray = [];
const engineerArray = [];
const internArray = [];



// creating manager
async function createManager() {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "managerName",
				message: "What is the manager's name?"
			},
			{
				type: "input",
				name: "managerId",
				message: "What is the manager's employee number?"
			},
			{
				type: "input",
				name: "managerEmail",
				message: "What is the manager's email address?"
			},
			{
				type: "input",
				name: "managerPhone",
				message: "What is the office number for the manager?"
			}
		])

		.then(function({ managerName, managerId, managerEmail, managerPhone }) {
			const manager = new Manager(
				managerName,
				managerId,
				managerEmail,
				managerPhone
			);
			managerArray.push(manager);
			createTeam();
		});
}

createManager();


// prompt for addition team members and choosing which prompts based on answers
function createTeam() {
	return inquirer
		.prompt([
			{
				type: "list",
				name: "teamMember",
				message: "Would you like to add an engineer or intern?",
				choices: [
					"Engineer",
					"Intern",
					"Done"
				]
			}
    ])
		.then(answer => {
			switch (answer.teamMember) {
				case "Engineer":
					createEngineer();
					break;
				case "Intern":
					createIntern();
					break;
				default:
					generateCards(managerArray, engineerArray, internArray);
			}
		});
}

// create engineer
function createEngineer() {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "engineerName",
				message: "What is the engineer's name?"
			},
			{
				type: "input",
				name: "engineerId",
				message: "what is the engineer's employee number?"
			},
			{
				type: "input",
				name: "engineerEmail",
				message: "what is the engineer's email address?"
			},
			{
				type: "input",
				name: "engineerGithub",
				message: "what is the engineer's git hub username?"
			}
		])
		.then(function({
			engineerName,
			engineerId,
			engineerEmail,
			engineerGithub
		}) {
			const engineer = new Engineer(
				engineerName,
				engineerId,
				engineerEmail,
				engineerGithub
			);
			engineerArray.push(engineer);
			createTeam();
		});
}


// creating intern
function createIntern() {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "internName",
				message: "What is the intern's name?"
			},
			{
				type: "input",
				name: "internId",
				message: "what is the intern's employee number?"
			},
			{
				type: "input",
				name: "internEmail",
				message: "what is the intern's email address?"
			},
			{
				type: "input",
				name: "internSchool",
				message: "what is the name of the school the intern is attending?"
			}
		])
		.then(function({ internName, internId, internEmail, internSchool }) {
			const intern = new Intern(
				internName,
				internId,
				internEmail,
				internSchool
			);
			internArray.push(intern);
			createTeam();
		});
}



module.exports = createManager