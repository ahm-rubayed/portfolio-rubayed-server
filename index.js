const express = require("express")
const app = express()
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()   

const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjjr1js.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const projectsCollection = client.db("portfolio").collection("projects")

        app.get("/projects", async (req, res) => {
            const query = {};
            const projects = await projectsCollection.find(query).toArray();
            res.send(projects);
          });
      
          app.get("/projects/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
          });
    }
    finally {

    }
}
run().catch((err) => console.log(err)) 

app.get('/', async (req, res) => {
    res.send('Rubayed Portfolio server is running');
})

app.listen(port, () => console.log(`Portfolio running ${port}`))