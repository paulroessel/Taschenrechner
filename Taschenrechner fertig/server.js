const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  password: '7523',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to save calculations
app.post('/save-calculation', (req, res) => {
    const { expression, result } = req.body;
    const query = 'INSERT INTO CalculationHistory (expression, result) VALUES ($1, $2)';
    pool.query(query, [expression, result], (error, results) => {
        if (error) {
            console.error('Error saving calculation:', error);
            return res.status(500).send(error);
        }
        console.log('Calculation saved:', expression, result);
        res.status(200).send({ id: results.insertId });
    });
});

// Endpoint to fetch last 10 calculations
app.get('/get-history', (req, res) => {
    const query = 'SELECT expression, result FROM CalculationHistory ORDER BY created_at DESC LIMIT 10';
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching history:', error);
            return res.status(500).send(error);
        }
        console.log('Fetched history:', results.rows);
        res.status(200).send(results.rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
