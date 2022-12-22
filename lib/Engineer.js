// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employe
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(id,name,email,github) {
        super(name,id,email);
        this.github=github;
    }
    getGithub()
    {
        return this.github;
    }
    getRole() 
    {
        return 'Engineer';
    }
}

module.exports = Engineer;