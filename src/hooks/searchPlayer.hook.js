import { useCallback } from "react";
import API_CONFIG from "../configAPI/api";
export const useSearchPlayer = () => {
  const requestPlayer = useCallback(
    async (platform, name) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/players?filter[playerNames]=${name}`;
      try {
        const response = await fetch(SEARCH_URL, {
          headers: API_CONFIG.HEADERS,
        });
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              `Could not fetch ${SEARCH_URL}, status: "too many request! Try later."`
            );
          }
          if (response.status === 404) {
            throw new Error(
              `Could not fetch ${SEARCH_URL}, status: "player not found!"`
            );
          }
          throw new Error(
            `Could not fetch ${SEARCH_URL}, status: ${response.status}`
          );
        }
        const data = await response.json();
        if (!data) {
          return {
            found: false,
            data: null,
          };
        }
        return {
          found: true,
          data: data.data,
        };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestPlayer };
};
