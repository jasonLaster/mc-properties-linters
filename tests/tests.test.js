const fs = require("fs");
const path = require("path");
const { parse } = require("../src/parse");

const { hasLabel, checkKey, testGroup, testFile } = require("../src/tests");

function getSource(name) {
  return fs.readFileSync(path.join(__dirname, `./fixtures/${name}`), "utf8");
}

describe("tests", () => {
  describe("hasLabel", () => {
    it("good", () => {
      const text = getSource("simple.txt");
      const groups = parse(text);

      expect(hasLabel(groups[0])).toBe(true);
    });

    it("bad", () => {
      const text = getSource("bad.txt");
      const groups = parse(text);

      expect(hasLabel(groups[0])).toBe(false);
    });
  });

  describe("checkKey", () => {
    it("good", () => {
      const text = getSource("simple.txt");
      const groups = parse(text);

      expect(checkKey(groups[0])).toBe(true);
    });

    it("bad", () => {
      const text = getSource("bad.txt");
      const groups = parse(text);

      expect(checkKey(groups[1])).toBe(false);
      expect(checkKey(groups[2])).toBe(false);
    });
  });

  describe("testGroup", () => {
    it("good", () => {
      const text = getSource("simple.txt");
      const groups = parse(text);

      expect(testGroup(groups[0])).toBe(false);
      expect(testGroup(groups[1])).toBe(false);
    });

    fit("bad", () => {
      const text = getSource("bad.txt");
      const groups = parse(text);
      expect(testGroup(groups[0])).toMatchSnapshot();
      expect(testGroup(groups[1])).toMatchSnapshot();
      expect(testGroup(groups[2])).toMatchSnapshot();
    });
  });

  describe("testFile", () => {
    it("good", () => {
      const text = getSource("simple.txt");
      const groups = parse(text);

      expect(testFile(groups)).toBe(true);
    });

    it("bad", () => {
      const text = getSource("bad.txt");
      const groups = parse(text);
      expect(testFile(groups)).toMatchSnapshot();
    });
  });
});
