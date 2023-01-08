const express = require('express')
const { MongoClient } = require('mongodb')
const app = express();
const port = 5000;
const cors = require('cors');

/* userName: admin 
**** password : YsRZ73Jg8b1aCqEp
*/


/* Middle Ware */
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://admin:YsRZ73Jg8b1aCqEp@cluster0.ckdrjj3.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        client.connect()
        const collection = client.db('ProgrammigExpress').collection('language');

        // post method heare : - 
        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user, 'user recived');
            const result = await collection.insertOne(user);
            console.log(result.insertedId);
            res.send(result);
        })

        // GET Method heare : - 
        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {

    }
}

app.get('/', (req, res) => {
    res.send('CURD Oparetion server is Ready')
});


app.listen(port, () => console.log(`Listen port is Ready ${port}`))
run().catch(console.dir)