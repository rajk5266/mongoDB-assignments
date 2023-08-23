const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email){
       this.name = username;
       this.email = email;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);

    }
    static findById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(user => {
            console.log(user)
            return user
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = User

//find() -> next()  find gives us a cursor so we can proceed to next
// findOne()  here we don't need a cursor as we know we have to find one only.