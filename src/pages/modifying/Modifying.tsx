import styled from "styled-components";
import {Diagram, Setting} from "../../components/templates";
import {RootState} from "../../store";
import {useMount} from "../../hooks";
import {retrieveSystemsRequest} from "../../store/system";
import {useDispatch, useSelector} from "react-redux";
import {retrieveLinksRequest} from "../../store/link";
import {retrieveChecksRequest} from "../../store/check";

export interface IModifying {
}

export const Modifying = ({}: IModifying) => {
    const dispatch = useDispatch()
    useMount(() => {
        dispatch(retrieveSystemsRequest())
        dispatch(retrieveLinksRequest())
        dispatch(retrieveChecksRequest())
    })

    const systems = useSelector((state: RootState) => state.system.systems)
    const links = useSelector((state: RootState) => state.link.links)

    return <StyledModifying>
        <Setting systems={systems?.filter(system => system.isAssigned === false)}/>
        <Diagram systems={systems?.filter(system => system.isAssigned === true)} links={links}/>
    </StyledModifying>
}

const StyledModifying = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`

