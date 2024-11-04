const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let tasks = [];

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log("Rendering index view");
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

app.post('/delete-task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.redirect('/');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
