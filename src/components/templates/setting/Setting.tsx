import styled from "styled-components";
import {SystemList} from "../../organisms";
import {System} from "../../../store/system";
import {Scrollbar} from "react-scrollbars-custom";

export interface ISetting {
    systems?: System[]
}

export const Setting = ({systems}: ISetting) => {
    return <StyledSetting>
        <Scrollbar style={{width:'100%', height: '100%'}}>
            <SystemList systems={systems}/>
        </Scrollbar>
    </StyledSetting>
}

const StyledSetting = styled.aside`
  display: flex;
  flex: 1;

  min-width: 200px;
  width: 100%;
  height: 100%;
`
