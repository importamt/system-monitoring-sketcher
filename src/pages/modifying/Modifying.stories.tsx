import {IModifying, Modifying} from "./Modifying";
import {Meta, Story} from "@storybook/react";

export default {
    component: Modifying,
    title: 'Pages/Modifying'
} as Meta

const Template: Story<IModifying> = args => <div style={{width: '1280px', height: '720px'}}>
    <Modifying {...args}/>
</div>

export const Default = Template.bind({})
