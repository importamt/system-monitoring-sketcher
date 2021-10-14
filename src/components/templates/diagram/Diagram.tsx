import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import 'beautiful-react-diagrams/styles.css';
import {Diagram as BeautifulDiagram, useSchema} from 'beautiful-react-diagrams';
import {RootState, System} from "../../../store";
import {useDrop} from "react-dnd";
import {Link, setLinks} from "../../../store/link";
import {Check} from "../../../store/check";
import {useDispatch, useSelector} from "react-redux";
import {setSystem} from "../../../store/system";
import {CustomNode} from "../../molecules";
import {DiagramSchema} from "beautiful-react-diagrams/@types/DiagramSchema";
import {useDebounce} from "../../../hooks/debounce";
import {CHECK_COLORS, getCheckColor} from "../../../functions/getCheckColor";
import {StyledNode} from "../../molecules/custom-node/CustomNode";
import {setScreenSize} from "../../../store/view/common";

export interface IDiagram {
    systems?: System[],
    links?: Link[],
    checks?: Check[],
}

const initialSchema = {
    nodes: [],
    links: []
} as DiagramSchema<System>

export const Diagram = ({systems, links, checks}: IDiagram) => {
    const isMonitoring = useSelector((state: RootState) => state.view.common.isMonitoring)
    const delay = useSelector((state: RootState) => state.view.common.delay)
    const screenWidth = useSelector((state: RootState) => state.view.common.width)
    const screenHeight = useSelector((state: RootState) => state.view.common.height)
    const dispatch = useDispatch()

    //useRef를 통해 ref값을 직접 정의하고 react-dnd의 drop함수를 적용한다.
    //diagram의 실 좌표를 얻기위해 getBoundingClientRect를 사용해야하기 떄문이다.
    const ref = useRef<HTMLElement>(null)

    const deleteNode = (event: React.MouseEvent<HTMLElement>) => {
        if (!systems) return
        const deleteButton = event.target as HTMLButtonElement
        if (deleteButton.tagName !== 'BUTTON') return
        const systemId = deleteButton.dataset.systemId

        const system = systems.find(system => system.systemId === systemId)

        if (system) {
            links && dispatch(setLinks(
                links.filter(link => link.targetId !== system.systemId && link.sourceId !== system.systemId)
            ))
            dispatch(setSystem({...system, x: 0, y: 0, isAssigned: false}))
        }
    }

    useEffect(() => {
        if (ref) {
            if (!isMonitoring) {
                drop(ref)

                const diagramOffset = ref.current?.getBoundingClientRect()
                console.log("diagramOffset", diagramOffset)
                dispatch(setScreenSize({
                    width: diagramOffset!.width,
                    height: diagramOffset!.height,
                }))
            }
        }
    }, [ref])

    const [schema, {onChange}] = useSchema(initialSchema)
    const debouncedSchema: DiagramSchema<System> = useDebounce(schema, 500)

    !isMonitoring && useEffect(() => {
        const systemMap = debouncedSchema.nodes.map(node => ({
            ...node.data!,
            x: node.coordinates[0],
            y: node.coordinates[1]
        })).reduce((systemMap, system: System) => {
            systemMap[system.systemId] = system
            return systemMap
        }, {} as { [key: string]: System })

        systems?.forEach(system => {
            const changedSystem = systemMap[system.systemId]
            if (
                changedSystem.x !== system.x ||
                changedSystem.y !== system.y ||
                changedSystem.url !== system.url
            ) {
                dispatch(setSystem({
                    ...system,
                    x: changedSystem.x < 0 ? 0 : changedSystem.x > screenWidth ? screenWidth - 210 : changedSystem.x,
                    y: changedSystem.y < 0 ? 0 : changedSystem.y > screenHeight ? screenHeight - 110 : changedSystem.y,
                    url: changedSystem.url,
                }))
            }
        })

        const changedLinks: Link[] = debouncedSchema.links!.map(link => {

            const sourceId = link.input.split("_port")[0]
            const targetId = link.output.split("_port")[0]

            return {sourceId, targetId} as Link
        })
        const filteredLinks = Object.values(changedLinks.reduce((links, link) => {
            links[link.sourceId + link.targetId] = link
            return links
        }, {} as { [key: string]: Link }))

        if (links) {
            const intersectionBetweenChangedLinksAndLinks =
                links.filter(link => changedLinks.some(changedLink => link.sourceId === changedLink.sourceId && link.targetId === changedLink.targetId))
            if (intersectionBetweenChangedLinksAndLinks.length !== links.length ||
                intersectionBetweenChangedLinksAndLinks.length !== changedLinks.length) {
                dispatch(setLinks(filteredLinks))
            }

        }
    }, [debouncedSchema])

    useEffect(() => {
        const now = new Date()
        const checkMap = checks?.reduce((checkMap, check) => {
            checkMap[check.sourceId + check.targetId] = check
            return checkMap
        }, {} as { [key: string]: Check })

        onChange({
            links: links ?
                links?.map(link => {
                    const check = checkMap ? checkMap[link.sourceId + link.targetId] : undefined
                    const color = isMonitoring ? getCheckColor(now.getTime(), delay, check) : ''
                    return {
                        input: link.sourceId,
                        output: link.targetId,
                        readonly: isMonitoring,
                        className: color,
                    }
                })
                : [],
            nodes: systems ?
                systems.map(system => {
                    const check = checkMap ? checkMap[system.systemId + system.systemId] : undefined
                    const color = isMonitoring ? getCheckColor(now.getTime(), delay, check) : ''
                    return {
                        id: system.systemId,
                        disableDrag: isMonitoring,
                        content: system.name,
                        coordinates: [system.x, system.y],
                        render: CustomNode,
                        className: color,
                        data: system,
                        inputs: isMonitoring ? [] : Array.from({length: 8}).map((_, index) => ({
                            id: system.systemId + `_port_${index}`,
                        })),
                        outputs: []
                    }
                }) : []
        })
    }, [systems, links])

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "SKETCHER",
        drop: (system: System, monitor) => {
            const dropOffset = monitor.getClientOffset()
            const diagramOffset = ref.current?.getBoundingClientRect()

            //monitor.getClientOffset() returns x,y from DOM not diagram
            const {x, y} = !dropOffset || !diagramOffset ? {x: 0, y: 0} : {
                x: dropOffset.x - diagramOffset.x,
                y: dropOffset.y - diagramOffset.y
            }

            dispatch(setSystem({...system, x: x, y: y, isAssigned: true}))

        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    }))


    return <StyledDiagram ref={ref} onClick={deleteNode}>
        {/*@ts-ignore*/}
        <BeautifulDiagram schema={schema} onChange={onChange}/>
    </StyledDiagram>
}


const StyledDiagram = styled.figure`
  display: flex;
  flex: 5;
  background: #1ea7fd;
  width: 100%;
  height: 100%;

  & .bi-link-path {
    animation: BiDashSegmentAnimation 1s linear infinite !important;
    stroke: #88cdff !important;
    stroke-dasharray: 10, 2 !important;
  }

  & ${StyledNode}.success-live {
    background: ${CHECK_COLORS['success-live']};
  }

  & ${StyledNode}.success-expired {
    background: ${CHECK_COLORS['success-expired']};
  }

  & ${StyledNode}.fail-live {
    background: ${CHECK_COLORS['fail-live']};
  }

  & ${StyledNode}.fail-expired {
    background: ${CHECK_COLORS['fail-expired']};
  }

  & ${StyledNode}.not-exist {
    background: ${CHECK_COLORS['not-exist']};
  }

  & .success-live .bi-link-path {
    stroke: ${CHECK_COLORS['success-live']} !important;
  }

  & .success-expired .bi-link-path {
    stroke: ${CHECK_COLORS['success-expired']} !important;
  }

  & .fail-live .bi-link-path {
    stroke: ${CHECK_COLORS['fail-live']} !important;
  }

  & .fail-expired .bi-link-path {
    stroke: ${CHECK_COLORS['fail-expired']} !important;
  }

  & .not-exist .bi-link-path {
    stroke: ${CHECK_COLORS['not-exist']} !important;
  }

  & .green .bi-link-path {
    stroke: green !important;
  }

  @keyframes BiDashSegmentAnimation {
    from {
      stroke-dashoffset: 24;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
`
