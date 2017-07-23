const { Employee, Invite } = require('../models');

const owner = {
  name: 'James Martin'
}

module.exports = () => {
  const employee = new Employee(owner);
  employee.save();
  const invite = Invite.make(employee, 3);
  return invite;
}
