const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sagargowda1329:Yuvaratna24@cluster0.vwlqvdp.mongodb.net/goFood?retryWrites=true&w=majority'

const mongoDB = () => {
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect(mongoURI, await console.log("Connected to mongo `Successful"));
        const fetched_data = await mongoose.connection.db.collection("fooditems");
        const data = await fetched_data.find({}).toArray();
        const foodCategory=await mongoose.connection.db.collection("foodCategory");
        const catdata=await foodCategory.find({}).toArray();
       global.food_items=data;
       global.foodCategory=catdata;
       
//console.log(global.foodCategory) 
    }
}


module.exports = mongoDB;