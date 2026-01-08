import React, { useState, useContext, useEffect } from "react";
import { useSearchPlayer } from "../../hooks/searchPlayer.hook";
import { PlayerContext } from "../../context/PlayerContext";
import { useSearchSeasons } from "../../hooks/searchSeasons.hook";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useGetRankedStats } from "../../hooks/getRankedStats.hook";
import { useGetPublicStats } from "../../hooks/getPublicStats.hook";
import "../PlayerAccountStatus/playerAccountStatus.scss";

const StyledSearchPanel = styled(TextField)({
  width: "400px",
  display: "flex",
  justifyContent: "center",
  border: "3px solid #1C1C1C",
  borderRadius: "10px",
  margin: "0 auto",
  marginBottom: "15px",
  "& .MuiInputBase-input": {
    color: "black",
    fontSize: "20px",
    "&::placeholder": {
      fontSize: "20px",
      color: "var(--mainColor)",
    },
    "&:active": {
      borderColor: "black",
    },
    "&:focus": {
      width: "700px",
      borderColor: "black",
    },
  },
});

function SearchPanel() {
  const [searchPlayer, setSearchPlayer] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const {
    playerData,
    setPlayerData,
    selectedPlatform,
    setSeasons,
    setRankedStats,
    setPublicStats,
    errorMessage,
    setErrorMessage,
    clearError,
  } = useContext(PlayerContext);
  const { requestPlayer } = useSearchPlayer();
  const { requestSeasons } = useSearchSeasons();
  const { requestRankedStats } = useGetRankedStats();
  const { requestPublicStats } = useGetPublicStats();
  useEffect(() => {
    requestSeasons(selectedPlatform);
  }, [selectedPlatform]);

  const handleInputChange = (event) => {
    const searchNamePlayer = event.target.value;
    setSearchPlayer(searchNamePlayer);
  };

  const handleSearch = async () => {
    clearError();
    if (searchPlayer.trim()) {
      try {
        const infoPlayer = await requestPlayer(selectedPlatform, searchPlayer);
        if (!infoPlayer.found) {
          setPlayerData(null);
          setErrorMessage("Игрок ${searchPlayer} не найден");
          return;
        }
        const seasons = await requestSeasons(selectedPlatform);
        const rankedStats = await requestRankedStats(
          selectedPlatform,
          infoPlayer?.data[0].id,
          seasons?.data[0].id
        );
        const publicStats = await requestPublicStats(
          selectedPlatform,
          infoPlayer?.data[0].id,
          seasons?.data[0].id
        );
        setPlayerData(infoPlayer);
        setSeasons(seasons.data);
        setRankedStats(rankedStats);
        setPublicStats(publicStats);
        clearError();
      } catch (e) {
        console.error("SearchPanel:", e);
        setPlayerData(null);
        setSeasons([]);
        // if (e.status === 429) {
        //   setErrorMessage("Слишком много запросов! Попробуйте позже.");
        // } else if (e.status === 404) {
        //   setErrorMessage(`Игрок ${searchPlayer} не найден`);
        // } else {
        //   setErrorMessage("Произошла неизвестная ошибка");
        // }
      }
    }
  };
  const showModal = () => {
    if (playerData === null) {
      return <div className="wrapper modal">Сделайте запрос</div>;
    }
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <StyledSearchPanel
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Введите никнейм игрока"
        ></StyledSearchPanel>
      </Box>
    </>
  );
}
export default SearchPanel;
