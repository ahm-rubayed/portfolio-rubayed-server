const express = require("express")
const app = express()
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()   

const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://rubayed:<password>@cluster0.kjjr1js.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', async (req, res) => {
    res.send('Rubayed Portfolio server is running');
})

app.listen(port, () => console.log(`Portfolio running ${port}`))