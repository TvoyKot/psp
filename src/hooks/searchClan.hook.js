import { useCallback } from "react";
import API_CONFIG from "../configAPI/api";

const useClanPlayer = () => {
  const request = useCallback(async (clanID) => {
    const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/players?filter[playerNames]=${name}`;
  });
};
