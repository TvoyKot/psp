import { useState, useContext, Component } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class ErrorBoundary extends Component {
  static contextType = PlayerContext;

  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const { errorMessage, setErrorMessage } = this.context;
    return this.props.children;
  }
}
export default ErrorBoundary;
