const {debug} = require('@actions/core')

export function debugRules(firstLine, rules) {
  debug(firstLine + ':')
  if (rules.length > 0) {
    for (const rule of rules) {
      debug('  [*] '.concat(rule).replace(/\//g, '\\'))
    }
  } else {
    debug('  (none)')
  }
}
