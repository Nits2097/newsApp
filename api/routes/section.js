var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/

console.log("DONEEONDOENDONEOND");

function getImage(result){
   console.log("here");
   var imgurl;
   
   try{
      var half = result.blocks.main.elements[0].assets 
      imgurl = half[half.length - 1].file;
   }
   catch{
      imgurl = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
   }
   return imgurl;
}

function convertData(res){
   var finalList=[]
   console.log("INSIDE CONVERT DATA");
   //console.log(res.response.results)
   Array.prototype.forEach.call(res.response.results, result => {
      //console.log("DISPLAYING RES");
      //console.log(result);
      var info={};
      info['title']=result.webTitle;
      info['date']=result.webPublicationDate;
      info['img'] = getImage(result);
      //img="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      info['section']=result.sectionId;
      info['desc']=result.blocks.body[0].bodyTextSummary;
      //info['color']=this.getSectionColor(result);
      info['weburl'] = result.webUrl;
      info['id']=result.id;
      finalList.push(info)
   });
   //var finalList = res.response.results.map(getData);  
   console.log("FINALLIST");
   console.log(finalList);
   //return finalList; 
   res.response.results = finalList;
   return res;
}

router.get("/",function(req,res,next) {
    console.log("hereeein sec rionrererererer")
   //console.log(req.query.sec)
   //build api URL with user zip
   const apiUrl = "https://content.guardianapis.com/"+req.query.sec+"?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&show-blocks=all"

   //const apiUrl = "https://content.guardianapis.com/technology?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&show-blocks=all"
   //console.log(apiUrl)
   fetch(apiUrl)
   .then(res => res.json())   
   .then(data => {
      //console.log(data);
      data = convertData(data)
      res.send({ data });
   })
   .catch(err => {
      res.redirect('/error');
   });
});

module.exports = router;