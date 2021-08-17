/**
 *
 */
import styled from "styled-components";
import {Diagram, Setting} from "../../components/templates";
import {useState} from "react";
import {System} from "../../store/system";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend";

export interface IModifying {

}

export const Modifying = ({}: IModifying) => {

    //Get Systems
    const [systems, setSystems] = useState<System[]>([
        {
            id: 'abc1',
            name: 'HELLO1',
            url: 'https://google.com',
            x: 10,
            y: 50,
            isAssigned: true
        }, {
            id: 'abc2',
            name: 'HELLO2',
            url: 'https://google.com',
            x: 10,
            y: 50,
            isAssigned: true
        }, {
            id: 'abc3',
            name: 'HELLO3',
            url: 'https://google.com',
            x: 10,
            y: 50,
            isAssigned: true
        },
    ])
    //Get Links

    return <StyledModifying>
        <DndProvider backend={HTML5Backend}>
            <Setting systems={systems}/>
            <Diagram systems={systems}/>
        </DndProvider>
    </StyledModifying>
}

const StyledModifying = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`

