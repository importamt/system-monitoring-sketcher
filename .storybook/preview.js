import {GlobalStyles} from "../src/styles";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    Story => (
        <DndProvider backend={HTML5Backend}>
            <GlobalStyles/>
            <Story/>
        </DndProvider>
    )
]