import { useCallback } from "react";
import API_CONFIG from "../configAPI/api";

export const useSearchSeasons = () => {
  const requestSeasons = useCallback(
    async (platform) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/seasons`;
      try {
        const response = await fetch(SEARCH_URL, {
          headers: API_CONFIG.HEADERS,
        });
        if (!response.ok) {
          throw new Error(
            `Could not fetch ${SEARCH_URL}, status: ${response.status}`
          );
        }
        const data = await response.json();
        return data
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestSeasons };
};
