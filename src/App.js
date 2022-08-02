import React, {useEffect, useState} from 'react'; 
import './App.css';
import Recipe from './Recipe';


const App = () =>{

  const APP_ID = "62426002";
  const APP_KEY = "a3c6b6d58f6005aeeea96b605bd06a1f";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");



  useEffect(() => {
    fetchRecipes();
  }, [query]); // only runs on submit

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
    const data = await response.json(); // does not come back instantly, thus use await
    setRecipes(data.hits);
    console.log(data.hits);
  };


  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return(
    <div className = "App">
      <form onSubmit={getSearch} className="search-form">
        <input className = "search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type ="submit">
          Search
        </button>
      </form>
      <div className= "recipes">
      {recipes.map(recipe =>(
        <Recipe
        key = {recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        
        />
      ))}
      </div>
    </div>
     

  );
}

export default App;
