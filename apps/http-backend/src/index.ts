import express from "express"
import Router from "../Routes/auth"
const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
  return res.json({
    msg:"Http server health is fine"
  })
})
app.use('/user',Router)


app.listen(8000,() => {
  console.log(`Serve runnning on port http://localhost:8000`);
})