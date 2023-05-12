import Head from 'next/head';
import Link from 'next/link';
import Ingredients from '../../components/Ingredients';
import Script from 'next/script';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useQuery } from "react-query";

interface DrinkData {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  [key: string]: any; // for dynamic keys
}

type Ingredients = {
  ingredient: string;
  measure: string;
  idDrink?: string;
}

interface IngredientsProps {
  ingredients: Ingredients[];
}


async function fetchDrinkData(id: string): Promise<DrinkData> {
  console.log("get recipe data");
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const recipe = await res.json();
  console.log("data for recipe: ", recipe.drinks[0]);
  return recipe.drinks[0];
}

function getIngredients(drink: DrinkData): { ingredient: string; measure: string }[] {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    let ingredient = drink['strIngredient' + i];
    let id = drink['idDrink'];
    if (ingredient) {
      let measure = `(${drink['strMeasure' + i] || 'a few dashes'})`;
      ingredients.push({ ingredient: ingredient, measure: measure, idDrink: id});
    }
  }
  console.log("ingredients: ", ingredients);
  return ingredients;
}
  

export default function RecipeDetail() {

    const [searchId, setSearchId] = useState();
    const router = useRouter();
    const drinkId = typeof router.query?.id === "string" ? router.query.id : "";

    const { isSuccess, data: drink, isLoading, isError } = useQuery(
        ["getDrink", drinkId],
        () => fetchDrinkData(drinkId),
        {
          enabled: drinkId.length > 0
        }
      );

    if (isSuccess && drink) {  
        const ingredients= getIngredients(drink);

            return (
                <Layout>
                <div >
                    <Head>
                    <title>Title</title>
                    <Script 
                        src="https://cdn.jsdelivr.net/npm/chart.js" 
                        strategy="lazyOnload" 
                        onLoad={() =>
                        console.log(`script loaded correctly`)
                    }/>
                    </Head>

                    <div className="recipe-container">
                        
                        <header className="recipe-header">
                            
                                <Link href="/">
                                    <div className="list-arrow">{'<'} Thirsty</div>
                                </ Link>
                    
                        </header>

                        <div className="recipe-row">
                            <Image className="recipe-detail-image"           
                                src={drink.strDrinkThumb}
                                alt="drink thumbnail"
                                width={80}
                                height={80}
                            />
                        </div>

                        <div className="recipe-row">
                            <h2 className="recipe-title inline">{drink.strDrink}</h2>
                        </div>

                        <div className="recipe-row flex-row justify-content-start width-100">
                            <h3 className="recipe-subtitle">Ingredients:</h3>
                        </div>

                        <div className="recipe-row flex-row justify-content-start width-100">
                            <div>
                                <Ingredients ingredients={ingredients} />
                            </div>
                        </div>

                        <div className="recipe-row flex-col">
                            <p className="recipe-instructions">
                                {drink.strInstructions}
                            </p>
                        </div>
                    </div>
                </div>

                </Layout>
            )
        }
    if (isLoading) {
            return <div className="center">Loading...</div>;
          }
        
          if (isError) {
            return (
              <div className="center">
                The drink was not found. 
                <span role="img" aria-label="sad">
                  😢
                </span>
              </div>
            );
          }
}