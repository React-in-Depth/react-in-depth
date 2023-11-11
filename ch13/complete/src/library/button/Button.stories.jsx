import { Button } from "./Button";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

export default {
  title: "Library/Button",
  component: Button,
  argTypes: {
    children: { control: "text", name: "Button label" },
    variant: {
      control: "select",
      options: ["regular", "outline", "ghost"],
      name: "Variant",
    },
    disabled: { control: "boolean", name: "Is it disabled?" },
    isIconFirst: { control: "boolean", name: "Is the icon first?" },
    icon: { control: "none" },
  },
};

export const Default = { args: { children: "Regular button" } };

export const Outline = {
  args: { variant: "outline", children: "Fancy outline" },
};

export const Ghost = {
  args: { variant: "ghost", children: "Ghost-like!" },
};

export const Disabled = {
  args: { disabled: true, children: "I'm disabled" },
};

export const WithIcon = {
  args: { children: "Send", icon: <FaPaperPlane /> },
};

export const WithStartIcon = {
  args: {
    children: "Profile",
    isIconFirst: true,
    icon: <FaUserCircle />,
  },
};
