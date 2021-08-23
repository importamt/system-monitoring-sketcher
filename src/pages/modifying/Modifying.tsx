import styled from "styled-components";
import {Diagram, Setting} from "../../components/templates";
import {RootState, System} from "../../store";
import {useMount} from "../../hooks/basic";
import {getSystemsRequest, setSystemRequest} from "../../store/system/system-action";
import {useDispatch, useSelector} from "react-redux";

export interface IModifying {
}

export const Modifying = ({}: IModifying) => {
    const dispatch = useDispatch()
    useMount(() => {
        dispatch(getSystemsRequest())

        //For test
        //it will be removed...
        setInterval(() => {

            const system: System = {
                id: `abc${Math.random() * 100000}`,
                name: `HELLO: ${Math.random() * 100000}`,
                x: 10,
                y: 10,
                isAssigned: false,
                url: 'https://naver.com'
            }

            dispatch(setSystemRequest(system))
        }, 10000)
    })

    const systems = useSelector((state: RootState) => state.system.systems)
    return <StyledModifying>
        <Setting systems={systems}/>
        <Diagram systems={systems}/>
    </StyledModifying>
}

const StyledModifying = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`

