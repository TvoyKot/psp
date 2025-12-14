import API_CONFIG from "../configAPI/api";
import { useCallback } from "react";

export const useGetRankedStats = () => {
  const requestRankedStats = useCallback(
    async (platform, accountId, seasonId) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/players/${accountId}/seasons/${seasonId}/ranked`;
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
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestRankedStats };
};
