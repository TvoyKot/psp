import { useCallback } from "react";
import API_CONFIG from "../configAPI/api";

export const useGetLeadersBoard = () => {
  const requestLeadersBoard = useCallback(
    async (platform, seasonId) => {
      const SEARCH_URL = `${API_CONFIG.BASE_URL}${platform}/leaderboards/${seasonId}/squad`;
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
        console.error(e);
        throw e;
      }
    },
    [API_CONFIG.API_KEY]
  );
  return { requestLeadersBoard };
};
