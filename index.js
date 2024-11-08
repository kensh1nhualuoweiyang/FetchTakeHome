const express = require("express")
const receiptController = require("./controllers/Receipts")
const app = express()
app.use(express.json())

app.use("/receipts",receiptController)

app.listen(3000, () => {
    console.log(`Server starts at http://localhost:3000`);
});
