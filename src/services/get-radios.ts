import api from "./api";
import { RadioStation } from "./types";

interface RadioStations {
  stations: RadioStation[];
}
//Coloquei filtro por name apenas, pois se colocar country e lang ele faz combinar ao inves de fazer por ou. Com nome ele ja filtra e busca legal

export const fetchStations = async (searchQuery: string): Promise<RadioStations> => {
  try {
    const response = await api.get(`/stations/search?limit=${10}&name=${searchQuery}`);

    const stations = response.data;

    return { stations } as RadioStations;
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    return { stations: [] };
  }
};
