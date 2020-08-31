var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/

function getSectionColorNY(result){
    if(result.section==="business"){
        return "#6495ed"
    }
    else if(result.section==="politics"){
        return "#5f9ea0"
    }
    else if(result.section==="world"){
        return "#9C2EFD"
    }
    else if(result.section==="technology"){
        return "#9acd32"
    }
    else if(result.section==="sport"){
        return "#E6AB24"
    }
    else return "#7D7A71"
}


function getImageNY(result){
    var i;
    var imgurl= "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    try{
        var mm = result.multimedia;
        for(i=0;i<mm.length;i++){
            if(mm[i].width>=2000){
                imgurl = mm[i].url;
                return imgurl;
            }
        }
    }
    catch{
        imgurl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
    }
    return imgurl;
}

function convertData(res){
   var finalList=[]
   console.log("INSIDE CONVERT DATA");
    //console.log(res.results[0]);
    const sabArrayKaSaaman = res.results;
   sabArrayKaSaaman.forEach( function(result) {
      //console.log("DISPLAYING backend RES");
      //console.log(result);
      //console.log("HUA DISPLAY KUCH")
      var info={};
      info['title']=result.title;
      info['date']=result.published_date;
      info['img'] = getImageNY(result);
      //info['img']="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      info['section']=result.section;
      info['desc']=result.abstract;
      //info['color']=this.getSectionColorNY(result);
      info['weburl'] = result.url;
      info['id']=result.url;
      finalList.push(info)
   });
   //var finalList = res.response.results.map(getData);  
   //console.log("FINALLIST");
   //console.log(finalList);
   //return finalList; 
   res.results = finalList;
   return res;
}

router.get("/",function(req,res,next) {
    console.log("hereeein sec rionrererererer")
    //const id="politics"
   const apiUrl = "https://api.nytimes.com/svc/topstories/v2/"+req.query.sec+".json?api-key=88dHFcgjN3tt72iEvAQ0NUTjAN11EUGj"

   //const apiUrl = "https://content.guardianapis.com/technology?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&show-blocks=all"
   //console.log(apiUrl)
   fetch(apiUrl)
   .then(res => res.json())   
   .then(data => {
      //console.log(data);
      //convertData(data);
      data = convertData(data)
      res.send({ data });
   })
   .catch(err => {
      res.redirect('/error');
   });
});

module.exports = router;