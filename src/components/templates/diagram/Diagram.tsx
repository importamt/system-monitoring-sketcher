import React from "react";
import styled from "styled-components";

export interface IDiagram {
    children: React.ReactElement
}

export const Diagram = (props: IDiagram) => {

    //init diagram

    // return React.cloneElement(props.children, props)
    return <StyledDiagram>
        diagram
    </StyledDiagram>
}

const StyledDiagram = styled.figure`
  display: flex;
  flex: 4;
  background: #1ea7fd;
  width: 100%;
  height: 100%;
`
