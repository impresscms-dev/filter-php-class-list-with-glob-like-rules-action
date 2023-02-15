import RulesBuckets from "../entities/rules-buckets"
import picomatch from "picomatch"
import NoClassesMatchesIncludeRulesError from "../errors/NoClassesMatchesIncludeRulesError"

class Matcher {

    convertToCorrectFormat(rules: string[]): string[] {
        return rules.map(
            (key) => key.replace(/\\/g, '/')
        )
    }

    protected filterOnlyBadRules(rules: string[]): string[] {
        return rules
            .filter(rule => rule.startsWith('!'))
            .map(rule => rule.substring(1))
    }

    protected filterOnlyGoodRules(rules: string[]): string[] {
        return rules
            .filter(rule => !rule.startsWith('!'))
    }

    sortGoodBadRules(rules: string[]): RulesBuckets {
        return new RulesBuckets(
            this.filterOnlyGoodRules(rules),
            this.filterOnlyBadRules(rules)
        )
    }

    matchClasses(classes: string[], rules: RulesBuckets): string[] {
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

export default Matcher
