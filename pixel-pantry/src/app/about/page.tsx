export default function About() {
  return (
    <main className="wallpaper-bg min-h-3/4 px-6 py-12 text-[#032f3c] flex-grow">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">About Pixel Pantry</h1>

        <p className="text-lg mb-6">
          <strong>Pixel Pantry</strong> is your ultimate recipe management platform designed to make cooking smarter, faster, and more personalized. Whether you’re an experienced chef or just getting started, we help you find and organize recipes that match your lifestyle.
        </p>

        <ul className="list-disc pl-5 space-y-4 text-base">
          <li>
            🔍 <strong>Smart Search:</strong> Find recipes by keyword or by entering ingredients you already have at home.
          </li>
          <li>
            🥗 <strong>Personalized Filters:</strong> Filter by dietary needs (like vegetarian or gluten-free), prep time, and difficulty.
          </li>
          <li>
            📋 <strong>Detailed Views:</strong> Get full instructions, ingredients, prep/cook time, difficulty level, and photos.
          </li>
          <li>
            ❤️ <strong>Favorites:</strong> Save your favorite recipes for quick access anytime.
          </li>
          <li>
            📤 <strong>Share & Connect:</strong> Easily share recipes with friends via links or social media.
          </li>
          <li>
            ⚡ <strong>Fast & Responsive:</strong> Enjoy quick load times and a seamless experience on any device.
          </li>
        </ul>

        <p className="mt-8 text-base italic text-gray-600 text-center">
          Cooking made simple. Ingredients made useful. Welcome to Pixel Pantry 🍽️
        </p>
      </div>
    </main>
  );
}
