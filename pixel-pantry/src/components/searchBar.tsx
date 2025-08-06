"use client";

// SearchBar.tsx
import Image from 'next/image';
import { useState } from 'react';
import { searchRecipes, Recipe } from '@/services/spoonacular';
import RecipeResults from './RecipeResults';

interface SearchBarProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
    onSearch,
    placeholder = "Search recipes by ingredient...",
    className = "",
    size = 'md'
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setLoading(true);
            setError(null);
            setHasSearched(true);

            try {
                const response = await searchRecipes(searchQuery.trim());
                setRecipes(response.results);

                if (onSearch) {
                    onSearch(searchQuery.trim());
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to search recipes';
                setError(errorMessage);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e as any);
        }
    };

    const sizeClasses = {
        sm: 'py-2 px-3 text-sm',
        md: 'py-4 px-5 text-base',
        lg: 'py-5 px-6 text-lg'
    };

    const iconSizes = {
        sm: { width: 16, height: 16 },
        md: { width: 22, height: 22 },
        lg: { width: 26, height: 26 }
    };

    return (
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Image
                        src="/assets/loupe.png"
                        alt="Search icon"
                        width={iconSizes[size].width}
                        height={iconSizes[size].height}
                        className="opacity-70"
                    />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className={`w-full pl-12 pr-12 border-2 border-gray-200 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-400/30 focus:border-green-500 text-gray-800 placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 ${sizeClasses[size]}`}
                    aria-label="Search recipes"
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setRecipes([]);
                            setError(null);
                            setHasSearched(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </form>

            {/* Search Results */}
            {hasSearched && (
                <div className="mt-8">
                    <RecipeResults
                        recipes={recipes}
                        loading={loading}
                        error={error}
                    />
                </div>
            )}
        </div>
    );
}