import { expect, test } from "vitest";
import Spell from "../domain/Spell";

const name: string = "Lumos";
const description: string = "Ilumina la punta de la varita";
const lumos = new Spell(name, description, "book");

test("A spell from a book is original", () => {
  expect(lumos.isOriginal()).toBeTruthy();
});

test("A spell returns it's origin label correctly", () => {
  expect(lumos.getOriginLabel()).toBe("Libro");
});

test("A spell description contains it's name and description", () => {
  expect(lumos.describe()).includes(name);
  expect(lumos.describe()).includes(description);
});

test("Spell descriptions are one line long", () => {
  expect(lumos.describe().split("\n").length).toBe(1);
});

test("Can't create spell with empty name", () => {
  expect(() => new Spell("", "No hace nada", "book")).toThrow();
});

test("Can't create spell with empty description", () => {
  expect(() => new Spell("Nullo", "", "book")).toThrow();
});

test("A spell's first appearance must be a book, movie, or game", () => {
  expect(() => new Spell("Nullo", "No hace nada", "radio")).toThrow();
});

test("Can't create spell with long description", () => {
  expect(
    () =>
      new Spell(
        "Pain",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "book",
      ),
  ).toThrow();
});
