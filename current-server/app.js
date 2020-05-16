const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();


function rowToObject(row){
    return{
        id: row.id,
        airlines: row.airlines,
        flightnumber: row.flightnumber,
        departure: row.departure,
        arrival: row.arrival, 
    };  
}

app.get('/flightnumber/:flightnumber', (request, response) => {
    const query = 'SELECT airlines, flightnumber, departure, arrival, id FROM flight WHERE is_deleted = 0 AND flightnumber = ?';
    const params = [request.params.flightnumber];
    connection.query(query, params,(errors, rows)=>{
        response.send({
            ok: true,
            flights: rows.map(rowToObject),
        });
    });
});

app.get('/flightschedule/:departure/:arrival', (request, response) => {
    const query = 'SELECT airlines, flightnumber, departure, arrival, id FROM flight WHERE is_deleted = 0 AND departure = ? AND arrival = ?';
    const params = [request.params.departure, request.params.arrival];
    connection.query(query, params,(errors, rows)=>{
        response.send({
            ok: true,
            flights: rows.map(rowToObject),
        });
    });
});

app.get('/origin/:departure', (request, response) => {
    const query = 'SELECT airlines, flightnumber, departure, arrival, id FROM flight WHERE is_deleted = 0 AND departure = ?';
    const params = [request.params.departure];
    connection.query(query, params,(errors, rows)=>{
        response.send({
            ok: true,
            flights: rows.map(rowToObject),
        });
    });
});


app.get('/destination/:arrival', (request, response) => {
    const query = 'SELECT airlines, flightnumber, departure, arrival, id FROM flight WHERE is_deleted = 0 AND arrival = ?';
    const params = [request.params.arrival];
    connection.query(query, params,(errors, rows)=>{
        response.send({
            ok: true,
            flights: rows.map(rowToObject),
        });
    });
});


app.post('/flights', (request, response) => {
    const query = 'INSERT INTO flight (airlines, flightnumber, departure, arrival) VALUES (?, ?, ?, ?)';
    const params = [request.body.airlines, request.body.flightnumber, request.body.departure, request.body.arrival];
    connection.query(query, params,(errors, result)=>{
        response.send({
            ok: true,
            id: result.insertId,
        });
    });
});

app.patch('/flights/:id', (request, response) => {
    const query = 'UPDATE flight SET airlines = ?, flightnumber = ?, departure = ?, arrival = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.body.airlines, request.body.flightnumber, request.body.departure, request.body.arrival, request.params.id];
    connection.query(query, params,(errors, result)=>{
        response.send({
            ok: true,
        });
    });
});

app.delete('/flights/:id', (request, response) => {
    const query = 'UPDATE flight SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.params.id];
    connection.query(query, params, (errors, result)=>{
        response.send({
            ok: true,
        });
    });
});

const port = 3442;
app.listen(port, ()=>{
    console.log(`We're live on port ${port}`);
});