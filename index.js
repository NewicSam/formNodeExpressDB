/* Server Node.js */
const express = require('express');
const { json } = require('express/lib/response');
const Datastore = require('nedb');


const app = express();
const database = new Datastore('database.db');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting server at ${ port }`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

database.loadDatabase();




/* Routes */
app.get('/api', (request, response) => {
 
    database.find({}, (err, data) => {

        if (err) {
            response.end();
            return; 
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    response.json(data);

});
