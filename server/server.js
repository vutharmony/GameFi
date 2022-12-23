import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.post("/pinataData", async(req, res, next) => {
    const cid = req.body.cid;

    if(cid === 'a'){
        res.json('empty')
    }else{
        console.log(cid);
        const data = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`)
        const response = await data.json();
        
        res.json({data: response})
    }


});


app.listen(8000, console.log("Server started"));