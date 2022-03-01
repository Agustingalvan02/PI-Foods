const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const router = Router();

const getRecipeApiInfo = async () => {
  const apiUrlSearch = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrlSearch.data.results.map((e) => {
    return {
      name: e.title,
      vegetarian: e.vegetarian,
      vegan: e.vegan,
      glutenFree: e.glutenFree,
      dairyFree: e.dairyFree,
      image: e.image,
      id: e.id,
      Spoonacularscore: e.spoonacularScore,
      healthScore: e.healthScore,
      types: e.dishTypes?.map((element) => element),
      diets: e.diets?.map((element) => element) + " ",
      summary: e.summary.replace(/<[^>]*>?/g, ""),
      steps:
        e.analyzedInstructions[0] && e.analyzedInstructions[0].analyzedInstructions
          ? e.analyzedInstructions[0].analyzedInstructions.map((item) => item.analyzedInstructions).join(" \n")
          : "",
    };
  });

  //    console.log(apiInfo);
  return apiInfo;
};
//   getRecipeApiInfo();
const getDBinfo = async () => {
  const dataDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const responseDb = await dataDb.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      summary: recipe.summary,
      score: recipe.score,
      healthScore: recipe.healthScore,
      image: recipe.image,
      steps: recipe.steps,
      diets: recipe.diets?.map((diet) => diet.name),
    };
  });
  return responseDb;
};

const getDbApiInfo = async () => {
  const apiInfo = await getRecipeApiInfo();
  const dbinfo = await getDBinfo();
  const allInfo = apiInfo.concat(dbinfo);
  return allInfo;
};

const getNameByApi = async (name) => {
  const nameAxiosApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true&number=100`
  );
  const resName = await nameAxiosApi.data.results.map((r) => {
    return {
      name: r.title,
      vegetarian: r.vegetarian,
      vegan: r.vegan,
      glutenFree: r.glutenFree,
      dairyFree: r.dairyFree,
      image: r.image,
      id: r.id,
      spoonacularScore: r.spoonacularScore,
      healthScore: r.healthScore,
      types: r.dishTypes?.map((element) => element),
      diets: r.diets?.map((element) => element),
      summary: r.summary,
      steps:
        r.analyzedInstructions[0] && r.analyzedInstructions[0].analyzedInstructions
          ? r.analyzedInstructions[0].analyzedInstructions.map((item) => item.step).join(" \n")
          : "",
    };
  });
  //   console.log(resName);
  return resName;
};
// getNameByApi('chicken');
const getNamebyDB = async (name) => {
  const dbInfo = await getDBinfo();
  const filterName = dbInfo.filter((recipe) => recipe.name.includes(name));
  return filterName;
};

const getNameInfo = async (name) => {
  const namebyApi = await getNameByApi(name);
  const namebyDB = await getNamebyDB(name);
  const getNameAllInfo = namebyApi.concat(namebyDB);
  return getNameAllInfo;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allRecipes = await getNameInfo(name);
  if (name) {
    let recipeName = await allRecipes.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(400).send("No se encuentra la receta");
  } else {
    const allDate = await getDbApiInfo();
    res.status(200).send(allDate);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length < 10) {
    const searchId = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const resultId = searchId.data;
    const dataIdRecipe = {
      name: resultId.title,
      vegetarian: resultId.vegetarian,
      vegan: resultId.vegan,
      glutenFree: resultId.glutenFree,
      dairyFree: resultId.dairyFree,
      image: resultId.image,
      id: resultId.id,
      spoonacularScore: resultId.spoonacularScore,
      healthScore: resultId.healthScore,
      types: resultId.dishTypes?.map((element) => element),
      diets: resultId.diets?.map((element) => element),
      summary: resultId.summary.replace(/<[^>]*>?/g, ""),
      steps:
        resultId.analyzedInstructions[0] &&
        resultId.analyzedInstructions[0].steps
          ? resultId.analyzedInstructions[0].steps
              .map((item) => item.step)
              .join(" \n")
          : "",
    };
    res.status(200).send(dataIdRecipe);
  } else {
    const searchIdDB = await Recipe.findAll({
      where: {
        id: id,
      },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  }
});

router.post("/", async (req, res) => {
  let {
    name,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    diets,
    image,
  } = req.body;
  
  const newRecipe = await Recipe.create({
    name,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    diets,
    image,
  });
 console.log(newRecipe);
  const dbDiets = await Diet.findAll({
    where: { name: diets },
  });
   await newRecipe.addDiet(dbDiets);
   res.status(200).send(newRecipe)
});
module.exports = router;
