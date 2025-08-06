"use client";

import { useParams } from 'next/navigation';

export default function RecipePage() {
    const params = useParams();
    const recipeId = params.id;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Recipe Details
                    </h1>
                    <p className="text-gray-600">
                        Recipe ID: {recipeId}
                    </p>
                    <p className="text-gray-500 mt-4">
                        This page is under construction. Recipe details will be displayed here.
                    </p>
                </div>
            </div>
        </div>
    );
} 