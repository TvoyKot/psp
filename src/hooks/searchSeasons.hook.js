import { useCallback, useContext } from "react";
import API_CONFIG from "../configAPI/api";
import { PlayerContext } from "../context/PlayerContext";

export const useSearchSeasons = () => {
  const { setErrorMessage } = useContext(PlayerContext);
  const requestSeasons = useCallback(
    async (platform) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/seasons`;
      try {
        const response = await fetch(SEARCH_URL, {
          headers: API_CONFIG.HEADERS,
        });
        if (!response.ok) {
          if (response.status === 429) {
            setErrorMessage("Слишком много запросов! Попробуйте позже.");
          } else {
            setErrorMessage("Произошла ошибка! Попробуйте позже.");
          }
        }
        const data = await response.json();
        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestSeasons };
};
