import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import 'beautiful-react-diagrams/styles.css';
import {createSchema, Diagram as BeautifulDiagram, useSchema} from 'beautiful-react-diagrams';
import {System} from "../../../store/system";
import {useDrop} from "react-dnd";

export interface IDiagram {
    systems?: System[]
}

const initialSchema = createSchema({
    nodes: [
        {id: 'node-1', content: 'Node 1', coordinates: [250, 60],},
        {id: 'node-2', content: 'Node 2', coordinates: [100, 200],},
        {id: 'node-3', content: 'Node 3', coordinates: [250, 220],},
        {id: 'node-4', content: 'Node 4', coordinates: [400, 200],},
    ],
    links: [
        {input: 'node-1', output: 'node-2'},
        {input: 'node-1', output: 'node-3'},
        {input: 'node-1', output: 'node-4'},
    ]
});
export const Diagram = (props: IDiagram) => {
    //useRef를 통해 ref값을 직접 정의하고 react-dnd의 drop함수를 적용한다.
    //diagram의 실 좌표를 얻기위해 getBoundingClientRect를 사용해야하기 떄문이다.
    const ref = useRef<HTMLElement>(null)
    useEffect(() => {
        drop(ref)
    }, [])

    const [schema, {onChange, addNode}] = useSchema(initialSchema)
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "HELLO",
        drop: (system: System, monitor) => {
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
                outputs: [
                    {
                        id: system.id + "_port",
                        alignment: "right"
                    }
                ]
            })
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    }))

    // return React.cloneElement(props.children, props)
    return <StyledDiagram ref={ref}>
        <BeautifulDiagram schema={schema} onChange={onChange}/>
    </StyledDiagram>
}

const StyledDiagram = styled.figure`
  display: flex;
  flex: 5;
  background: #1ea7fd;
  width: 100%;
  height: 100%;
`
