const fetch = require('node-fetch');
const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./server/logger');
const test = require('./test');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());

console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.use(logger);
test.print();

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
];

app.get('/', (req, res) => {
    res.send('Hello world!!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id.toString() === req.params.id);
    if (!course) {
        return res.status(404).send('Course not found');
    } else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id.toString() === req.params.id);
    if (!course) return res.status(404).send('Course not found');

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id.toString() === req.params.id);
    if (!course) res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});