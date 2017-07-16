const Employee = require('./models/Employee.js');
const Invite = require('./models/Invite.js');

const owner = {
  name: 'James Martin'
}

module.exports = () => {
  const employee = new Employee(owner);
  employee.save();
  const invite = Invite.make(employee, 3);
  return invite;
}
