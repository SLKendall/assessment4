let globalID = 2;
const inspiration = require('./db.json')

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    
    getFortune: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A lifetime friend shall soon be made.", "All the troubles you have will pass away very quickly.","Change is happening in your life, so go with the flow!","Take the high road."];
      
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getInspiration: (req,res) => {
        res.status(200).send(inspiration)
    },

    createInspiration: (req,res) => {
        const {quote, imageURL} = req.body;
       
        let newInsp = {
            quote: quote,
            imageURL,
            id: globalID
        }

        inspiration.push(newInsp)
        globalID++
        res.status(200).send(inspiration)
}
}