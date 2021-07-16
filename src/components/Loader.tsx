import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoaderWrapper = styled.div`
    width: 80px;
    height: 80px;
    margin: 30px auto;
    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #8ae6fd;
        border-color: #8ae6fd transparent #8ae6fd transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`;

const Loader: React.FC = () => {
    return <LoaderWrapper />;
}

export default Loader
