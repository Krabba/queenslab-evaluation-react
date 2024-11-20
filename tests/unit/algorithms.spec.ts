import fs from "fs";
import path from "path";
import { describe, expect, test } from "vitest";
import { maximumOddSum, removeIdenticalLetters } from "../../src/algorithms";

describe("removeIdenticalLetters works", () => {
  test("Base case", () => {
    const result = removeIdenticalLetters("ffdttttyy");
    expect(result).toBe("ffdtttyy");
  });

  test("Multiple entries", () => {
    const result = removeIdenticalLetters("iiiikigggg");
    expect(result).toBe("iiikiggg");
  });

  test("From file", async () => {
    const file = await fs.readFileSync(path.join(__dirname, "letters.txt"), {
      encoding: "utf-8",
    });
    const result = removeIdenticalLetters(file);
    expect(result).toBe("eqqqe");
  });
});

describe("maximumOddSum works", () => {
  test("Base case", () => {
    const result = maximumOddSum([19, 2, 42, 18]);
    expect(result).toBe(61);
  });

  test("From file", async () => {
    const file = JSON.parse(
      await fs.readFileSync(path.join(__dirname, "array.json"), {
        encoding: "utf8",
      })
    ) as { test: number[] };
    const result = maximumOddSum(file.test);
    expect(result).toBe(61);
  });
});
