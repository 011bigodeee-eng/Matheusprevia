import type { KeyboardEvent } from "react";
/** Keep keyboard navigation within an open modal, including Tab wrapping. */
export function containDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    ),
  ).filter((el) => el.getClientRects().length > 0);
  const first = items[0];
  const last = items[items.length - 1];
  if (!first) {
    event.preventDefault();
    return;
  }
  if (
    event.shiftKey &&
    (document.activeElement === first ||
      document.activeElement === event.currentTarget)
  ) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
