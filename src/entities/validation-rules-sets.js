export class ValidationRulesSets {

  /**
   * @param {string[]} goodRules
   * @param {string[]} badRules
   */
    constructor(goodRules, badRules) {
        this.good = goodRules;
        this.bad = badRules;
    }

}