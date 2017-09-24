const { fromPairs } = require("lodash");

function parseGroup(group) {
  const lines = group.split("\n").filter(line => line.trim() !== "");
  const comments = lines.filter(line => line.match(/^#/));
  const rules = lines.filter(line => !line.match(/^#/));

  const l10n = rules.map(rule => {
    const [key, value] = rule.split("=");
    return { key, value };
  });

  return { comments, l10n };
}

function parse(text) {
  return text.split(/\n{2,}/).map(parseGroup);
}

module.exports = { parse };
