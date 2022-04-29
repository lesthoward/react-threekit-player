import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import GlobalStyle from "./assets/styles/global";

import ThreekitPlayer from "./components/ThreekitPlayer";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThreekitPlayer />
      </ErrorBoundary>
    </>
  );
}

export default App;
