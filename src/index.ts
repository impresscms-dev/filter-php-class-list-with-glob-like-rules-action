import {debug, getInput} from '@actions/core'
import NoClassesMatchesIncludeRulesError from './errors/NoClassesMatchesIncludeRulesError'
// noinspection SpellCheckingInspection
import picomatch from 'picomatch'
import fs, {writeFileSync} from 'fs'
import {EOL} from 'os'
import {debugRules} from './helpers/output'

const inputFile = getInput('input_file')
const outputFile = getInput('output_file')
const rulesFile = getInput('rules_file')

debug('Reading rules...')
const include = fs.readFileSync(rulesFile, 'utf8').split(EOL)

let changedIncludeRules = include.map(key => key.replace(/\\/g, '/'))

const badChangedIncludeRules = changedIncludeRules
  .filter(rule => rule.startsWith('!'))
  .map(rule => rule.substring(1))

changedIncludeRules = changedIncludeRules.filter(
  rule => !badChangedIncludeRules.includes(rule.substring(1))
)

debugRules('Include rules', changedIncludeRules)
debugRules('Do not include rules', badChangedIncludeRules)

debug('Reading input file...')
const srcClasses = fs.readFileSync(inputFile, 'utf8').split(EOL)

debug('Matching classes...')
const classes = srcClasses
  .filter(key => key !== null)
  .map(key => key.replace(/\\/g, '/'))
  .filter(key => picomatch.isMatch(key, changedIncludeRules))
  .filter(key => !picomatch.isMatch(key, badChangedIncludeRules))
  .map(key => key.replace(/\//g, '\\'))

if (classes.length === 0) {
  throw new NoClassesMatchesIncludeRulesError()
}

debug('Writing results...')
writeFileSync(outputFile, classes.join(EOL))

debug('Done.')
