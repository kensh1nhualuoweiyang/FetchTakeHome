const express = require("express")
const { v4: uuidv4 } = require("uuid");

const router = express.Router()
const pointMap ={}


const processRecepit = async(req,res) =>{
    try{
        //Extract data info
        const data = req.body
        let point = 0
        const id = uuidv4()
        const retail = data.retailer.trim();
        const total = Number(data.total.trim())
        const purchaseDate = Number(data.purchaseDate.split("-")[2])
        const purchaseTime = Number(data.purchaseTime.replace(":",""))

        //Check retail title for point
        for (let char of retail) {
            const code = char.charCodeAt(0);
            if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122))
                point+=1 
        }
    
        //Check point gathered from total 
        point += total % 1 == 0 ? 50 : 0
        point += total % .25 == 0? 25 : 0


        //Check point gathered from items of the receipt
        point += 5 * (Math.floor(data.items.length/2))
        for(const item of data.items){
            const description = item.shortDescription.trim()
            const price = Number(item.price)
            if(description.length % 3 == 0)
                point += Math.ceil(price * 0.2)
        }
      
      
        //Check point gathered from datetime of purchase
        point += purchaseDate % 2 == 0? 0 : 6
        point += purchaseTime > 1400 && purchaseTime < 1600 ? 10 : 0


        //Map the point and return
        pointMap[id] = point

        res.json({"id":id})
    }
    catch(e){
        res.status(500).json({message: "Error Processing Data, Please Check Data Format"})
    }

}

const getPoints = async(req,res) =>{
    const {id} = req.params
    if(id in pointMap)
        res.json({"points": pointMap[id]})
    else
        res.status(500).json({message: "ID not found in session"})
       
}


router.post("/process",processRecepit)
router.get("/:id/points",getPoints)

module.exports = router