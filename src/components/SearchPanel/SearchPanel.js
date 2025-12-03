import React, { useState, useContext } from "react";
import { useSearchPlayer } from "../../hooks/searchPlayer.hook";
import { PlayerContext } from "../../context/PlayerContext";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
  // const [playerData, setPlayerData] = useState(null);
  const { setPlayerData } = useContext(PlayerContext);
  const { request } = useSearchPlayer();

  const handleInputChange = (event) => {
    const searchNamePlayer = event.target.value;
    setSearchPlayer(searchNamePlayer);
  };

  const handleSearch = async () => {
    if (searchPlayer.trim()) {
      try {
        const data = await request(searchPlayer);
        setPlayerData(data);
      } catch (e) {
        console.error(e);
        setPlayerData(null);
      }
    }
  };

  return (
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
  );
}

export default SearchPanel;
