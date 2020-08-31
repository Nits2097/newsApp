var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');


/*router.get("/", function(req, res, next) {
    res.send("API is working properly");
});*/

function getSectionColor(sec){
   console.log("IN GET SECTION COLOR")
   if(sec==="business" || sec==="Business"){
      return "#6495ed"
   }
   else if(sec==="politics" || sec==="Politics"){
      return "#5f9ea0"
   }
   else if(sec==="world" ||  sec==="World"){
      return "#9C2EFD"
   }
   else if(sec==="technology" || sec==="Technology"){
      return "#9acd32"
   }
   else if(sec==="sport" || sec==="sports" || sec==="Sport" || sec==="Sports"){
      return "#E6AB24"
   }
   else {
      return "#7D7A71"
   }
   
}

function getImageNY(result){
   var i;
   var imgurl= "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
   try{
      var mm = result.multimedia;
      for(i=0;i<mm.length;i++){
         if(mm[i].width>=2000){
            imgurl = "https://www.nytimes.com/" + mm[i].url;
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
   console.log("INSIDE CONVERT DATA");
    //console.log(res.results[0]);this.state.data.data.response.content.webTitle
    const result = res.response.content;
    
   // sabArrayKaSaaman.forEach( function(result) {
   //    //console.log("DISPLAYING backend RES");
   //    //console.log(result);
   //    //console.log("HUA DISPLAY KUCH")
      var info={};
      info['title']=result.webTitle;
      info['date']=result.webPublicationDate;
      info['img'] = getImage(result);
      //info['img']="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      info['desc']=result.blocks.body[0].bodyTextSummary;
      info['color']= getSectionColor(result.sectionId);
      info['weburl'] = result.webUrl;
      info['section'] = result.sectionId;

   //    finalList.push(info)
   // });
   //var finalList = res.response.results.map(getData);  
   console.log("FINALLIST");
   console.log(info);
   //return finalList; 
   res.response = info;
   return res;
}

function getImage(result){
   console.log("here");
   var imgurl;
   
   try{
      var asset = result.blocks.main.elements[0].assets;
      imgurl = asset[asset.length-1].file;
   }
   catch{
      imgurl = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
   }
   return imgurl;
}

function convertNyData(res){
   console.log("INSIDE CONVERT DATA");
    //console.log(res.results[0]);this.state.data.data.response.content.webTitle
    const result = res.response.docs[0];
    
      var info={};
      info['title']=result.headline.main;
      info['date']=result.pub_date;
      info['img'] = getImageNY(result);
      //info['img']="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      info['desc']=result.abstract;
      info['color']=getSectionColor(result.section_name);
      info['weburl'] = result.web_url;
      info['section'] = result.section_name;
   //    finalList.push(info)
   // });
   //var finalList = res.response.results.map(getData);  
   console.log("FINALLIST");
   console.log(info);
   //return finalList; 
   res.response = info;
   return res;
}


router.get("/",function(req,res,next) {
    console.log("hereeerererererer")
    console.log("OKOKOKOKOOKOKOKOKO")
    
    //console.log(typeof (req.query.articleId))
   //build api URL with user zip
   
	if((req.query.article_id).includes("nytimes"))
      //req.query.article_id = 
      var apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + req.query.article_id+ '")&api-key=88dHFcgjN3tt72iEvAQ0NUTjAN11EUGj'
   

   else
      var apiUrl = "https://content.guardianapis.com/"   + req.query.article_id +  "?api-key=f55b3b2c-d8e1-4382-8315-e4c26ec12b69&show-blocks=all"
   
   console.log(apiUrl)
   console.log("api url upar hai")
   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
      if(apiUrl.includes("nytimes")){
         data=convertNyData(data);
      }
      else{
         data = convertData(data);
      }
      console.log("converted")
      console.log(data)
      res.send({ data });
   })
   .catch(err => {
      res.redirect('/error');
   });
});

module.exports = router;