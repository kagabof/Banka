import express from "express";
import bodyParser from "body-parser";
import transactionRouter from "./routes/transactionRouters";
import userRouter from "./routes/userRouters";
import accountRouter from "./routes/accountRouters";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(transactionRouter);
app.use(userRouter);
app.use(accountRouter)



const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}...`);
});

export default app;