var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/


router.get("/",function(req,res,next) {
   
	
    const apiUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=88dHFcgjN3tt72iEvAQ0NUTjAN11EUGj"

   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
      res.send({ data });
   })
   .catch(err => {
      res.redirect('/error');
   });
});

module.exports = router;