"use client";

import { useParams } from 'next/navigation';
import {getRecipeById, FullRecipe} from "@/services/spoonacular";
import {useEffect, useState} from "react";

export default function RecipePage() {
    const params = useParams();
    const recipeId = params.id;

    const [recipe, setRecipe] = useState<FullRecipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!recipeId) return;
        (async ()=> {
            setLoading(true);
            setError(null);
            try {
                // convert param string to num
                const idNumber = Number(recipeId);
                if(isNaN(idNumber)) {
                    setError("recipe id is not a number.")
                    setLoading(false);
                    return;
                }
                const data = await getRecipeById(idNumber);
                setRecipe(data);
            } catch (err) {
                setError("failed to load recipe.");
            } finally {
                setLoading(false)
            }
        })(); //call async function
    },[recipeId]);

    console.log("Recipe image URL:", recipe?.image);

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-20 text-red-600">{error}</p>;
    }

    if (!recipe) {
        return <p className="text-center mt-20">Recipe not found.</p>;
    }

    // use regex to strip text in summary
    const plainText = recipe.summary.replace(/<[^>]+>/g, '');

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {recipe.title}
                    </h1>
                    <img src={recipe.image} alt={recipe.title} className="w-full rounded mb-6"/>
                    <p className="text-gray-600">
                        ⏱ {recipe.readyInMinutes} minutes
                    </p>
                    <p className="text-gray-500 mb-4">
                        🍽 Servings: {recipe.servings}
                    </p>
                    <h2 className="text-xl font-semibold mb-2 text-gray-500">Ingredients</h2>
                    <ul className="list-disc list-inside mb-6 text-gray-500">
                        {recipe.extendedIngredients.map((i) => (
                            <li key={i.id}>{i.original}</li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold mb-2 text-gray-500">Summary</h2>
                    <p className={"text-gray-500"}>{plainText}</p>

                    <h2 className={"text-xl font-semibold mb-2 text-gray-500"}>Preparation</h2>
                    <ol className={"text-gray-500 list-decimal list-inside"}>
                        {recipe.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>



                    {recipe.sourceUrl && (
                        <a
                            href={recipe.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 text-green-600 hover:underline"
                        >
                            View full recipe source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
} 