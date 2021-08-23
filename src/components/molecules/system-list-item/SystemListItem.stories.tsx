import {ISystemListItem, SystemListItem} from "./SystemListItem";
import {Meta, Story} from "@storybook/react";
import {RESOLUTION_TINY} from "../../../utils";

export default {
    component: SystemListItem,
    title: 'Components/molecules/SystemListItem'
} as Meta

const Template: Story<ISystemListItem> = args => <div style={RESOLUTION_TINY}>
    <SystemListItem system={args.system}/>
</div>

export const Default = Template.bind({})
Default.args = {
    system: {
        id: 'abc',
        name: 'HELLO',
        url: 'https://google.com',
        x: 10,
        y: 50,
        isAssigned: true
    }
}

export const Loading = Template.bind({})