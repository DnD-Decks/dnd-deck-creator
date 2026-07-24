import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DeckView } from "./deck-view.component.tsx";

test("wizard deck renders a 'Cantrips' section heading", () => {
  render(<DeckView cls="wizard" />);
  screen.getByRole("heading", { name: /cantrips/i, level: 2 });
});

test("wizard deck renders a 'Level 1' section heading (L1-only scope)", () => {
  render(<DeckView cls="wizard" />);
  screen.getByRole("heading", { name: /level 1/i, level: 2 });
});

test("wizard deck has no 'Level 2' section heading (L1-only scope)", () => {
  render(<DeckView cls="wizard" />);
  const level2 = screen.queryByRole("heading", { name: /level 2/i, level: 2 });
  expect(level2).toBeNull();
});

test("wizard deck contains the Fire Bolt spell card", () => {
  render(<DeckView cls="wizard" />);
  screen.getByRole("heading", { name: /fire bolt/i, level: 3 });
});

test("class without vendored cards renders the empty-state message", () => {
  render(<DeckView cls="monk" />);
  screen.getByText(/no cards vendored for monk/i);
});
