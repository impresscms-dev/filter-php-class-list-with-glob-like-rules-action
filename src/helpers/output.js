import {debug} from '@actions/core'

/**
 * @param {string} firstLine
 * @param {string[]} rules
 */
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
