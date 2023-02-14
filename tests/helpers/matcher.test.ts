import Matcher from "../../src/helpers/matcher";
import {describe} from "node:test";
import {match} from "assert";
import RulesBuckets from "../../src/entities/rules-buckets";
import exp = require("constants");

describe(
    "Testing matcher",
    () => {

        const matcher = new Matcher()

        test(
            "converting to correct format",
            () => {
                const rules: string[] = [
                    "Something\\Something",
                    "That\\**",
                ]
                const escaped: string[] = matcher.convertToCorrectFormat(rules)

                expect(escaped.join(",")).toContain("/")
                expect(escaped.join(",")).not.toContain("\\")
            }
        )

        test(
            "sort good bad rules",
            () => {
                const rules: string[] = [
                    "Something\\**",
                    "That\\**",
                    "!Something\\Something",
                ]

                const sorted: RulesBuckets = matcher.sortGoodBadRules(rules)

                expect(sorted.good).toHaveLength(2)
                expect(sorted.bad).toHaveLength(1)
                expect(sorted.bad.join(";")).toBe("Something\\Something")
            }
        )

    }
)