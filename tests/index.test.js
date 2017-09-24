const fs = require("fs");
const path = require("path");
const { parse } = require("../src/parse");

const { hasLabel } = require("../src/tests");

function getSource(name) {
  return fs.readFileSync(path.join(__dirname, `./fixtures/${name}`), "utf8");
}

describe("parsing", () => {
  it("simple", () => {
    const text = getSource("simple.txt");
    const data = parse(text);
    expect(data).toMatchSnapshot();
  });

  it("bad", () => {
    const text = getSource("bad.txt");
    const data = parse(text);
    expect(data).toMatchSnapshot();
  });
});
