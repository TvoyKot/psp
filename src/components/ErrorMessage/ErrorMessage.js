import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./ErrorMessage.scss";
import failedImage from "../../assets/FailedImage.png";

const ErrorMessage = () => {
  const { errorMessage } = useContext(PlayerContext);
  const errorImageUrl = failedImage;
  if (!errorMessage) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={errorImageUrl}
        alt="Erorr"
        style={{
          width: "280px",
          height: "280px",
        }}
      />
      <div className="wrapper modal">{errorMessage}</div>
    </div>
  );
};
export default ErrorMessage;
