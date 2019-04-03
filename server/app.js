import express from "express";
import router from "./routes/index";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);


const PORT = process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}...`);
});

export default app;