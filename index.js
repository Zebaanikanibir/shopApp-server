const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = 5002


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('shoplist'))
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4chh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const shopCollection = client.db("shop").collection("shoplist");
  


  app.get('/shop', (req, res) => {

    shopCollection.find()
      .toArray((err, items) => {

        res.send(items)

      })

    })
    app.delete('/:id', (req, res) => {
      // console.log('req',req.params.id)
          shopCollection.deleteOne({ _id: objectId(req.params.id) })
        
          .then(result =>{
            console.log('delete',result)
          })
      
        })
      
  app.post('/addShop', (req, res) => {

    const newEvent = req.body;
    console.log('adding', newEvent)
    shopCollection.insertOne(newEvent)
      .then(result => {

        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })
   
  

  







  

    

    


})







app.get('/', (req, res) => {
  res.send('Hello Nibir')
})










app.listen(process.env.PORT || port)