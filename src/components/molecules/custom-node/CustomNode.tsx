import styled from "styled-components";
import {Node} from "beautiful-react-diagrams/@types/DiagramSchema";
import {System} from "../../../store";
import React, {useContext} from "react";
import {IsMonitoringContext} from "../../../index";

export const CustomNode = ({inputs, content, className, data}: Omit<Node<System>, 'coordinates'>) => {
    const isMonitoring = useContext(IsMonitoringContext)

    return <StyledNode className={className}>

        {content}
        {inputs}

        { !isMonitoring && <button data-system-id={data?.id} className={'delete'}>x</button>}
    </StyledNode>
}

export const StyledNode = styled.figure`
  background: #dae1e7;
  border-radius: .25rem;
  padding: .5rem;
  
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & > button.delete {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    right: 20px;
    top: 20px;
    
    width: 1em;
    height: 1em;
    border-radius: 20px;
    border: none;
    position: absolute;
  }
  
  & div.bi-diagram-port {
    width: 1.25rem;
    height: 1.25rem;
    
    background: #0000000F;
    
    position: absolute;
  }

  & div.bi-diagram-port:nth-child(1) {
    left: 0;
    top: 0;
  }

  & div.bi-diagram-port:nth-child(2) {
    left: calc(50% - .625rem);
    top: 0;
  }

  & div.bi-diagram-port:nth-child(3) {
    right: 0;
    top: 0;
  }

  & div.bi-diagram-port:nth-child(4) {
    right: 0;
    top: calc(50% - .625rem);
  }

  & div.bi-diagram-port:nth-child(5) {
    right: 0;
    bottom: 0;
  }

  & div.bi-diagram-port:nth-child(6) {
    right: calc(50% - .625rem);
    bottom: 0;
  }

  & div.bi-diagram-port:nth-child(7) {
    left: 0;
    bottom: 0;
  }

  & div.bi-diagram-port:nth-child(8) {
    left: 0;
    bottom: calc(50% - .625rem);
  }
`
