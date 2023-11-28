const express = require('express')
const app = express()

app.use(express.json())

app.post('/', (req,res)=>{
  if(!req.body){
    res.status(400).send("Bad request")
  }
  else{
    let payLoad = req.body.str
    let regexPattern = /^\s*(\w+\s+){7}\w+\s*$/
    let regexResult = regexPattern.test(payLoad)
    if(regexResult){
      res.status(200).send("OK")   
    }
    else{
      res.status(400).send("Not Acceptable")
    }
  }
})

app.listen(4000, ()=>{console.log("Server started at 4000")})