#!/usr/bin/env node

const fs = require("fs");
const { parse } = require("../src/parse");
const { testFile } = require("../src/tests");
function checkFile(path) {
  const text = fs.readFileSync(path, "utf8");
  const groups = parse(text);
  return testFile(groups);
}

function checkPaths(paths) {
  const results = paths.map(path => {
    const result = checkFile(path);
    if (result === true) {
      return true;
    }

    console.log(result);
    return false;
  });

  const success = results.every(result => result);
  process.exit(success ? 0 : 1);
}

checkPaths(process.argv.slice(2));
