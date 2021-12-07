const express=require("express");
const app=express();
const path=require("path");
const Customer=require("./models/customer");
const History=require("./models/schema");
const hbs=require("hbs");
require("./db/conn");
const port=process.env.PORT || 8000;
app.use(express.json());

//setting path
const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");
app.use(express.static(staticpath));

app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);


app.get("/",(req,res)=>{
  res.render("index");
})
app.post("/",(req,res)=>{
   res.render("index");
});

app.get("/viewCustomer",async (req,res)=>{
    try{
        const r=await Customer.find();
        let arr=[];
        for(let i=0;i<r.length;i++){
         arr.push(r[i]);
        }
       res.render("viewCustomer",{
          customer : arr
       });
      }
      catch(err){
        console.log(err);
        res.send("No data found!!!");
      }
})

app.get("/transHistory",async(req,res)=>{
   try{
      const h=await History.find();
      let a=[];
      for(let i=0;i<h.length;i++){
       a.push(h[i]);
      }
      res.render("transHistory",{
         history:a
       });
   }
   catch(err){
      console.log(err);
      res.send(err);
   }
  
})

app.get("/createAccount",(req,res)=>{
   res.render("createAccount");
})

app.post("/createAccount",(req,res)=>{
   const name=req.body.name;
   const email=req.body.email;
   const amount=req.body.amount;

   const account=new Customer({
      name:name,
      email:email,
      amount:amount
   })
   account.save();
})

app.get("/transaction",async(req,res)=>{
   try{
      const r=await Customer.find();
      let arr=[];
      for(let i=0;i<r.length;i++){
       arr.push(r[i]);
      }
     res.render("transaction",{
        customer : arr
     });
    }
    catch(err){
      console.log(err);
      res.send("No data found!!!");
    }
})

app.post("/transaction",async(req,res)=>{
   try{
      let sender=req.body.sender;
      let receiver=req.body. receiver;
      let amount=Number(req.body.amount);

      let a1=await Customer.find({name:sender});
      let a2=await Customer.find({name:receiver});

         let x=a1[0].currentbalance-amount;
         let y=a2[0].currentbalance+amount;
   
      const r=await Customer.updateOne({name:sender},{$set:{currentbalance:x}});
     const s=await Customer.updateOne({name:receiver},{$set:{currentbalance:y}}); 

     const list=new History({
        sender:sender,
        receiver:receiver,
        amount:amount
     })

      list.save();       
      res.render("success");  
   }
   catch(err){
    res.render("failure");
   }
}) 

app.listen(port,()=>{
    console.log(`listening to port no ${port}`);
})