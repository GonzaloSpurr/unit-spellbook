import { expect, test } from "vitest";
import Spell from "../domain/Spell";
import Spellbook from "../domain/Spellbook";

const spellName: string = "Lumos";
const spellDescription: string = "Ilumina la punta de la varita";
const lumos = new Spell(spellName, spellDescription, "book");

const emptyBook = new Spellbook();

const book = new Spellbook();
book.addspell(lumos);

test("Adding a new spell to a Spellbook succeeds", () => {
  expect(() => emptyBook.addspell(lumos));
});

test("Adding the same spell to a Spellbook twice fails", () => {
  expect(() => book.addspell(lumos)).toThrow();
});

test("Capitilization matters when adding a spell to a spellbook", () => {
  const lumos2 = new Spell("lUMOS", "Ilumina solo la varita", "book");
  expect(() => book.addspell(lumos2)).toThrow();
});

test("A spellbook remembers it's spells", () => {
  let spells;
  expect((spells = book.getSpells()));
  expect(spells.length).toBe(1);
  expect(spells[0].describe()).includes(spellName);
});

test("A spellbook returns a copy of a spell", () => {
  let mySpell = new Spell("Lumos", "Ilumina la punta de la varita", "book");
  const myBook = new Spellbook();
  myBook.addspell(mySpell);
  const spell = myBook.getSpells()[0];
  mySpell = new Spell("Nullo", "no hace nada", "book");
  expect(spell === mySpell).toBeFalsy();
});

test("Can search a spellbook by origin", () => {
  let spells;
  expect((spells = book.findByOrigin("book")));
  expect(spells.length).toBe(1);
  expect(spells[0].describe()).includes(spellName);
  let emtpySpells;
  expect((emtpySpells = book.findByOrigin("movie")));
  expect(emtpySpells.length).toBe(0);
});

test("Can count how many spells of each origin a spellbook has", () => {
  let count;
  expect((count = book.countByOrigin()));
  expect(count.book).toBe(1);
  expect(count.movie).toBe(0);
  expect(count.videogame).toBe(0);
});
