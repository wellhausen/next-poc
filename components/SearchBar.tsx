import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

async function fetchDrinks(searchInput: string): Promise<any[]> {
  console.log("searchInput: ", searchInput);
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
  const data = await res.json();
  console.log("data.drinks: ", data.drinks);
  return data.drinks;
}

export default function SearchBar(): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchItems = (searchValue: string): void => {
    setSearchInput(searchValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      let ignore = false;
      setSearchResults([]);
      fetchDrinks(searchInput).then(result => {
        if (!ignore) {
          setSearchResults(result);
        }
      });
      return () => {
        ignore = true;
      }
    };
    fetchData();
  }, [searchInput]);

  return (
    <div >
      <title>Thirsty</title>

      <main>
        <h1>
          <section className='section'>
            <input
              type='text'
              placeholder="Find a drink"
              className='search-bar'
              onChange={(e) => searchItems(e.target.value)}
            />
          </section>
        </h1>

        <div>
          {
            searchResults != null
              ? searchResults.map(drink => (
                <div className="list-container" key={drink.idDrink}>
                  <div className="list-column-one">
                    <Image className="list-image"
                      src={drink.strDrinkThumb}
                      alt="drink thumbnail"
                      width={40}
                      height={40}
                    />
                    <h2 className="list-title inline">{drink.strDrink}</h2>
                  </div>
                  <Link href={{ pathname: '/recipedetail/[id]', query: { id: drink.idDrink } }}>
                    <div className="list-arrow">{'>'}</div>
                  </Link>
                </div>

              ))
              : null
          }
        </div>
      </main>
    </div>
  )
}
