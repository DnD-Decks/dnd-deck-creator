import { render, screen } from "@testing-library/react";
import { decks } from "src/decks/deck.model";
import { classes } from "src/models/class/classes.model";
import { afterEach, expect, test, vi } from "vitest";
import { DeckView } from "./deck-view.component.tsx";

afterEach(() => {
  vi.restoreAllMocks();
});

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

test("a deck without cards renders the empty-state message", () => {
  // every class now has vendored cards, so an empty deck only exists as a stub
  vi.spyOn(decks, "get").mockReturnValue({ cls: classes.get({ id: "ranger" }), cards: [] });
  render(<DeckView cls="ranger" />);
  screen.getByText(/no cards vendored for ranger/i);
});
