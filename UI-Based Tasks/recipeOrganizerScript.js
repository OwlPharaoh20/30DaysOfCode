// Get DOM elements
const recipeNameInput = document.getElementById('recipeName');
const recipeInstructionsInput = document.getElementById('recipeInstructions');
const recipeCategoryInput = document.getElementById('recipeCategory');
const recipeList = document.getElementById('recipeList');
const addRecipeBtn = document.getElementById('addRecipeBtn');

// Load recipes from LocalStorage or return an empty array if none are found
function loadRecipes() {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}

// Save recipes to LocalStorage
function saveRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Display the list of recipes on the page
function displayRecipes() {
    const recipes = loadRecipes();
    recipeList.innerHTML = ''; // Clear existing list

    // Loop through each recipe and create an HTML element
    recipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.classList.add('bg-gray-200', 'p-2', 'rounded-lg', 'flex', 'justify-between', 'items-center');

        // Recipe details
        const recipeContent = `
            <div>
                <h3 class="font-bold">${recipe.name} (${recipe.category})</h3>
                <p>${recipe.instructions}</p>
            </div>
        `;
        li.innerHTML = recipeContent;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded-lg');
        deleteBtn.addEventListener('click', () => deleteRecipe(index));

        // Append to list
        li.appendChild(deleteBtn);
        recipeList.appendChild(li);
    });
}

// Add a new recipe
function addRecipe() {
    const recipeName = recipeNameInput.value.trim();
    const recipeInstructions = recipeInstructionsInput.value.trim();
    const recipeCategory = recipeCategoryInput.value;

    if (recipeName && recipeInstructions && recipeCategory) {
        const recipes = loadRecipes();
        const newRecipe = {
            name: recipeName,
            instructions: recipeInstructions,
            category: recipeCategory
        };

        // Add new recipe to array and save
        recipes.push(newRecipe);
        saveRecipes(recipes);
        displayRecipes();

        // Clear input fields
        recipeNameInput.value = '';
        recipeInstructionsInput.value = '';
        recipeCategoryInput.value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// Delete a recipe
function deleteRecipe(index) {
    const recipes = loadRecipes();
    recipes.splice(index, 1); // Remove recipe by index
    saveRecipes(recipes);
    displayRecipes();
}

// Event listener for adding recipes
addRecipeBtn.addEventListener('click', addRecipe);

// Display recipes when the page loads
document.addEventListener('DOMContentLoaded', displayRecipes);
