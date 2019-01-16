const mongoose = require('mongoose');

/*mongoose.Promise = global.Promise;// mapping global promise
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
  useMongoClient: true
});*/
const uri = require('./configs').URI;
mongoose
	.connect(uri, { useNewUrlParser: true})
	.then(() => console.log("Connected to MongoDB!"))
	.catch(err => console.log(err));
const Customer = require('./models/customer');

// Create Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
      console.info('New Customer Added');
      db.close();
    });
  }
  
  // Search Customer
  const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({name: search})
      .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        db.close();
      });
  }

  // List Customers
const listCustomers = () => {
    Customer.find()
      .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers`);
        db.close();
      });
  }

  module.exports = {
    addCustomer,
    findCustomer,
    listCustomers
  }
  