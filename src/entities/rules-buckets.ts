class RulesBuckets {

    readonly bad: string[]
    readonly good: string[]

    constructor(goodRules: string[], badRules: string[]) {
        this.good = goodRules
        this.bad = badRules
    }

}

export default RulesBuckets