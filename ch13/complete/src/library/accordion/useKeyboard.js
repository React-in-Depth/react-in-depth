import { useRef } from "react";

export function useKeyboard(items) {
  const focus = (index) => {
    const target = ref.current?.querySelectorAll("button[data-header]")[
      index
    ];
    target?.focus();
  };
  const ref = useRef(null);
  const getCurrentFocus = () => {
    const item = document.activeElement.closest("article");
    const index = Array.from(item.parentNode.children).indexOf(item);
    return index;
  };
  const onKeyDown = (evt) => {
    const currentIndex = getCurrentFocus();
    switch (evt.key.toLowerCase()) {
      case "arrowup":
        focus(
          (currentIndex - 1 + items.current.length) %
            items.current.length
        );
        break;
      case "arrowdown":
        focus((currentIndex + 1) % items.current.length);
        break;
      case "home":
        focus(0);
        break;
      case "end":
        focus(items.current.length - 1);
        break;
      default:
        break;
    }
  };
  return { ref, onKeyDown };
}
