import {debug, getInput} from '@actions/core'
import fs, {writeFileSync} from 'fs'
import {EOL} from 'os'
import {debugRules} from './helpers/output'
import Matcher from './helpers/matcher'

const inputFile = getInput('input_file')
const outputFile = getInput('output_file')
const rulesFile = getInput('rules_file')

debug('Reading rules...')
const include = fs.readFileSync(rulesFile, 'utf8').split(EOL)

const matcher = new Matcher()

const allRules = matcher.sortGoodBadRules(
    matcher.convertToCorrectFormat(include)
)

debugRules('Include rules', allRules.good)
debugRules('Do not include rules', allRules.bad)

debug('Reading input file...')
const srcClasses = fs.readFileSync(inputFile, 'utf8').split(EOL)

debug('Matching classes...')
const classes = matcher.matchClasses(srcClasses, allRules)

debug('Writing results...')
writeFileSync(outputFile, classes.join(EOL))

debug('Done.')
