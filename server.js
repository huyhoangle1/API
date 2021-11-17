const {personalSign} = require("eth-sig-util")
const {bufferToHex} = require('ethereumjs-util');
const {recoverPersonalSignature} = require('eth-sig-util')
const express =require("express")
const { Server } = require('http');

var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs");
app.set("views","./views");


var server = require('http').Server(app);
server.listen(3000);

app.post("/sign",(req,res)=>{
    console.log(req.body.privateKey);
    const privateKey1Buffer = Buffer.from(req.body.privateKey, 'hex')
    // const reqBody = JSON.parse(req.body)
    const dataBufferHex = bufferToHex(Buffer.from(req.body.data, 'utf8'));
    const result = personalSign(privateKey1Buffer, { data: dataBufferHex })
    res.send(result)
})

app.post("/recoverSign",(req,res)=>{
    const dataBufferHex = bufferToHex(Buffer.from(req.body.data, 'utf8'));
    const address = recoverPersonalSignature({data: dataBufferHex, sig: req.body.signature})
    res.send(address)
})




app.get("/",(req,res)=>{
    res.send("")
}) 