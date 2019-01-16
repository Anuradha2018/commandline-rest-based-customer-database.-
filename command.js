#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
  addCustomer,
  findCustomer,
  listCustomers
} = require('./index');

// Customer Questions
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Customer Name'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer Email Address'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer Phone Number'
  }
];

program 
  .version('1.0.0')
  .description('Customer Management System')
// Add Command
 program
   .command('cust new <name> <email> <phone>')
   .alias('a')
   .description('Add a customer')
   .action((name, email, phone) => {
     addCustomer({name, email, phone});
   });

/*
program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {
    prompt(questions).then(answers => addCustomer(answers));
  });*/

// Find Command
program
  .command('cust search <name>')
  .alias('s')
  .description('Search a customer')
  .action(name => findCustomer(name));

// List Command
program
  .command('cust list')
  .alias('l')
  .description('List all customers')
  .action(() => listCustomers());

program.parse(process.argv);