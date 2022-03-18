import React from "react";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: #282828;
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 60px !important;
  color: transparent !important;
  background-color: black;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <ErrorContainer className="error">
      <Title>Oops, something went wrong.</Title>
      <p>
        <code>
          <span>Reason</span> = <i>"{error.message}"</i>;
        </code>
      </p>
    </ErrorContainer>
  );
};

export default ErrorFallback;
