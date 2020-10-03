const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://monkey:${password}@cluster0.lfa3q.mongodb.net/cli-db?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const schema = new mongoose.Schema({
    name: String,
    number: Number
})
const Person = mongoose.model('Person', schema)

if (process.argv.length === 3) {
    // Retrieve from database
    Person.find({}).then(people => {
        console.log('phonebook:')
        people.forEach(p => console.log(`${p.name} ${p.number}`))
        mongoose.connection.close()
    })
} else if (process.argv.length > 3 && process.argv.length <= 5) {
    // save data to database
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}