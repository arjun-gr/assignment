const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path')

app.get("/", async (req, res) => {
  // fetching the data from the url
  let result = await fetch("https://catfact.ninja/breeds");
  let resultToObject = await result.json();

  // converting the object to string so it can be written in the text file
  // The response that is being written in the text file is the initial response of the url
  let jsonString = JSON.stringify(resultToObject)
  fs.writeFile(path.join(__dirname + "/text.txt"),jsonString, (err) => {
    if (err) {
      console.log("Error writing file to text file");
    }
    console.log("Data written in text.txt");
  });
  
  // num of pages 
  let numOfPages = resultToObject.last_page;
  console.log(`No of pages ${numOfPages}`);

  // Getting data from all the 4 pages in an array
  let allPageData = [];
  for (let i = 1; i <= numOfPages; i++) {
    let dataFromPage = await fetch(`http://catfact.ninja/breeds?page=${i}`);
    let dataResultObject = await dataFromPage.json();
    allPageData.push(...dataResultObject.data);
  }
  
  // making object to present data as per requirement
  let obj = {};
  // Looping through array to format it as requirement
  allPageData.forEach((elem)=>{
    obj[elem.country] = [{
      breed:elem.breed,
      origin:elem.origin,
      coat:elem.coat,
      pattern:elem.pattern
    }]

  })

  res.status(200).send(obj)
});

app.listen(3000, ()=>{console.log("Server started at 3000")});
