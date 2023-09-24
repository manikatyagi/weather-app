import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { geo_api_url, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
              `${geo_api_url}?minPopulation=1000000&namePrefix=${inputValue}`,
              geoApiOptions
            );
        
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
        
            const responseData = await response.json();
            
            const options = responseData.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }));
        
            return { options };
          } catch (error) {
            console.error(error);
            return { options: [] }; // Return an empty options array on error
          }
          
    };

    function handleOnChange(searchData) {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;