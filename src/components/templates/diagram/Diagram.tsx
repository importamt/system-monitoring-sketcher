import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import 'beautiful-react-diagrams/styles.css';
import {createSchema, Diagram as BeautifulDiagram, useSchema} from 'beautiful-react-diagrams';
import {System} from "../../../store";
import {useDrop} from "react-dnd";
import {Link} from "../../../store/link";
import {Check} from "../../../store/check";
import {useDispatch} from "react-redux";
import {setSystem} from "../../../store/system";
import {CustomNode} from "../../molecules";
import {useMount} from "../../../hooks";

// import useSchema from "../../../types/beautiful-react-diagrams/useSchema";

export interface IDiagram {
    systems?: System[],
    links?: Link[],
    checks?: Check[]
}

const initialSchema = createSchema<System>({
    nodes: [],
    links: []
})

export const Diagram = ({systems, links, checks}: IDiagram) => {
    const dispatch = useDispatch()

    //useRef를 통해 ref값을 직접 정의하고 react-dnd의 drop함수를 적용한다.
    //diagram의 실 좌표를 얻기위해 getBoundingClientRect를 사용해야하기 떄문이다.
    const ref = useRef<HTMLElement>(null)
    const [schema, {onChange, addNode, removeNode, connect}] = useSchema(initialSchema)

    useMount(() => {
        //Drag and Drop의 Drop 설정
        drop(ref)
    })

    useEffect(() => {
        systems?.forEach(system => {
            addNode({
                id: system.id,
                content: system.name,
                coordinates: [system.x, system.y],
                render: CustomNode,
                inputs: Array.from({length: 8}).map((_, index) => ({
                    id: system.id + `_port${index}`,
                })),
                outputs: []
            })
        })

        return () => {
            systems?.forEach(system => {
                removeNode({
                    id: system.id,
                    content: system.name,
                    coordinates: [system.x, system.y],
                    render: CustomNode,
                    inputs: Array.from({length: 8}).map((_, index) => ({
                        id: system.id + `_port${index}`,
                    })),
                    outputs: []

                })
            })
        }


    }, [systems])

    useEffect(() => {
        links?.forEach(link => {
            if( link.sourceId !== link.targetId ) {
                console.log("LINK : ", link)
                connect(link.sourceId, link.targetId)
            }
        })
    }, [links])

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "SKETCHER",
        drop: (system: System, monitor) => {
            dispatch(setSystem({...system, isAssigned: true}))
            const dropOffset = monitor.getClientOffset()
            const diagramOffset = ref.current?.getBoundingClientRect()

            //monitor.getClientOffset() returns x,y from DOM not diagram
            const {x, y} = !dropOffset || !diagramOffset ? {x: 0, y: 0} : {
                x: dropOffset.x - diagramOffset.x,
                y: dropOffset.y - diagramOffset.y
            }

            addNode({
                id: system.id,
                content: system.name,
                coordinates: [x, y],
                render: CustomNode,
                inputs: Array.from({length: 8}).map((_, index) => ({
                    id: system.id + `_port${index}`,
                })),
                outputs: []
            })
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    }))

    // useEffect(() => {
    //
    // }, [systems, links])

    // return React.cloneElement(props.children, props)
    return <StyledDiagram ref={ref}>
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

  @keyframes BiDashSegmentAnimation {
    from {
      stroke-dashoffset: 24;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
`
