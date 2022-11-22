const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "What is the team manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the team manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the team manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
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
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    });
  }

  function addEngineer() {
    inquirer
		.prompt([
			{
				type: "input",
				name: "engineerName",
				message: "What is the engineer's name?",
                validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
			},
			{
				type: "input",
				name: "engineerId",
				message: "what is the engineer's ID?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a positive number greater than zero.';
                  },
			},
			{
				type: "input",
				name: "engineerEmail",
				message: "what is the engineer's email address?",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a valid email address.';
                  },
			},
			{
				type: "input",
				name: "engineerGithub",
				message: "what is the engineer's git hub username?",
                validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
			}
		])
        .then((answers) => {
            const engineer = new Engineer(
              answers.engineerName,
              answers.engineerId,
              answers.engineerEmail,
              answers.engineerGitHub
            );
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
		});
  }

  function addIntern() {
    inquirer
		.prompt([
			{
				type: "input",
				name: "internName",
				message: "What is the intern's name?",
                validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
			},
			{
				type: "input",
				name: "internId",
				message: "what is the intern's ID?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a positive number greater than zero.';
                  },
			},
			{
				type: "input",
				name: "internEmail",
				message: "what is the intern's email address?",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a valid email address.';
                  },
			},
			{
				type: "input",
				name: "internSchool",
				message: "what is the name of the school the intern is attending?",
                validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
			}
		])
		.then((answers) => {
            const intern = new Intern(
              answers.internName,
              answers.internId,
              answers.internEmail,
              answers.internGitHub
            );
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
		});
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();