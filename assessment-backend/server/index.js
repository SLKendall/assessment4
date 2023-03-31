const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getCompliment, getFortune, getInspiration, addInspiration, deleteInspiration} = require('./controller')

app.get("/api/compliment", getCompliment)

app.get("/api/fortune", getFortune)

app.get("/api/inspiration", getInspiration)

app.post("/api/inspiration", addInspiration)

app.delete("/api/inspiration/:id", deleteInspiration)

app.listen(4000, () => console.log("Server running on 4000"))
