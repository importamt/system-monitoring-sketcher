import {GlobalStyles} from "../src/styles";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {createStore} from "../src/store";
import {Provider} from "react-redux";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
const store = createStore()
export const decorators = [
    Story => (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <GlobalStyles/>
                <Story/>
            </DndProvider>
        </Provider>
    )
]