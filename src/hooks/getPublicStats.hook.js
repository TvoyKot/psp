import { useCallback, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import API_CONFIG from "../configAPI/api";

export const useGetPublicStats = () => {
  const { setErrorMessage } = useContext(PlayerContext);
  const requestPublicStats = useCallback(
    async (platform, accountId, seasonId) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/players/${accountId}/seasons/${seasonId}`;
      try {
        const response = await fetch(SEARCH_URL, {
          headers: API_CONFIG.HEADERS,
        });
         if (!response.ok) {
          if (response.status === 429) {
            setErrorMessage(
              "Слишком много запросов! Попробуйте позже."
            )
            throw new Error(
              `Could not fetch ${SEARCH_URL}, status: "too many request! Try later."`
            );
          }
          if (response.status === 404) {
            setErrorMessage("Игрок не найден!")
            throw new Error(
              `Could not fetch ${SEARCH_URL}, status: "player not found!"`
            );
          }
        }
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestPublicStats };
};
