import {ISystemList, SystemList} from "./SystemList";
import {Meta, Story} from "@storybook/react";
import {RESOLUTION_SD} from "../../../utils";


export default {
    component: SystemList,
    title: 'Components/organisms/SystemList'
} as Meta

const Template: Story<ISystemList> = args => <div style={RESOLUTION_SD}>
    <SystemList systems={args.systems}/>
</div>

export const Default = Template.bind({})
Default.args = {
    systems: [{
        systemId: 'abc1',
        name: 'HELLO1',
        url: 'https://google.com',
        x: 10,
        y: 50,
        isAssigned: true
    }, {
        systemId: 'abc2',
        name: 'HELLO2',
        url: 'https://google.com',
        x: 10,
        y: 50,
        isAssigned: true
    }, {
        systemId: 'abc3',
        name: 'HELLO3',
        url: 'https://google.com',
        x: 10,
        y: 50,
        isAssigned: true
    }, ]
}

export const Loading = Template.bind({})
