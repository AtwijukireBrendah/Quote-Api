const express=require('express');
const app=express();
const fs =require('fs')

/*
    //Middlware

    // API Endpoints

    /quotes => GET,POST,PATCH,DELETE //Reuest Handlers

    /quotes/:quoteId => GET

    //Model Data

    {
        id:"fggggh",
        text:"The Lord is Good",
    }

*/

//Middleware
app.use(express.json())

// Simple structure
// // app.post('/quotes',(req,res)=>{
// //     res.send('Quote has been successfully added')
// // })

 //endpoints
app.get('/quotes',(req,res)=>{
    //Route handlers/Methods
    fs.readFile('quotes.json',(error,quotes)=>{
        if(quotes){
            res.send(quotes);
        }else{
            res.send('Quotes Not Found');
        }
    })
})

app.post('/quotes',(req,res)=>{
    let newQuote = req.body
    let quotes = [];

    //Get all quotes
    fs.readFile('quotes.json',(error,data)=>{
        if(data){
            const parsedData = JSON.parse(data);
            //Add new quote to quotes array
            quotes=[...parsedData,newQuote];
            //update quotes.json file
    fs.writeFile('quotes.json',JSON.stringify(quotes,null,1),(error)=>{
        if(error){
            res.send('Failed to add quote')
        }else{
            res.send('Successfully added a new quote')
        }
    })
        }else{
            console.log('File Not Found')
        }
    })

    
})

// Get Individual quote by id
app.get('/quotes/:quoteId',(req,res)=>{
    let id =req.params.quoteId
    let quotes =[];
    fs.readFile('quotes.json',(error,data)=>{
        if(data){
            quotes=JSON.parse(data);
            let quoteOfId ='';
            //looping to a quote of given id// filter
            for(let quote of quotes){
                if(quote.id ===id){
                    quoteOfId=quote
                }
            }
            if(quoteOfId){
                res.send(quoteOfId)
            }else{
                res.send('Quote Not Found')
            }
        }else{
            res.send('Quote Not found')
        }
    })
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
}
)
