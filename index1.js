const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const customers = [
    { name: 'Cust1', email: 'cust1@cust1.com',phone: 12345678 },
    {  name: 'Cust2', email: 'cust2@cust2.com',phone: 12345678 },
    {  name: 'Cust3', email: 'cust3@cust3.com',phone: 12345678 }
]

app.get('/', (req, res) => {
    res.send('Customer is ABC');
});

app.get ('/api/customers', (req, res) => {
    res.send(customers)
})

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c =>c.id ===parseInt(req.params.id));
    if(!customer) res.status(404).send('The customer with given Id was not found');
    res.send(customer);
});
app.post('/api/customers', (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const customer = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    customers.push(customer);
    res.send(customer);
});

app.put('/api/customers/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404

    const customer = customers.find(c =>c.id ===parseInt(req.params.id));
    if(!customer) res.status(404).send('The customer with given Id was not found');

    //Validate
    //If invalid, return 400-Bad request
    const { error } = validateCustomer(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    customer.name = req.body.name;
    //Return the updated course
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        phone:Joi.number().min(8).required()
    }
    return Joi.validate(customer, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.delete('/api/customers/:id', (req, res) => {
    //Look up to the course
    //Not existing, return 404
    const customer = customers.find(c =>c.id ===parseInt(req.params.id));
    if(!customer) res.status(404).send('The customer with given Id was not found');

    //Delete
    const index = customers.indexOf(customer);
    customers.splice(index,1);
    
    //Res to the client
    res.send(customer);
});