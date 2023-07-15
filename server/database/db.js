import mongoose from 'mongoose';

const Connection = () =>{
    // const DB_URI= `mongodb://aacrs7969:329f1NjHMkw9GoZx@ac-g9tqkod-shard-00-00.72jlvct.mongodb.net:27017,ac-g9tqkod-shard-00-01.72jlvct.mongodb.net:27017,ac-g9tqkod-shard-00-02.72jlvct.mongodb.net:27017/?ssl=true&replicaSet=atlas-12qdeu-shard-0&authSource=admin&retryWrites=true&w=majority`;
    // const DB_URI = `mongodb://aadityagupta2607:asAS12!@@ac-llra16b-shard-00-00.sytqlkh.mongodb.net:27017,ac-llra16b-shard-00-01.sytqlkh.mongodb.net:27017,ac-llra16b-shard-00-02.sytqlkh.mongodb.net:27017/?ssl=true&replicaSet=atlas-119n5j-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
     const DB_URI = `mongodb://aacrsks:WIfrOII4APPXqxsH@ac-o8jex3b-shard-00-00.fwkmxb0.mongodb.net:27017,ac-o8jex3b-shard-00-01.fwkmxb0.mongodb.net:27017,ac-o8jex3b-shard-00-02.fwkmxb0.mongodb.net:27017/?ssl=true&replicaSet=atlas-by68gr-shard-0&authSource=admin&retryWrites=true&w=majority`;

    // aacrsks;
    //    WIfrOII4APPXqxsH;
    mongodb: try {
      mongoose.connect(DB_URI, { useNewUrlParser: true });
      console.log("Database connected succesfully");
    } catch (error) {
      console.log("error while connecting with database", error.message);
    }
}

export default Connection;

//password for my cloud.mongodb : 329f1NjHMkw9GoZx
//username : aacrs7969