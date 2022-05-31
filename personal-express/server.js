console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express()
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://Will:password1234@cluster2.vhhzs.mongodb.net/Cluster2?retryWrites=true&w=majority'



MongoClient.connect(uri, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        // ... do something 
        app.set('view engine', 'ejs')  
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))
        app.get('/', (req, res) => {
            // do something here
            // res.sendFile(__dirname + '/index.html')
            const cursor = db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch()
            // res.render('index.ejs', {})
            console.log(cursor)
            // Note: __dirname is the current directory you're in. Try logging it and see what you get!
            // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
        })
        app.post('/quotes', (req, res) => {

            // console.log('Hellooooooooooooooooo!')
            // console.log(req.body)
            quotesCollection.insertOne(req.body)
                .then(result => {
                    // console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { quote: req.body.ogWord },
                {
                  $set: {
                    quote: req.body.newWord
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
            console.log(req.body)
        })
        app.delete('/quotes', (req, res) => {
            // Handle delete event here
            quotesCollection.deleteOne(
                { name : req.body.name},
              )
                .then(result => {
                if(result.deletedCount === 0){
                    return res.json('No quote te delete')
                }
                res.json(`Deleted Darth Vader's quote`)
            })
                .catch(error => console.error(error))
          })
        app.listen(3001, function () {
            console.log('listening on 3001')
        })

    })
    .catch(error => console.error(error))

// Make sure you place body-parser before your CRUD handlers!


// app.get(endpoint, callback)

// We normally abbreviate `request` to `req` and `response` to `res`.

function translatePigLatin(str) {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let newStr = "";

    if (vowels.indexOf(str[0]) > -1) {
        newStr = str + "way";
        return newStr;
    } else {
        let firstMatch = str.match(/[aeiou]/g) || 0;
        let vowel = str.indexOf(firstMatch[0]);
        newStr = str.substring(vowel) + str.substring(0, vowel) + "ay";
        return newStr;
    }
}