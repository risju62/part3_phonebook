const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const persons =
[
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]


app.get('/api/persons', (request, response) =>{
    console.log('Get persons')
    response.json(persons)
})

app.get('/info', (request, response) => {
const count = persons.length
const time = new Date()
const body = '<p> Phonebook has infor for ' +count+' people</p> <p>'+ time + '</p>'
response.send(body )

})

const  PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
