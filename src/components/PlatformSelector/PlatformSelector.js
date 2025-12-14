import { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { ReactComponent as PCIcon } from "../../assets/platforms/pc-svgrepo-com.svg";
import { ReactComponent as PSNIcon } from "../../assets/platforms/playstation-svgrepo-com.svg";
import { ReactComponent as XBOXIcon } from "../../assets/platforms/xbox-svgrepo-com.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./platformSelector.scss";

const CustomButton = styled(Button)({
  color: "var(--mainColor)",
  borderColor: "var(--mainColor)",
  "&:hover": {
    color: "var(--mainColor)",
    borderColor: "var(--mainColor)",
    backgroundColor: "opacity(0.5)",
  },
});

const PlatformSelector = () => {
  // const [selectedPlatform, setSelectedPlatform] = useState(null);
  const { setSelectedPlatform } = useContext(PlayerContext);
  const platforms = [
    {
      id: 1,
      name: "steam",
      icon: <PCIcon width={75} height={75} />,
    },
    {
      id: 2,
      name: "psn",
      icon: <PSNIcon width={75} height={75} />,
    },
    {
      id: 3,
      name: "xbox",
      icon: <XBOXIcon width={75} height={75} />,
    },
  ];

  const handleSelect = (name) => {
    setSelectedPlatform(name);
  };

  return (
    <div className="platform-selector">
      <h2>Select Platform</h2>
      <Box sx={{ display: "flex", gap: 2, backdropFilter: "blur(2px)" }}>
        {platforms.map((platform) => {
          return (
            <CustomButton
              onClick={() => handleSelect(platform.name)}
              key={platform.id}
              label={platform.name}
              variant="outlined"
            >
              {platform.icon}
            </CustomButton>
          );
        })}
      </Box>
    </div>
  );
};

export default PlatformSelector;
