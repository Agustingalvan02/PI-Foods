const axios = require("axios");
const express = require("express");
const router = express.Router();
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getDietApiInfo = async () => {
  const dietApiUrlSearch = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const dietApiInfo = await dietApiUrlSearch.data.results.map((e) => {
    return {
      diets: e.diets?.map((element) => element),
      summary: e.summary.replace(/<[^>]*>?/g, ''),
      
    };
  });
  //  console.log(dietApiInfo);
  return dietApiInfo;
};

router.get("/", async (req, res) => {
  const dietApiUrlSearch = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const dietApiInfo = await dietApiUrlSearch.data.results.map((e) => {
    return {
      diets: e.diets?.map((element) => element),
    };
  });
  const dietasF=function findDiet() {
      var dietsFind = [];
    for (let i = 0; i < dietApiInfo.length; i++) {
       dietsFind.push(dietApiInfo[i].diets);
    }
   
    return dietsFind;

  }
 dietasF();
  function join(arr) {
    var newArray = []
    for(var i = 0; i < arr.length; i++){
    newArray = newArray.concat(arr[i])
    }
    return newArray
  }
 
  join(dietasF)
 
  var DietFinalFilter = join(dietasF())

  let result = DietFinalFilter.filter((item, index) => {
      return DietFinalFilter.indexOf(item) === index;
  })
  

  for (var i = 0; i < result.length; i++) {
      const temp = await Diet.findOrCreate({
         where:{name: result[i]} 
      })
  }

  
 const dietasDb= await Diet.findAll()
  
  res.status(200).send(dietasDb);
});

//  getDietApiInfo();
module.exports = router;
