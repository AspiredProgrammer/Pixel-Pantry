//Searching function

//WORK IN PROGRESS
export default async function Services(query: string) {

  const headerParameters = {
    'x-api-key': process.env.API_KEY
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?query=${query}`,
    //  header: headerParameters
  );
  const data = await response.json();
  return data.hits;
};
