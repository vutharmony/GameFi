import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/getData", async(req, res, next) => {

    const response = await fetch('https://gateway.pinata.cloud/ipfs/QmRygrnqomJRLCNwqwjjGdkQuQh6ZQ9JbGeH4NK3ehDukg');
    const text = await response.text();

    console.log(text);
});

app.post("/pinataData", async(req, res, next) => {
    const cid = req.body.cid;

    if(cid === 'a'){
        res.json('empty')
    }else{
        console.log(cid);
        const data = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`)
        const response = await data.json();
    
        let imgCid = response.image.substr(7, response.image.length);
        console.log(imgCid);
        // const img = await fetch(`https://gateway.pinata.cloud/ipfs/${imgCid}`)
        // const imgData = await img.json();
        
        res.json({data: response})
    }


});

app.get('/check', async (req, res, next) => {

})

app.listen(8000, console.log("Server started"));