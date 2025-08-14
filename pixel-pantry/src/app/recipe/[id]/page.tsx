"use client";

import { useParams } from 'next/navigation';
import {getRecipeById, FullRecipe, getNutritionWidgetById, NutritionWidget} from "@/services/spoonacular";
import {useEffect, useRef, useState} from "react";
import React, { SVGProps } from "react";

export default function RecipePage() {
    const params = useParams();
    const recipeId = params.id;

    const [recipe, setRecipe] = useState<FullRecipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [liked, setLiked] = useState(false);

    const [nutritionWidget, setNutritionWidget] = useState<NutritionWidget | null>(null);

    const [selectedTab, setSelectedTab] = useState(() => {
        if (!recipe) return "nonVeg";
        if (recipe.vegan) return "vegan";
        if (recipe.vegetarian) return "vegetarian";
        return "nonVeg";
    });

    const liRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [heights, setHeights] = useState<number[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => {
            const newHeights = liRefs.current.map((li) => (li ? li.offsetHeight : 0));
            setHeights(newHeights);
        });
    }, [recipe]);

    //tabs
    const tabs = [
        { id: "vegan", icon: VeganIcon, label: "Vegan" },
        { id: "vegetarian", icon: VegetarianIcon, label: "Vegetarian" },
        { id: "nonVeg", icon: NonVegetarianIcon, label: "Non-Vegetarian" },
    ];


    // SVGs
    function FireIcon(props: SVGProps<SVGSVGElement>) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${props.className || ""}`}
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
            </svg>
        );
    }

    function ClockIcon(props: SVGProps<SVGSVGElement>) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${props.className || ""}`}
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        );
    }

    function UserGroupIcon(props: SVGProps<SVGSVGElement>) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${props.className || ""}`}
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
            </svg>
        );
    }

    function HeartIcon(props: SVGProps<SVGSVGElement>) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${props.className || ""}`}
                {...props}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
        );
    }

    function VegetarianIcon(props: React.SVGProps<SVGSVGElement>) {
        return (
            <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 463 463"
                {...props}
            >
                <g>
                    <g>
                        <path d="M455.5,288h-41.221c-3.084-15.979-15.823-28.56-31.886-31.398c-1.01-5.693-3.278-11.1-6.619-15.843
			c9.659-13.178,12.237-29.729,6.221-43.198c-0.753-1.687-2.102-3.036-3.789-3.789c-12.547-5.605-27.77-3.75-40.449,4.339
			C332.011,189.455,322.212,184,311.5,184c-17.121,0-31.086,13.733-31.481,30.76c-4.752-7.744-11.667-14.072-19.926-18.066
			c1.861-4.016,2.907-8.484,2.907-13.194c0-15.046-10.604-27.663-24.732-30.768C235.163,138.604,222.546,128,207.5,128
			c-7.405,0-14.437,2.588-20,7.175c-5.563-4.587-12.595-7.175-20-7.175c-15.046,0-27.663,10.604-30.768,24.732
			C122.604,155.837,112,168.454,112,183.5c0,17.369,14.131,31.5,31.5,31.5c8.413,0,16.25-3.412,21.995-9.073
			c2.563,6.648,5.758,15.951,8.497,26.997c-2.661-0.617-5.192-0.925-7.723-0.925c-5.795,0-11.29,1.343-16.217,3.733
			C141.213,223.405,127.035,216,111.5,216c-1.424,0-2.869,0.104-4.329,0.26c-0.664-4.336-2.345-9.108-5.814-13.445
			c-2.588-3.235-7.307-3.76-10.542-1.171c-3.234,2.587-3.759,7.307-1.171,10.542c1.067,1.334,1.753,2.731,2.192,4.075
			c-1.462-0.156-2.909-0.26-4.335-0.26C61.309,216,40,237.309,40,263.5c0,8.829,2.389,17.227,6.778,24.5H7.5
			c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h60.25l14.55,19.4c5.917,7.89,15.338,12.6,25.2,12.6h248
			c9.862,0,19.283-4.71,25.2-12.6l14.55-19.4h60.25c4.142,0,7.5-3.358,7.5-7.5C463,291.358,459.642,288,455.5,288z M339.501,215.839
			c8.479-8.48,20.32-12.095,29.808-9.381c2.716,9.487-0.9,21.329-9.379,29.809c-5.918,5.918-13.472,9.456-20.721,10.138l8.304-8.302
			c2.929-2.929,2.93-7.678,0.001-10.607c-2.929-2.929-7.678-2.93-10.607-0.001l-7.322,7.32
			C330.631,228.112,334.057,221.283,339.501,215.839z M311.5,199c6.285,0,11.967,3.585,14.739,9.095
			c-2.974,3.448-5.422,7.19-7.317,11.094C314.076,217.093,308.854,216,303.5,216c-2.869,0-5.693,0.324-8.438,0.934
			c-0.041-0.475-0.062-0.953-0.062-1.434C295,206.402,302.402,199,311.5,199z M268.204,224.301
			c-1.557-0.196-3.126-0.301-4.704-0.301c-19.426,0-35.622,14.098-38.896,32.599c-1.375,0.242-2.734,0.563-4.076,0.951
			c-3.606-9.824-10.902-17.783-20.135-22.076c2.86-12.131,6.356-22.371,9.118-29.54C215.255,211.59,223.089,215,231.5,215
			c7.006,0,13.484-2.302,18.721-6.185C257.997,211.536,264.4,217.156,268.204,224.301z M172.169,184.936
			c-1.817-2.071-4.622-2.978-7.311-2.365c-2.686,0.615-4.819,2.653-5.555,5.308C157.328,195.016,150.828,200,143.5,200
			c-9.098,0-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5c4.142,0,7.5-3.358,7.5-7.5c0-9.098,7.402-16.5,16.5-16.5
			c5.533,0,10.673,2.77,13.75,7.408c1.39,2.095,3.736,3.355,6.25,3.355c2.514,0,4.861-1.26,6.25-3.355
			c3.076-4.639,8.216-7.408,13.75-7.408c9.098,0,16.5,7.402,16.5,16.5c0,4.142,3.358,7.5,7.5,7.5c9.098,0,16.5,7.402,16.5,16.5
			s-7.402,16.5-16.5,16.5c-7.328,0-13.828-4.984-15.805-12.121c-0.736-2.655-2.869-4.693-5.555-5.308
			c-0.556-0.127-1.117-0.189-1.673-0.189c-2.132,0-4.196,0.911-5.638,2.554c-3.997,4.555-9.441,7.064-15.33,7.064
			C181.61,192,176.166,189.491,172.169,184.936z M193.296,206.492c-1.885,5.319-3.907,11.627-5.796,18.719
			c-1.888-7.092-3.911-13.4-5.796-18.719c1.905,0.323,3.84,0.508,5.796,0.508C189.455,207,191.39,206.815,193.296,206.492z
			 M166.269,247c1.428,0,2.903,0.187,4.508,0.571c3.135,0.75,6.313,0.75,9.446,0c1.605-0.384,3.081-0.571,4.508-0.571
			C197.562,247,208,257.991,208,271.5c0,6.136-2.19,12.009-6.077,16.5h-52.846c-3.887-4.491-6.077-10.364-6.077-16.5
			C143,257.991,153.438,247,166.269,247z M66.156,288C59.042,281.819,55,273.02,55,263.5c0-17.92,14.58-32.5,32.5-32.5
			c3.008,0,6.102,0.536,9.738,1.686c1.473,0.466,3.052,0.466,4.524,0c3.636-1.15,6.73-1.686,9.738-1.686
			c10.755,0,20.557,5.191,26.59,13.807c-6.26,7.035-10.09,16.41-10.09,26.693c0,5.757,1.228,11.377,3.511,16.5H66.156z
			 M368.7,313.4c-3.1,4.133-8.034,6.6-13.2,6.6h-248c-5.166,0-10.101-2.467-13.2-6.6L86.5,303h290L368.7,313.4z M219.489,288
			c2.147-4.818,3.348-10.077,3.484-15.475c2.719-1.01,5.582-1.525,8.527-1.525c1.989,0,3.897-0.79,5.303-2.197
			c1.407-1.406,2.197-3.314,2.197-5.303c0-13.509,10.991-24.5,24.5-24.5c3.939,0,7.847,1.04,11.614,3.091
			c3.182,1.733,7.146,0.943,9.421-1.875c4.73-5.857,11.642-9.216,18.964-9.216c3.875,0,7.637,0.942,11.048,2.721
			c-0.651,5.156-0.364,10.311,0.921,15.205l-9.272,9.27c-2.929,2.929-2.93,7.678-0.001,10.607c1.465,1.465,3.384,2.197,5.304,2.197
			c1.919,0,3.838-0.732,5.303-2.196l8.848-8.845c3.579,1.068,7.31,1.602,11.094,1.602c9.683,0,19.685-3.421,28.216-9.842
			c1.969,3.588,3.04,7.634,3.04,11.781c0,4.142,3.358,7.5,7.5,7.5c10.894,0,20.145,7.149,23.321,17H219.489z"/>
                    </g>
                </g>
            </svg>
        );
    }

    function VeganIcon (props: React.SVGProps<SVGSVGElement>) {
        return(
            <svg
                fill={"currentColor"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -12.25 120.001 120.001"
                {...props}
            >
                <path
                      d="M113.208,793.958c-1.133-.371-2.14-.862-3.25-1.253-1.827-2.007-2.846-4.821-5-6.5h-4a37.078,37.078,0,0,0-6-.25c-.55-.448-1.781-.218-2.5-.5a2.259,2.259,0,0,1-1.5-1.5c.06-1.106.863-1.47,1.75-1.75.941-.224,2.259-.074,3-.5h6.749a12.594,12.594,0,0,1,3.982-.252c.868.03,1.734.059,2.518,0,.366-.359,1.144-.307,1.922-.255a6.421,6.421,0,0,0,1.328,0c2.773.022,5.581.01,8.389,0,7.317-.031,14.636-.061,21.36.5.7-.675-.611-.446-.749-1a2.482,2.482,0,0,1-1.5-.75,10.885,10.885,0,0,1-2.75-1.748c-1.6-1.4-3.164-2.834-4.749-4.251a5.227,5.227,0,0,0-1.5-2,29.688,29.688,0,0,1-2.5-7.5c.014-2.484-.184-5.184.5-7a.693.693,0,0,0,.5-.752c2.273-2.354,7.468-2.967,12-2.25,6.283,1.717,10.184,5.816,13.5,10.5,5.08-7.588,10.572-14.761,21.5-16.5a12.283,12.283,0,0,1,3.7.233,13.015,13.015,0,0,0,3.3.269,6.933,6.933,0,0,1,2.5,3.25c.754,1.079.824,2.841,1.25,4.25v4c-.883,6.2-4.229,9.937-7.749,13.5-1.859,1.14-3.476,2.525-5.251,3.749-1.744,1.173-3.8,2.038-5.25,3.5,5.4-.346,10.394-1.105,16-1.25,2.838-.043,5.485.106,8.132.256,2.8.157,5.594.315,8.618.247,2.557.607,5.46.87,6.25,3.247-.849.57-.824,2.011-2.5,1.752a5.945,5.945,0,0,1-1.819-.132,5.772,5.772,0,0,0-1.931-.12c-2.618-.13-5.132-.367-8-.25-1.017-.1-.769,1.066-1.5,1.25-.049.869-.885.95-1,1.75-.649,1.185-1.072,2.594-1.749,3.752-9.533-.211-17.538.262-25.751.748-3.868.229-7.7.275-11.749.5a122.065,122.065,0,0,1-12.25.5c-8.052.781-16.977.691-25.751.75C113.7,793.964,113.4,794.013,113.208,793.958Zm41.5-6a17.377,17.377,0,0,0,3.749-.248h5.5a1.269,1.269,0,0,0,.81-.139,1.27,1.27,0,0,1,.941-.113h3.5c1.574-.426,3.9-.1,5.5-.5h6.25c2.238.156,4.155-.013,4.5-1.75h-1.251c-.32.014-.346.321-.75.252-9.011.237-17.245,1.253-26.5,1.25C156.332,787.249,154.9,786.986,154.707,787.956Zm-41.5,0a2.955,2.955,0,0,0,1.115-.142,2.815,2.815,0,0,1,1.383-.106v-1.5h-4C112.037,786.961,112.332,787.749,113.208,787.956Zm6-1.75v1c.935.486,2.988.239,3.5-.5a1.585,1.585,0,0,0-1.533-.712C120.541,786,119.83,786.142,119.207,786.206Zm6.5,0v.751a8.213,8.213,0,0,0,4.5-.751,21.85,21.85,0,0,1-2.373-.013c-.493-.021-.961-.041-1.349-.041A3.955,3.955,0,0,0,125.708,786.206Zm48.5-23a2.848,2.848,0,0,1-1.5,2.751c-.68.737-1.157,1.677-2.25,2-1.315,1.518-3.142,2.524-4.751,3.748a49.319,49.319,0,0,0-4.25,4.25c-.891.527-1.3,1.533-2,2.253a9.322,9.322,0,0,0-1.75,2.5c6.552-2.864,12.167-6.666,17.75-10.5,1.117-1.468,2.629-2.541,3.751-4a15.438,15.438,0,0,0,1.5-2.5c.558-.777.714-1.954,1.251-2.751a28.772,28.772,0,0,0,0-5.5,32.235,32.235,0,0,0-3-1.752c-6.691-.107-10.062,3.106-13.75,6a69.781,69.781,0,0,0-4.749,6,25.03,25.03,0,0,0-2,3.5c-.632.926-1.714,2.541-1.25,3.752.075.594.678-.279.751-.5.073-.509.676-.49.749-1a6.857,6.857,0,0,0,1.751-1.75c1.407-1.009,2.557-2.274,4-3.25a26.6,26.6,0,0,1,4.5-2.749,9.143,9.143,0,0,1,3.649-1.251A1.856,1.856,0,0,1,174.207,763.206Zm-41-3.748v.5a17.708,17.708,0,0,0,5.249,13,47.578,47.578,0,0,1,4.75,3.5c.919.079,1.384.615,2.251.75.593.169,1.682,1.13,2.25.5-.733-.683-.909-1.925-1.751-2.5-.353-1.147-1.389-1.612-1.75-2.752a11.422,11.422,0,0,1-2.25-2.247c-.795-.706-1.843-1.157-1.749-2.752a1.884,1.884,0,0,1,1.749-1.748c2.819.013,3.556,2.109,5.25,3.25.558.859,1.426,1.4,2,2.248.374.376.447,1.054,1,1.249.252.439.432,1.343,1,.751a4.719,4.719,0,0,0,0-2.75,10.535,10.535,0,0,0-1-2.5,18.848,18.848,0,0,0-3-3.752c-2.156-2.344-4.623-4.375-8.5-5h-5C133.456,759.206,133.409,759.41,133.208,759.458Zm-39.5,13c-.488-.678-1.2-1.138-1.5-2-.428-1.821-1.2-3.3-1.75-5a53.452,53.452,0,0,1-2.751-11v-8.249c2.138-14.028,9.364-22.97,17.75-30.75a7.6,7.6,0,0,1-1.5-5.748c.518-.066.068-1.1.5-1.249.075-.511.678-.491.751-1,.288-.879,1.417-.915,1.75-1.751,1.67-.664,3.074-1.593,5.749-1.25.693.474,1.7.635,2,1.5.7.38.643,1.526,1.25,2,2.244-.923,3.986-2.347,6.5-3a33.547,33.547,0,0,1,6.75-2.748,58.083,58.083,0,0,1,15.749-3.25c.4.071.431-.237.751-.252h8.249a29.1,29.1,0,0,1,12,3.252c3.462,1.535,5.878,4.12,8.249,6.748a34.146,34.146,0,0,1,1.75,4c.637,1.2,1.745,1.921,1.5,4-.245,2.67-2.471,3.361-4,4.748-1.631,1.285-2.863,2.97-4.5,4.25-2.889,2.861-6.636,4.864-10,7.25-7.22,4.365-15.01,8.157-22,12.749a35.4,35.4,0,0,0-5.25,3.5,7.463,7.463,0,0,0-2.749,1.749,8.9,8.9,0,0,0-2.5,1.75,41.343,41.343,0,0,0-5.251,3.5,52.463,52.463,0,0,0-5,3.5c-1.906,1.01-3.457,2.375-5.25,3.5-1.614,1.3-3.526,2.309-5,3.749-3.574,2.177-6.191,5.31-10.25,7C94.837,773.659,93.832,773.5,93.708,772.456Zm35.749-64.5c-2.514.9-4.872,1.961-7.25,3a4.94,4.94,0,0,1-1.75.752,2.515,2.515,0,0,1-1.75,1,13.916,13.916,0,0,1-3.25,2c-.473.609-.009,2.156-.752,2.5a58.717,58.717,0,0,1-5,3.5,77.536,77.536,0,0,0-8.751,12c-.654,2.759-2.122,4.708-2.75,7.5-1.391,2.111-1.694,5.309-2.5,8a75.145,75.145,0,0,0-.25,9c.8,3.034,2.057,5.61,3,8.5a2.976,2.976,0,0,0,2.25-1.5c1-.25,1.435-1.064,2.25-1.5a31.961,31.961,0,0,1,4.5-3.25c1.152-1.35,3.041-1.962,4.25-3.252,1.764-.819,2.948-2.219,4.751-3,1.222-1.278,2.92-2.081,4.25-3.25a48.815,48.815,0,0,0,4.5-3.253,10.68,10.68,0,0,0,2.25-1.5c1.016-.318,1.45-1.219,2.5-1.5,1.207-1.377,3.292-1.875,4.5-3.252a39.875,39.875,0,0,0,4.751-2.748c1.73-.854,3.233-1.933,5-2.752,3.247-1.836,6.422-3.744,9.751-5.5,1.4-1.1,3.218-1.78,4.5-3,1.876-.709,2.941-2.228,4.751-3,1.174-1.41,2.924-2.242,4-3.748.766-.484,1.131-1.371,1.75-2,.709-.625,2.015-.652,2.25-1.75a11.289,11.289,0,0,0-1-2.752c-.893-.439-.824-1.843-1.5-2.5-4.665-4.667-11.6-7.069-21.5-6.5-.319.013-.346.32-.749.248C139.9,704.737,134.64,706.307,129.457,707.956Zm-19.75,1.25c.023.977.181,1.821,1,2,1.279.088,1.1-1.668.75-2.5h-.08A4.362,4.362,0,0,0,109.707,709.206Zm-7.749,48.5c-2.152-.017-2.358-1.976-2.5-4v-6.5c-.007-.59.43-.737.25-1.5,1.512-6.57,4.8-11.367,8.249-16,3.8-4.286,7.537-8.627,12.5-11.748.522.105.661-.173,1-.25a2.344,2.344,0,0,1,2.5,1.25c-.037,3.662-3.371,4.4-5,6.748-2.172,1.662-3.694,3.974-5.748,5.752-.583,1.416-1.822,2.178-2.5,3.5-.76,1.157-1.832,2-2.25,3.5a10.817,10.817,0,0,0-2,3.749c-.974.944-.958,2.877-1.75,4a27.6,27.6,0,0,1-.5,3.752v5c-.552.283-.018,1.651-.752,1.75-.334.437-.527,1.014-1.3,1.015A1.764,1.764,0,0,1,101.958,757.708Z"
                      transform="translate(-87.707 -698.706)"/>
            </svg>
            );
        }

    function NonVegetarianIcon(props: React.SVGProps<SVGSVGElement>) {
        return (
            <svg
                version="1.1"
                id="Icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                {...props} // spread all svg props here
            >
                <path d="M20.3,20.7c1.1-1,1.8-2.1,2.1-3.1l3.5-2c0.6,0.3,1.3,0.3,1.9,0c0.9-0.5,1.3-1.7,0.7-2.6
        c-0.2-0.3-0.4-0.5-0.7-0.7c0-0.3-0.1-0.7-0.2-1c-0.5-0.9-1.7-1.2-2.6-0.7c-0.6,0.4-1,1-1,1.7l-3.5,2c-1.5-0.4-3.7-0.1-5.7,1.1
        c-1.5,0.9-2.7,2-3.3,3.2" />
                <path d="M22.7,17.4c0.2,0.6,0.3,1.3,0.3,1.9c0,4.6-4.5,5.7-10,5.7S3,23.9,3,19.3S7.5,11,13,11c3.2,0,6,1.2,7.8,3.1" />
                <path d="M23.7,12.4c0.2-0.5,0.1-1-0.2-1.5c-0.2-0.3-0.4-0.5-0.7-0.7c0-0.3-0.1-0.7-0.2-1c-0.5-0.9-1.7-1.2-2.6-0.7
        c-0.6,0.4-1,1-1,1.7l-2.3,1.3" />
            </svg>
        );
    }


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
            // call recipe by id
            const data = await getRecipeById(idNumber);
            setRecipe(data);
            // call nutrition widget
            const nutritionData = await getNutritionWidgetById(idNumber);
            console.log("Nutrition data fetched:", nutritionData);
            setNutritionWidget(nutritionData);
        } catch (err) {
            console.error("Error fetching data:", err);
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

    //recipe title word count
    const wordCount = recipe.title.trim().split(/\s+/).length;

    //remove duplicate ingredient id
    const uniqueIngredients = recipe.extendedIngredients.filter(
    (ingredient, index, self)=>
    index===self.findIndex((i)=> i.id === ingredient.id)
    );




    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row">
                <div className="flex flex-col space-y-2">
                    {/* Tabs */}
                    <div className={"flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 sticky top-20 md:top-20 bg-white rounded"}>
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <div key={id} className={"bg-white rounded"}>
                                <button
                                    key={id}
                                    onClick={() => setSelectedTab(id)}
                                    className={`py-1 px-2 gap-2 mb-1 flex items-center md:py-2 md:px-4 text-left font-semibold text-lg rounded pointer-events-none cursor-default
                                    ${
                                        selectedTab === id
                                            ? "scale-110 border-b-4 border-amber-500 text-amber-600 bg-amber-100 shadow-md"
                                            : "text-gray-600 hover:text-amber-500 hover:bg-amber-50"
                                    }
                                    vertical-text
                                    `}
                                    type="button"
                                    aria-selected={selectedTab === id}
                                    role="tab"
                                    disabled={selectedTab === id}
                                >
                                    <Icon className="w-6 h-6 rotate-90" /> {/* Inline SVG */}
                                    {label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/*card*/}
                <div className="bg-white rounded-lg shadow-lg p-8 relative inline-block">
                    <h1 className={`absolute top-120 left-60 sm:left-100 lg:top-120 lg:left-105 bg-amber-600/90 backdrop-blur-xs p-2 rounded-lg transform -translate-x-1/2 mb-1 font-bold text-amber-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl ${wordCount > 3 ? "break-words" : "whitespace-nowrap"}`}> {recipe.title}
                    </h1>
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full rounded mb-6 mx-auto shadow-2xl "
                        style={{width: "500px", height: "500px", objectFit: "cover"}}
                    />

                    {/*heart button*/}
                    <button
                        onClick={() => setLiked(!liked)}
                        className={"z-10 rounded-full shadow-lg hover:scale-110 mb-10 absolute top-14 right-10 lg:top-18 lg:right-50 sm:right-50 bg-white/80 p-2"}
                        aria-label={liked ? "Unlike" : "Like"}
                    >
                        {liked ? (
                            // filled heart SVG
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="-120 0 450 400"
                                width="24"
                                height="24"
                                fill="red"
                            >
                                <path
                                    d="M0 0 C22.9985 -0.4677 44.8458 4.6652 64.832 16.1172 C65.813 16.6715 66.794 17.2258 67.8047 17.7969 C82.364 26.5534 94.05 39.059 105.832 51.1172 C109.2348 49.6542 111.3676 47.7805 113.922 45.1172 C114.699 44.3172 115.477 43.5171 116.278 42.6929 C117.511 41.4179 117.511 41.4179 118.77 40.1172 C141.098 17.483 169.319 1.273 201.832 0.1172 C203.501 0.0572 203.501 0.0572 205.203 -0.0039 C234.812 -0.5277 263.827 8.0715 286.832 27.1172 C287.383 27.5732 287.934 28.0292 288.501 28.499 C311.773 48.138 327.588 76.671 330.832 107.117 C332.531 142.752 325.473 174.604 301.832 202.117 C295.994 208.487 289.821 214.539 283.702 220.635 C281.875 222.466 280.05 224.297 278.224 226.129 C273.808 230.559 269.384 234.98 264.956 239.399 C261.359 242.989 257.765 246.583 254.172 250.179 C253.659 250.692 253.145 251.206 252.616 251.736 C251.573 252.78 250.53 253.824 249.487 254.868 C239.738 264.625 229.981 274.373 220.22 284.118 C211.849 292.475 203.485 300.841 195.128 309.213 C185.403 318.953 175.673 328.689 165.936 338.418 C164.898 339.454 163.861 340.491 162.823 341.528 C162.312 342.038 161.802 342.548 161.276 343.073 C157.682 346.665 154.091 350.26 150.501 353.857 C145.676 358.691 140.844 363.517 136.005 368.338 C134.229 370.11 132.456 371.885 130.685 373.662 C128.273 376.083 125.851 378.494 123.427 380.903 C122.725 381.612 122.023 382.321 121.299 383.051 C116.078 388.21 112.53 390.279 104.992 390.48 C98.112 389.323 93.764 384.477 89.079 379.751 C88.317 378.995 87.555 378.239 86.77 377.46 C84.221 374.924 81.682 372.379 79.144 369.833 C77.317 368.012 75.49 366.192 73.663 364.373 C69.214 359.941 64.773 355.501 60.336 351.059 C56.724 347.443 53.11 343.83 49.494 340.22 C48.979 339.705 48.464 339.191 47.933 338.66 C46.886 337.615 45.839 336.569 44.792 335.524 C34.973 325.719 25.163 315.904 15.357 306.086 C6.408 297.127 -2.553 288.18 -11.519 279.237 C-20.741 270.04 -29.955 260.835 -39.162 251.622 C-44.324 246.456 -49.49 241.293 -54.662 236.137 C-59.534 231.282 -64.395 226.416 -69.25 221.543 C-71.025 219.763 -72.805 217.987 -74.587 216.215 C-101.432 189.516 -117.25 160.171 -117.605 121.805 C-117.466 87.748 -104.784 57.788 -80.704 33.587 C-71.947 25.206 -61.96 18.576 -51.168 13.117 C-50.563 12.808 -49.958 12.499 -49.334 12.18 C-33.935 4.47 -17.158 0.635 0 0 Z"/>
                            </svg>
                        ) : (
                            // outline or empty heart for unliked
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={"text-black"}
                            >
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        )}
                    </button>
                    {/*key information*/}
                    <div
                        className="
                                flex flex-wrap items-center gap-4 pb-6 pt-30 text-gray-600
                                [&>p]:bg-gray-300/50
                                [&>p]:border-t-4
                                [&>p]:border-t-amber-400
                                [&>p]:px-2 [&>p]:py-2
                                [&>p]:rounded-full
                                [&>p]:shadow-lg
                                [&>p]:flex [&>p]:items-center [&>p]:gap-1
                                sm:gap-x-4 sm:flex-nowrap
                    "
                    >
                        {recipe.readyInMinutes != null && (
                            <p>
                                <ClockIcon className="text-amber-600 w-5"/> {recipe.readyInMinutes} minutes
                            </p>
                        )}
                        {recipe.servings != null && (
                            <p>
                                <UserGroupIcon className="text-amber-500 w-5"/> Servings: {recipe.servings}
                            </p>
                        )}
                        {recipe.cookingMinutes != null && (
                            <p>
                                <FireIcon className="text-amber-600 w-5"/> Cook time: {recipe.cookingMinutes}
                            </p>
                        )}
                        {recipe.healthScore != null && (
                            <p>
                                <HeartIcon className="text-amber-600 w-5"/> Health Score: {recipe.healthScore}
                            </p>
                        )}
                    </div>

                    {/*summary*/}
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-500">Summary</h2>
                        <p className={"text-gray-500"}>{plainText}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
                        {/*Ingredients*/}
                        <div className={"md:col-span-2 shadow-lg rounded p-4 border-1 border-gray-500 mt-10"}>
                            <h2 className="text-xl font-semibold mb-2 text-gray-500">Ingredients</h2>
                            <ul className="list-disc list-inside mb-6 text-gray-500">
                                {uniqueIngredients.map((i) => (
                                    <li key={i.id}>{i.original}</li>
                                ))}
                            </ul>
                        </div>
                        {/* Nutrition Widget in col 3 */}
                        <div
                            className="bg-gray-200 shadow-xl rounded p-4 mt-10 overflow-scroll overflow-x-hidden max-h-80">
                            <h2 className="text-xl font-semibold mb-2 text-gray-500">Nutrition Facts</h2>
                            {nutritionWidget ? (
                                <ul className="text-gray-600">
                                    {nutritionWidget.nutrients.map((nutrient) => (
                                        <li key={nutrient.name} className="mb-1">
                                            <span
                                                className="font-semibold">{nutrient.name}:</span> {nutrient.amount.toFixed(2)} {nutrient.unit}{" "}
                                            {nutrient.percentOfDailyNeeds && (
                                                <span
                                                    className="text-sm text-green-600">({nutrient.percentOfDailyNeeds.toFixed(1)}% DV)</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Loading nutrition data...</p>
                            )}
                        </div>
                    </div>
                    {/*prep*/}
                    <h2 className={"mt-10 text-xl font-semibold mb-2 text-gray-500"}>Preparation</h2>
                    <ol className="text-gray-700 list-decimal list-inside space-y-4">
                        {recipe.analyzedInstructions[0].steps.map((step, index) => (
                            <li
                                key={step.number}
                                className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 pr-4 pl-4 pt-0 sm:p-6 pl-14 sm:pl-16 overflow-hidden rounded-lg
                                bg-gradient-to-r from-gray-300/40 via-slate-400/40 to-gray-300/50
                                backdrop-blur-md shadow-lg"
                            >
                                {/* Top highlight bar */}
                                <div
                                    className="absolute top-0 left-0 w-full h-2 sm:h-3 rounded-t-lg bg-gradient-to-r from-amber-100 via-amber-300/50 to-amber-100"
                                ></div>

                                {/* Number bubble */}
                                <span
                                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-gray-900 shadow-md z-10 text-sm sm:text-base"
                                >
                                 {step.number}
                                </span>

                                {/* Step text */}
                                <p className="relative z-10 text-gray-900 text-sm sm:text-base leading-snug">
                                    {step.step}
                                </p>
                            </li>
                        ))}
                    </ol>

                        {/* cuisines */}
                        <ul className={"text-gray-500 list-disc list-inside mt-6"}>
                            <h3 className={"text-xl font-semibold mb-2 text-gray-500"}>Cuisines: </h3>
                            {recipe.cuisines.map((c, index) => <li key={index}>{c}</li>)}
                        </ul>


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