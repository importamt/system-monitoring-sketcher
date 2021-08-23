import {System} from "../../../store";
import styled from "styled-components";
import {SystemListItem} from "../../molecules";

export interface ISystemList {
    systems?: System[]
}

export const SystemList = ({systems}: ISystemList) => {
    return <StyledSystemList>
        {
            systems ? systems.map(system => <SystemListItem key={system.id} system={system}/>) :
                Array.from({length: 15}).map((_, index) => <SystemListItem key={index}/>)
        }
    </StyledSystemList>
}

const StyledSystemList = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
