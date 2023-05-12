interface Ingredient {
  idDrink?: string;
  ingredient: string;
  measure: string;
}

interface IngredientsProps {
  ingredients: Ingredient[];
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  const pastelColors: string[] = [
    '#fbb6ce', '#aee5d8', '#fddde6', '#e7eff6', '#e9d985',
    '#f0bcd4', '#d1e2f4', '#d4f4c4', '#f9dcc4', '#f5d5ea',
    '#a2e1db', '#efefb1', '#c9c3e6', '#e0f8d8', '#fcecd7'
  ];

  function generateColors(numColors: number): string[] {
    const colors = new Set<string>();
    while (colors.size < numColors) {
      colors.add(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
    }
    return Array.from(colors);
  }

  const colors: string[] = generateColors(ingredients.length);

  if (ingredients) {
    return (
      <div>
        {ingredients.map((ingredient: Ingredient, index: number) => (
          <div className="flex-row flex-nowrap align-items-center width-100" key={ingredient.idDrink}>
            <div className="legend-bullet" style={{backgroundColor: colors[index]}}></div>
            <div>{`${ingredient.ingredient} ${ingredient.measure}`}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>There are no ingredients.</div>;
  }
}
