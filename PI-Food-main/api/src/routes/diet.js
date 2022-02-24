const axios = require("axios");
const express = require("express");
const router = express.Router();
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getDietApiInfo = async () => {
  const dietApiUrlSearch = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
  );
  const dietApiInfo = await dietApiUrlSearch.data.results.map((e) => {
    return {
      name: e.title,
      vegetarian: e.vegetarian,
      vegan: e.vegan,
      glutenFree: e.glutenFree,
      dairyFree: e.dairyFree,
      image: e.image,
      idApi: e.id,
      //  Spoonacularscore: e.spoonacularScore,
      //  healthScore: e.healthScore,
      //   types: e.dishTypes?.map(element => element),
      diets: e.diets?.map((element) => element),
      summary: e.summary.replace(/<[^>]*>?/g, ''),
      //   steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
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
  console.log(result);

  for (var i = 0; i < result.length; i++) {
      const temp = await Diet.create({
          name: result[i]
      })
  }

  res.send(result)

  console.log(result);
  res.status(200).send(result);
});

//  getDietApiInfo();
module.exports = router;
