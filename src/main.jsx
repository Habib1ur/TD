import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/GameContext";
import "./styles/globals.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unknown runtime error",
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6 text-white">
          <div className="max-w-xl rounded-2xl border border-rose-200/40 bg-rose-500/20 p-5">
            <h1 className="mb-2 text-xl font-semibold">App failed to start</h1>
            <p className="text-sm text-rose-100/95">{this.state.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <GameProvider>
        <App />
      </GameProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
