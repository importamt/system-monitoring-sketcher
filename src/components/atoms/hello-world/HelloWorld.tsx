import React from "react";
import styled from "styled-components";

export interface IHelloWorld {
    background: string,
    color: string,
}

const HelloWorld = ({color, background}: IHelloWorld) => {
    return <StyledHelloWorld color={color} background={background}>
        HELLO!
    </StyledHelloWorld>
}

const StyledHelloWorld = styled.article<IHelloWorld>`
  width: 300px;
  height: 300px;
  font-size: 15px;
  color: ${({color}) => color?color:'white'};
  background: ${({background}) => background?background:'darkblue'};
`

export {HelloWorld};