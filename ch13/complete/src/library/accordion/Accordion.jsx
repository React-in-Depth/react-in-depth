import styled from "styled-components";
import { Item, Content, Header, ItemContext } from "./AccordionItem";
import { AccordionContext } from "./AccordionContext";
import { useKeyboard } from "./useKeyboard";
import { useAccordionContext } from "./useAccordionContext";

const AccordionElement = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid rgb(var(--color-primary));
  padding: 6px;
  border-radius: 6px;
  text-align: left;
`;

export function Accordion({
  activeIndex: defaultActiveIndex = 0,
  isCollapsible = false,
  allowsMultiple = false,
  children,
}) {
  const { contextValue, items } = useAccordionContext(
    isCollapsible,
    allowsMultiple,
    defaultActiveIndex
  );
  const { ref, onKeyDown } = useKeyboard(items);

  return (
    <AccordionElement ref={ref} onKeyDown={onKeyDown}>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </AccordionElement>
  );
}

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;
