import React, { useState, useEffect } from 'react';
// import { DUMMY_MEALS } from '../../Constants/DummyMeals';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMeals = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        'https://udemy-course-react-3b9c3-default-rtdb.firebaseio.com/meals.json/'
      );
      if (!response.ok) {
        throw new Error(response.meassage);
      }
      const data = await response.json();
      const newData = [];
      for (const item in data) {
        const temp = {
          id: item,
          name: data[item].name,
          description: data[item].description,
          price: data[item].price,
        };
        newData.push(temp);
      }
      setMeals(newData);
    } catch (error) {
      setError(error.message);
      // console.log(error.message);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  const getMealItem = (meal) => {
    return (
      <MealItem
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
        key={meal.id}
      />
    );
  };

  let retElem = <p>No meals Available.</p>;
  if (isLoading) {
    retElem = <p>Loading meals...</p>;
  } else {
    if (error) {
      retElem = <p>Something broke on our end.</p>;
    } else if (!error && meals.length > 0) {
      retElem = <ul>{meals.map(getMealItem)}</ul>;
    }
  }

  return <Card className={classes.meals}>{retElem}</Card>;
};

export default AvailableMeals;
