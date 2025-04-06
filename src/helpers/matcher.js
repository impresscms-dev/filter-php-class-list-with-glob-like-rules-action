import {RulesBuckets} from '../entities/rules-buckets';
import picomatch from 'picomatch';
import {NoClassesMatchesIncludeRulesError} from '../errors/NoClassesMatchesIncludeRulesError';

export class Matcher {

    convertToCorrectFormat(rules) {
        return rules.map(
            (key) => key.replace(/\\/g, '/')
        )
    }

    filterOnlyBadRules(rules) {
        return rules
            .filter(rule => rule.startsWith('!'))
            .map(rule => rule.substring(1))
    }

    filterOnlyGoodRules(rules) {
        return rules
            .filter(rule => !rule.startsWith('!'))
    }

    sortGoodBadRules(rules) {
        return new RulesBuckets(
            this.filterOnlyGoodRules(rules),
            this.filterOnlyBadRules(rules)
        )
    }

    matchClasses(classes, rules) {
        const ret = classes
            .filter(key => key !== null)
            .map(key => key.replace(/\\/g, '/'))
            .filter(key => picomatch.isMatch(key, rules.good))
            .filter(key => !picomatch.isMatch(key, rules.bad))
            .map(key => key.replace(/\//g, '\\'))


        if (ret.length === 0) {
            throw new NoClassesMatchesIncludeRulesError()
        }

        return ret
    }

}
