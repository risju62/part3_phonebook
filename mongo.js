
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
   process.exit(1) 
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0-uwi92.mongodb.net/phonebook?retryWrites=true&w=majority `

mongoose.connect(url, {useNewUrlParser:true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person  = mongoose.model('Person', personSchema)
const gName = process.argv[3]
const gNumber = process.argv[4]


if (gName ){

    const person = new Person({
        name: gName,
        number: gNumber,
    })

    person.save().then(result =>{
        console.log('added ',person.name, ' number ',person.number, 'to phonebook');
        mongoose.connection.close();
    })

}
else {
   
    Person.find({}).then(result =>{
        console.log ('phonebook:')
        result.forEach(person =>{
            console.log(person.name," ", person.number)
            mongoose.connection.close()
        })
       
    })
 
}

