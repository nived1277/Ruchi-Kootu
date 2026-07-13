import { useState } from 'react';

export function useAppFilters() {
  const [searchRadius, setSearchRadius] = useState(3000);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [sortBy, setSortBy] = useState("ruchiScore");

  const [minRating, setMinRating] = useState(3.0);
  const [maxDistance, setMaxDistance] = useState(10.0);
  const [dietaryPreference, setDietaryPreference] = useState("All");
  const [filterFamilyFriendly, setFilterFamilyFriendly] = useState(false);
  const [filterParking, setFilterParking] = useState(false);
  const [filterOutdoor, setFilterOutdoor] = useState(false);

  return {
    searchRadius,
    setSearchRadius,
    selectedCuisines,
    setSelectedCuisines,
    selectedBudget,
    setSelectedBudget,
    openNowOnly,
    setOpenNowOnly,
    sortBy,
    setSortBy,
    minRating,
    setMinRating,
    maxDistance,
    setMaxDistance,
    dietaryPreference,
    setDietaryPreference,
    filterFamilyFriendly,
    setFilterFamilyFriendly,
    filterParking,
    setFilterParking,
    filterOutdoor,
    setFilterOutdoor
  };
}
export default useAppFilters;
