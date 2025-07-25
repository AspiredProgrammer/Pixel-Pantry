//Searching function
//WORK IN PROGRESS
export const APIService = async (query) => {
  const response = await fetch(
    // `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20&q=${query}`
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}`
  );
  const data = await response.json();
  return data.hits;
};