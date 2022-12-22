const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "output.html");

const render = require("./lib/htmlRenderer");

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter Manager name:",
    },

    {
        type: "input",
        name: "id",
        message: "Enter the employee id of Manager?",
    },
    {
        type: "input",
        name: "email",
        message: "Enter is the email of Manager?",
    },
    {
        type: "input",
        message: "Enter Manager office number",
        name: "officeNumber",
    },

]
const roleQuestion = [
    {
        type: "list",
        name: "role",
        message: "Add new member or finish?",
        choices: ["Engineer", "Intern", "Finish"],
    }
]
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter name of intern:",
    },

    {
        type: "input",
        name: "id",
        message: "Enter intern's employee Id:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter intern's email",
    },
    {
        type: "input",
        message: "Enter intern's school name:",
        name: "school",
    },
]

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter name of engineer:",
    },

    {
        type: "input",
        name: "id",
        message: "Enter engineer's employee Id:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter engineer's email",
    },
    {
        type: "input",
        message: "Enter engineer's school name:",
        name: "school",
    },
    {
        type: "input",
        message: "Enter Github username of engineer:",
        name: "github",
    },
]
const team = [];
const generateManager = () => {
    inquirer
        .prompt(managerQuestions)
        .then((data) => {

            const manager = new Manager(data.id, data.name, data.email, data.officeNumber);
            team.push(manager);
            selectRole();
        })
        .catch((err) => {
            if (err) {
                throw err;
            }
        });
};
const selectRole = () => {
    inquirer
        .prompt(roleQuestion)
        .then(
            (res) => {
                if (res.role === "Intern") {
                    generateIntern();
                }
                if (res.role === "Engineer") {
                    generateEngineer();
                }
                if (res.role === "Finish") {
                    team.forEach((team) => {
                        console.log(team);
                    });
                    fs.writeFile(outputPath, render(team), (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Your team is successfully created, go to ./dist/output.html!");
                    });
                }
            }).catch((err) => {
                if (err) {
                    throw err;
                }
            });
}
const generateIntern = () => {
    inquirer
        .prompt(internQuestions)
        .then((data) => {

            const intern = new Intern(data.id, data.name, data.email, data.school);
            team.push(intern);
            selectRole();
        })
        .catch((err) => {
            if (err) {
                throw err;
            }
        });
}

const generateEngineer = () => {
    inquirer
        .prompt(engineerQuestions)
        .then((data) => {
            const engineer = new Engineer(data.id, data.name, data.email, data.github);
            team.push(engineer);
            selectRole();
        })
        .catch((err) => {
            if (err) {
                throw err;
            }
        });
}


generateManager();