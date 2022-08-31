import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();

const app = express();

//routes
app.use(router);

app.listen(8888, () => {
  console.log(`server started at http://localhost:${8888}`);
});

export default app;
