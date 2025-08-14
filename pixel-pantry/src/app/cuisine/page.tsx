// import { searchRecipes, Recipe, SearchResponse } from '@/services/spoonacular';
// import RecipeResults from '@/components/RecipeResults';
// import { useState } from 'react';

export default function Cuisine() {
    // const [recipes, setRecipes] = useState<Recipe[]>();
    
  return (
    <main className="wallpaper-bg min-h-3/4 px-6 py-12 text-[#032f3c] flex-grow">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">About Cuisine</h1>

        <div>
            <p className="text-lg mb-6">
                    At <strong>Pixel Pantry</strong>, we have recipes from a multitude of cuisines. 
                    Here below is a list of all the ones we cover:
                </p>
            <ul className="list-disc pl-5 space-y-4 text-base">
                <li>
                    African, Middle Eastern
                </li>
                <li>
                    Asian - Chinese, Indian, Japanese, Korean, Thai, Vietnamese
                </li>
                <li>
                    American - Cajun, Southern
                </li>
                <li>
                    European - British, Eastern European, French, German, Irish, Nordic, Spanish
                </li>
                <li>
                    Mediterranean - Italian, Jewish, Greek 
                </li>
                <li>
                    Mexican, Central American, Latin American, South American
                </li>
            </ul>

            {/* <p className={"text-l font-semibold mb-2 text-gray-500 mt-4"}>Below is a few examples of recipes from Asian, American & European cultures:</p> */}
            <div>
                {/* <RecipeResults 
                recipes={recipes}
                        loading={loading}
                        error={null}
                /> */}
            </div>
        </div>

      </div>
    </main>
  );
}
