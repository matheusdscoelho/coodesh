import api from "./api";
import { RadioStation } from "./types";

interface RadioStations {
  stations: RadioStation[];
}

export const fetchStations = async (
  searchQuery: string
): Promise<RadioStations> => {
  try {
    const params = {
      name: searchQuery,
      country: searchQuery,
      language: searchQuery,
    };

    const response = await api.get(`/stations/search?limit=${10}`, { params });

    const stations = response.data;

    return { stations } as RadioStations;
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    return { stations: [] };
  }
};
