import React from "react";
import {HelloWorld, IHelloWorld} from "./HelloWorld";
import {Meta, Story} from "@storybook/react";

export default {
    component: HelloWorld,
    title: 'Components/atom/HelloWorld'
} as Meta

const Template: Story<IHelloWorld> = args => <HelloWorld {...args}/>

export const Default = Template.bind({})
Default.args = {
    color: 'white',
    background: 'darkblue',
}

export const Brighter = Template.bind({})
Brighter.args = {
    ...Default.args,
    color: 'black',
    background: 'lightblue',
}