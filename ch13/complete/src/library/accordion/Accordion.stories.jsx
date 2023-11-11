import { Accordion } from "./Accordion";

export default {
  title: "Library/Accordion",
  component: Accordion,
  argTypes: {
    activeIndex: {
      control: "select",
      options: [-1, 0, 1, 2, 3],
    },
    isCollapsible: { control: "boolean" },
    allowsMultiple: { control: "boolean" },
    children: { control: "none" },
  },
  args: {
    children: (
      <>
        <Accordion.Item>
          <Accordion.Header>First element</Accordion.Header>
          <Accordion.Content>
            The first element is the most important one.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Second element</Accordion.Header>
          <Accordion.Content>
            The second element is the most important one.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Third element</Accordion.Header>
          <Accordion.Content>
            The third element is the most important one.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Fourth element</Accordion.Header>
          <Accordion.Content>
            The fourth element is the most important one.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = { args: { activeIndex: 0 } };
export const AllCollapsed = { args: { activeIndex: -1 } };
export const Collapsible = {
  args: { isCollapsible: true, activeIndex: 2 },
};
export const MultiExpand = { args: { allowsMultiple: true } };
