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
}

export const searchRecipes = async (query: string, offset: number = 0, number: number = 10): Promise<SearchResponse> => {
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