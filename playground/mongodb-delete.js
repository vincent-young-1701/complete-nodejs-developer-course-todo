const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b6a6da618a3b952dbf1e635')
    // }).toArray().then((docs)=> {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // delete many
    // db.collection('Todos').deleteMany({
    //     text:'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    //delete one
    // db.collection('Todos').deleteOne({
    //     text:'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // find one and delete
    db.collection('Todos').findOneAndDelete({
        text:'Eat lunch'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    client.close();
});