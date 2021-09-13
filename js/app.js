const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.result');
const container = document.querySelector('.container');
let searchQuery = '';



searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI (){
const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APPID}&app_key=${APIKEY}&from=10&to=40`;
const response = await fetch(url);
const data = await response.json();
generateHTML(data.hits);

console.log(data);

}
function generateHTML(results){
    let generatedHTML = '';
    results.map(result =>{
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">Voir la recette</a>
            </div>
            <p class="infos">Calories : ${result.recipe.calories.toFixed(2)}</p>
            <p class="infos">Type : ${result.recipe.cuisineType}</p>
            <p class="infos">Ingrédients : ${result.recipe.ingredientLines}</p>

        </div>
        `
    })
    searchResult.innerHTML= generatedHTML;
}
