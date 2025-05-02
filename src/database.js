const { MongoClient } = require("mongodb");

const url = "mongodb+srv://poshanak47:jlXPh2iTQMvAHm1L@techbuddy.wphdu.mongodb.net/?retryWrites=true&w=majority&appName=TechBuddy"

const client = new MongoClient(url);

const dbName = "Test"

async function main(){
    await client.connect();
    console.log("Connected sussessfully");
    const db = client.db(dbName);
    const collection = db.collection("User");
    
    const data = {
        firstName: "Sudha",
        lastName: "Paikra",
        city: "Korba",
        mobile: "78364876868"
    }
    //Read
    const findResult = await collection.find({}).toArray();
    console.log(findResult);

    //write
    const inserResult = await collection.insertMany([data]);
    console.log("inserted data: ",inserResult)
    return "Done";
}

main().then(console.log).catch(console.error).finally(()=>client.close);