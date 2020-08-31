var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
const googleTrends = require('google-trends-api');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/


router.get("/",function(req,res,next) {
   
   //const apiUrl = "https://content.guardianapis.com/search?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&section=(sport|business|technology|politics)&show-blocks=all"
//    googleTrends.interestOverTime({keyword: 'Women\'s march'})
//    .then(function(results){
//      //console.log('These results are awesome', results);
//      res=results
//      return res
//    })
//    .catch(function(err){
//      console.error('Oh no there was an error', err);
//    });
    var ans = req.query.term 
    //var ans="coronavirus"
   
   googleTrends.interestOverTime({keyword: ans,startTime: new Date('2019-06-01')})
   .then(data => {
       response = JSON.parse(data)
      res.send({ response });
   })
   .catch(err => {
      res.redirect('/error');
   });
   
});

module.exports = router;