import {MongoClient} from "mongodb";
const connectionString=process.env.DEV_URI || "" ;
const client=new MongoClient(connectionString);
let conn;
try{
    conn=await client.connect();

}catch(e){
    console.error(e);
}
let db=conn.db("Rosemary-and-Thyme")
export default db;