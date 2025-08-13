// Spoonacular API service

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Array<{
        id: number;
        amount: number;
        unit: string;
        name: string;
    }>;
    usedIngredients: Array<{
        id: number;
        amount: number;
        unit: string;
        name: string;
    }>;
    unusedIngredients: Array<{
        id: number;
        amount: number;
        unit: string;
        name: string;
    }>;
    likes: number;
}

export interface SearchResponse {
    results: Recipe[];
    offset: number;
    number: number;
    totalResults: number;
}

export interface Ingredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    original: string;
    amount: number;
    unit: string;
}

export interface InstructionStep {
    number: number;
    step: string;
}

export interface AnalyzedInstruction {
    name: string;
    steps: InstructionStep[];
}

export interface FullRecipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: Ingredient[];
    summary: string;
    instructions: string;
    analyzedInstructions: AnalyzedInstruction[];
    sourceUrl: string;

    // NEW FIELDS
    vegetarian: boolean;
    vegan: boolean;
    healthScore: number;
    cookingMinutes: number;
}

export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds?: number;
}

export interface IngredientNutrition {
    id: number;
    name: string;
    amount: number;
    unit: string;
    nutrients: Nutrient[];
}

export interface NutritionWidget {
    nutrients: Nutrient[];
    properties: { name: string; amount: number; unit: string }[];
    flavonoids: { name: string; amount: number; unit: string }[];
    ingredients: IngredientNutrition[];
    caloricBreakdown: {
        percentProtein: number;
        percentFat: number;
        percentCarbs: number;
    };
    weightPerServing: {
        amount: number;
        unit: string;
    };
}


// Search for recipes by ingredients (original function)
export const searchRecipesByIngredients = async (query: string, offset: number = 0, number: number = 10): Promise<SearchResponse> => {
    if (!API_KEY) {
        throw new Error('Spoonacular API key is not configured. Please add NEXT_PUBLIC_SPOONACULAR_API_KEY to your .env.local file');
    }

    const params = new URLSearchParams({
        apiKey: API_KEY,
        query: query,
        offset: offset.toString(),
        number: number.toString(),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        instructionsRequired: 'true',
        addRecipeNutrition: 'true'
    });

    try {
        const response = await fetch(`${BASE_URL}/complexSearch?${params}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

// Search for recipes by dish name or general terms
export const searchRecipesByDish = async (query: string, offset: number = 0, number: number = 10): Promise<SearchResponse> => {
    if (!API_KEY) {
        throw new Error('Spoonacular API key is not configured. Please add NEXT_PUBLIC_SPOONACULAR_API_KEY to your .env.local file');
    }

    const params = new URLSearchParams({
        apiKey: API_KEY,
        query: query,
        offset: offset.toString(),
        number: number.toString(),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        instructionsRequired: 'true',
        addRecipeNutrition: 'true',
        sort: 'popularity',
        sortDirection: 'desc'
    });

    try {
        const response = await fetch(`${BASE_URL}/complexSearch?${params}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

// Combined search function that tries both approaches
export const searchRecipes = async (query: string, offset: number = 0, number: number = 10): Promise<SearchResponse> => {
    if (!API_KEY) {
        throw new Error('Spoonacular API key is not configured. Please add NEXT_PUBLIC_SPOONACULAR_API_KEY to your .env.local file');
    }

    // First try searching by dish name (more general search)
    try {
        const dishResults = await searchRecipesByDish(query, offset, number);
        if (dishResults.results.length > 0) {
            return dishResults;
        }
    } catch (error) {
        console.log('Dish search failed, trying ingredient search...');
    }

    // If no results or error, try ingredient search
    try {
        const ingredientResults = await searchRecipesByIngredients(query, offset, number);
        return ingredientResults;
    } catch (error) {
        console.error('Both search methods failed:', error);
        throw error;
    }
};

export const getRecipeById = async (id: number) => {
    if (!API_KEY) {
        throw new Error('Spoonacular API key is not configured');
    }

    const params = new URLSearchParams({
        apiKey: API_KEY,
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        addRecipeNutrition: 'true'
    });

    try {
        const response = await fetch(`${BASE_URL}/${id}/information?${params}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
};

export const getNutritionWidgetById = async (id: number) => {
    if (!API_KEY) throw new Error('API Key missing');
    const params = new URLSearchParams({ apiKey: API_KEY });
    const response = await fetch(`${BASE_URL}/${id}/nutritionWidget.json?${params}`);
    if (!response.ok) throw new Error(`Failed to fetch nutrition data: ${response.status}`)
    return response.json();
}