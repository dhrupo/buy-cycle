const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
const port = process.env.PORT || 4000;

require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbv6w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("buyCycle").collection("bicycles");
  const ordersCollection = client.db("buyCycle").collection("orders");

  console.log('database connected');

  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(error => console.log(error))
  });

  app.get('/products', (req, res) => {
    productsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.delete('/productdelete/:id', (req, res) => {
    productsCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
      .catch(error => console.log(error));
  })

  // app.get('/product/:id', (req, res) => {
  //   ordersCollection.find({ key: req.params.key })
  //     .toArray((err, documents) => {
  //       res.send(documents[0]);
  //     })
  // })

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(error => console.log(error))
  });

  app.get('/orders', (req, res) => {
    ordersCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.delete('/orderdelete/:id', (req, res) => {
    ordersCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
      .catch(error => console.log(error));
  })

  app.get('/order', (req, res) => {
    ordersCollection.find({ $or: [{ 'userName': req.query.name }, { 'userEmail': req.query.name }] })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  // client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})