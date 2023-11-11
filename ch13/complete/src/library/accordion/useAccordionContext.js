import { useRef, useState, useMemo, useCallback } from "react";

function toggle(activeIndexes, index, allowsMultiple, isCollapsible) {
  const wasOn = activeIndexes.includes(index);
  if (allowsMultiple) {
    if (!wasOn) {
      return activeIndexes.concat([index]);
    } else {
      return activeIndexes.filter((oldIndex) => index !== oldIndex);
    }
  }
  if (!wasOn) {
    return [index];
  } else if (isCollapsible) {
    return [];
  }
  return activeIndexes;
}

export function useAccordionContext(
  isCollapsible,
  allowsMultiple,
  defaultActiveIndex
) {
  const [activeIndexes, setActiveIndexes] = useState(
    defaultActiveIndex > -1 ? [defaultActiveIndex] : []
  );
  const items = useRef([]);
  const click = (index) =>
    setActiveIndexes((oldActive) =>
      toggle(oldActive, index, allowsMultiple, isCollapsible)
    );
  const accordionId = useMemo(
    () => `accordion-${Math.random().toFixed(36).slice(2, 10)}`,
    []
  );
  const getIndex = useCallback(() => items.current.push(null) - 1, []);
  const registerItem = useCallback((index, node) => {
    items.current[index] = node;
  }, []);
  const contextValue = {
    getIndex,
    registerItem,
    getHeaderId: (index) => `${accordionId}-header-${index}`,
    getContentId: (index) => `${accordionId}-content-${index}`,
    click,
    checkIsActive: (index) => activeIndexes.includes(index),
  };

  return { contextValue, items };
}
