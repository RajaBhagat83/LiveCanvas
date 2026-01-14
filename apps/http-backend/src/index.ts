import express from "express"

const app = express();


app.get("/health",(req,res)=>{
  return res.json({
    msg:"Http server health is fine"
  })
})

app.listen(8000,() => {
  console.log(`Serve runnning on port http://localhost:8000`);
})