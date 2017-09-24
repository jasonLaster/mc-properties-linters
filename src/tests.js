function getCommentKey(group) {
  const { comments, l10n } = group;

  const firstComment = comments[0];

  const match = firstComment.match(/^# LOCALIZATION NOTE \((\w+)\): /);
  if (!match) {
    return false;
  }

  return match[1];
}

function checkKey(group) {
  const { comments, l10n } = group;
  const commentKey = getCommentKey(group);

  return l10n.every(({ key }) => key.includes(commentKey));
}

function hasLabel(group) {
  const { comments, l10n } = group;
  return !!getCommentKey(group);
}

function testGroup(group) {
  const { comments } = group;

  const _hasLabel = hasLabel(group);

  if (!_hasLabel) {
    return `Oops, missing a label.\n${comments[0]}`;
  }

  const _checkKey = checkKey(group);
  if (!_checkKey) {
    return `Oops, an incorrect key.\n ${comments[0]}`;
  }

  return false;
}

function testFile(groups) {
  const failedGroups = groups.map(testGroup).filter(i => i);

  if (failedGroups.length == 0) {
    return true;
  }

  return failedGroups.join("\n\n");
}

module.exports = { hasLabel, checkKey, testGroup, testFile };
