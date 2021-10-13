import {useDispatch, useSelector} from "react-redux";
import {useMount} from "../../hooks";
import {retrieveSystemsRequest} from "../../store/system";
import {retrieveLinksRequest} from "../../store/link";
import {retrieveChecksRequest} from "../../store/check";
import {RootState} from "../../store";
import {Diagram} from "../../components/templates";
import styled from "styled-components";


export const Monitoring = () => {
    const dispatch = useDispatch()
    useMount(() => {
        dispatch(retrieveSystemsRequest())
        dispatch(retrieveLinksRequest())
        dispatch(retrieveChecksRequest())
        setInterval(() => {
            dispatch(retrieveSystemsRequest())
            dispatch(retrieveLinksRequest())
            dispatch(retrieveChecksRequest())
        }, 10 * 1000)
    })

    const systems = useSelector((state: RootState) => state.system.systems)
    const links = useSelector((state: RootState) => state.link.links)
    const checks = useSelector((state: RootState) => state.check.checks)

    return <StyledMonitoring>
        <Diagram systems={systems?.filter(system => system.isAssigned === true)} links={links} checks={checks}/>
    </StyledMonitoring>
}

const StyledMonitoring = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`

