import React, { useState, useEffect } from "react";
import DogCard from "../DogCard/DogCard";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./DogList.module.css";
import { fetchDogBreeds } from "../../service/dogService.js";

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); //guardar valor da string

  const filteredDogs = dogs.filter((dog) =>
    dog.attributes.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  console.log(searchTerm);

  //Renderiza os dados quando carrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fecthDog = await fetchDogBreeds();
        setDogs(fecthDog);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // console.log(dogs);

  return (
    <div className={styles.wrapper}>
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={styles.container}>
        {/* Dogs Cards */}
        {filteredDogs.map((dog) => (
          <DogCard
            key={dog.id}
            breed={dog.attributes?.name}
            description={dog.attributes.description}
            image={dog.attributes?.image}
          />
        ))}

        {/* Dogs noResults */}

        {!loading && filteredDogs.length <= 0 && <p>No results</p>}

        {/* Dogs loading */}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default DogList;
