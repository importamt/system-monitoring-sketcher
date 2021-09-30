import {useDrag} from "react-dnd";
import styled from "styled-components";
import {System} from "../../../store";

export interface ISystemListItem {
    system?: System
}

export const SystemListItem = ({system}: ISystemListItem) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "SKETCHER",
        item: system,

        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }))

    return <StyledSystemListItem system={system} ref={drag}>
        <h1>{system?.name}</h1>
        <small>{system ? 'ID: ' + system.id : null}</small>
        <small>{system ? 'URL: ' + system.url : null}</small>
    </StyledSystemListItem>
}

const StyledSystemListItem = styled.li<ISystemListItem>`
  cursor: pointer;

  min-width: 100px;
  width: 100%;
  min-height: 100px;
  height: 10%;

  color: ${({system}) => system ? 'white' : 'transparent'};
  background: #777777;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  & > h1, & > small {
    width: 80%;
    min-height: 15px;
    border-radius: 5px;
    background: ${({system}) => system ? 'transparent' : '#c8bdbd'};

    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > h1 {
    height: 20%;
  }

  & > small {
    width: 70%;
    height: 15%;
    justify-content: flex-start;
  }

`

