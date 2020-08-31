var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/


router.get("/",function(req,res,next) {
   
	
   const apiUrl = "https://content.guardianapis.com/search?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&section=(sport|business|technology|politics)&show-blocks=all"

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