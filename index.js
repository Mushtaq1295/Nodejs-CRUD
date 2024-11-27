import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let userData = [];
let nextId = 1;


//create data
app.post('/teas',(req,res) =>{
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    userData.push(newTea);
    res.status(201).send(newTea);
})

//get data
app.get('/teas',(req,res) =>{
    res.status(200)
    res.send(userData);
}) 

//get data with id
app.get('/teas/:id',(req,res) =>{
    const sample = userData.find(t => t.id === parseInt(req.params.id))

    if(!sample){
       return res.status(404).send({message: 'Not found'});
    }
    res.status(200).send(sample);
})

//update data
app.put('/teas/:id',(req,res) =>{
    const sampleUpdate = req.params.id
    const sample = userData.find(t => t.id === parseInt(req.params.id))
    if(!sample){
        return res.status(404).send({message: 'Not found'});
     }
     const {name, price} = req.body
     sample.name = name
     sample.price = price
     res.status(200).send(sampleUpdate)
})

//delete data using id

app.delete('/teas/:id',(req,res) =>{
    const index = userData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send({message: 'Not found'});
    }
    userData.splice(index,1);
    return res.status(200).send({message: 'Deleted'});


})

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})
