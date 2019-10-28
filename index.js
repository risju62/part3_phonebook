const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons =
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

const isDuplicateName =(newName) =>{
  console.log ('Check isDuplicate :',newName)
  return persons.some(person => person.name === newName)
}  

const isDuplicateNumber=(newNumber) =>{
  console.log ('Check isDuplicate :',newNumber)
  return persons.some(person => person.number === newNumber)
}  

const generateId = () =>{
  return Math.floor((Math.random()*100) + 1)
}

app.get('/api/persons', (request, response) =>{
    console.log('Get persons')
    response.json(persons)
})

app.get('/api/persons/:id',(request, response) =>{
  
  const id = Number(request.params.id)
  console.log ("get number for ", {id})
  const person = persons.find(person =>{
    return(person.id === id)
  })
  if (person){
    response.json(person)
  
  }
  else{
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  console.log("delete ",{id})
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons',(request,response) =>{
  const body=request.body
  console.log(body)
  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (isDuplicateName(body.name)){
    return response.status(400).json({
      error: 'name is not unique'
    })
  }

  if (isDuplicateNumber(body.number)){
    return response.status(400).json({
      error: 'number is not unique'
    })

  }


  const person = {
    "name": body.name,
    "number": body.number,
    "id":generateId()
  }
  persons = persons.concat(person)
  response.json(person)
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
