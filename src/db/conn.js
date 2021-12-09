const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://aroramahima89:Mahima2000@cluster0.kq44i.mongodb.net/BankingSystem?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})