/**
 *
 */
import styled from "styled-components";
import {Diagram, Setting} from "../../components/templates";
import {GlobalStyles} from "../../styles";

export interface IModifying {

}

export const Modifying = ({}: IModifying) => {

    //Get Systems

    //Get Connections

    return <StyledModifying>
        <GlobalStyles/>

        <Setting/>
        <Diagram>
            <></>
        </Diagram>
    </StyledModifying>
}

const StyledModifying = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`

