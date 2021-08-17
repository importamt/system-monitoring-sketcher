import {IModifying, Modifying} from "./Modifying";
import {Meta, Story} from "@storybook/react";
import {IResolutionForStory, RESOLUTION_FHD, RESOLUTION_HD} from "../../utils";

export default {
    component: Modifying,
    title: 'Pages/Modifying'
} as Meta

const Template: Story<IModifying & IResolutionForStory> = args => <div style={args.resolution}>
    <Modifying/>
</div>

export const Hd = Template.bind({})
Hd.args = {
    resolution: RESOLUTION_HD
}

export const Fhd = Template.bind({})
Fhd.args = {
    resolution: RESOLUTION_FHD
}