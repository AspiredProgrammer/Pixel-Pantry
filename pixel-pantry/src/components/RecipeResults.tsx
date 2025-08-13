"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/services/spoonacular';

interface RecipeResultsProps {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

export default function RecipeResults({ recipes, loading, error }: RecipeResultsProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 text-lg font-semibold mb-2">Error</div>
                <div className="text-gray-600">{error}</div>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500 text-lg">No recipes found</div>
                <div className="text-gray-400 text-sm mt-2">Try searching for different dishes, ingredients, or cuisines</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {recipes.map((recipe) => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="block">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="relative h-48">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                {recipe.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                <span>Likes: {recipe.likes}</span>
                                {recipe.usedIngredientCount > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600">✓ {recipe.usedIngredientCount}</span>
                                        {recipe.missedIngredientCount > 0 && (
                                            <span className="text-red-500">✗ {recipe.missedIngredientCount}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
                                <div className="mt-3">
                                    <div className="text-xs text-gray-500 mb-1">Key ingredients:</div>
                                    <div className="flex flex-wrap gap-1">
                                        {recipe.usedIngredients.slice(0, 3).map((ingredient, index) => (
                                            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                {ingredient.name}
                                            </span>
                                        ))}
                                        {recipe.usedIngredients.length > 3 && (
                                            <span className="text-xs text-gray-500">+{recipe.usedIngredients.length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                            {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
                                <div className="mt-2">
                                    <div className="text-xs text-gray-500 mb-1">Missing ingredients:</div>
                                    <div className="flex flex-wrap gap-1">
                                        {recipe.missedIngredients.slice(0, 2).map((ingredient, index) => (
                                            <span key={index} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                {ingredient.name}
                                            </span>
                                        ))}
                                        {recipe.missedIngredients.length > 2 && (
                                            <span className="text-xs text-gray-500">+{recipe.missedIngredients.length - 2} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
} 