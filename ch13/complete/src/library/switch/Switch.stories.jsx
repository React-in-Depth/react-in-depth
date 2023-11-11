import { Switch } from ".";

export default {
  title: "Library/Switch",
  component: Switch,
  argTypes: {
    label: { control: "text" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
};

export const Default = { args: { label: "Enable Wifi" } };

export const Prechecked = {
  args: { label: "Pets allowed", defaultChecked: true },
};

export const DisabledUnchecked = {
  args: {
    label: "Unplug the internet",
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: "Power to the people",
    defaultChecked: true,
    disabled: true,
  },
};
