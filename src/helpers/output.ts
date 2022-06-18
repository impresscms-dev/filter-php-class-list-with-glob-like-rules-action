import {debug} from '@actions/core'

export function debugRules(firstLine: string, rules: string[]): void {
  debug(firstLine + ':')
  if (rules.length > 0) {
    for (const rule of rules) {
      debug('  [*] '.concat(rule).replace(/\//g, '\\'))
    }
  } else {
    debug('  (none)')
  }
}
