const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Paul',  // Change to your MySQL username
    password: '7523',  // Change to your MySQL password
    database: 'taschenrechner'  // Change to your database name
});

connection.connect();

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to save calculations
app.post('/save-calculation', (req, res) => {
    const { expression, result } = req.body;
    const query = 'INSERT INTO CalculationHistory (expression, result) VALUES (?, ?)';
    
    connection.query(query, [expression, result], (error, results, fields) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send({ id: results.insertId });
        })
});

// Endpoint to fetch last 10 calculations
app.get('/get-history', (req, res) => {
    const query = 'SELECT expression, result FROM CalculationHistory ORDER BY created_at DESC LIMIT 10';
    connection.query(query, (error, results, fields) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
