import {Matcher} from '../../src/helpers/matcher';
import {NoClassesMatchesIncludeRulesError} from '../../src/errors/NoClassesMatchesIncludeRulesError';

describe(
    "Testing matcher",
    () => {

        const matcher = new Matcher()

        test(
            "converting to correct format",
            () => {
                const rules = [
                    "Something\\Something",
                    "That\\**",
                ]
                const escaped = matcher.convertToCorrectFormat(rules)

                expect(escaped.join(",")).toContain("/")
                expect(escaped.join(",")).not.toContain("\\")
            }
        )

        test(
            "sort good bad rules",
            () => {
                const rules = [
                    "Something\\**",
                    "That\\**",
                    "!Something\\Something",
                ]

                const sorted = matcher.sortGoodBadRules(rules)

                expect(sorted.good).toHaveLength(2)
                expect(sorted.bad).toHaveLength(1)
                expect(sorted.bad.join(";")).toBe("Something\\Something")
            }
        )

        test(
          "filter (at least one good)",
          () => {
            const rules = matcher.convertToCorrectFormat([
              "ImpressCMS\\Modules\\**",
              "!ImpressCMS\\Modules\\System\\**",
            ])

            const sorted = matcher.sortGoodBadRules(rules)

            const srcClasses = [
              "ImpressCMS\\Modules\\News\\NewsItem",
              "ImpressCMS\\Modules\\News\\Attachment",
              "ImpressCMS\\Modules\\Blog\\ContentItem",
              "ImpressCMS\\Modules\\Blog\\Attachment\\AttachmentFile",
              "ImpressCMS\\Modules\\Blog\\Attachment\\AttachmentData",
              "ImpressCMS\\Modules\\System\\Info",
              "Imponeer\\JustATest\\ContentItem",
            ]

            const dstClasses = matcher.matchClasses(srcClasses, sorted)

            expect(dstClasses).toHaveLength(5)
            expect(dstClasses.includes("Imponeer\\JustATest\\ContentItem")).toBeFalsy()
            expect(dstClasses.includes("ImpressCMS\\Modules\\System\\Info")).toBeFalsy()
          }
        )

      test(
        "filter (nothing good)",
        () => {
          const rules = matcher.convertToCorrectFormat([
            "ImpressCMS2\\Modules\\**",
            "!ImpressCMS2\\Modules\\System\\**",
          ])

          const sorted = matcher.sortGoodBadRules(rules)

          const srcClasses = [
            "ImpressCMS\\Modules\\News\\NewsItem",
            "ImpressCMS\\Modules\\News\\Attachment",
            "ImpressCMS\\Modules\\Blog\\ContentItem",
            "ImpressCMS\\Modules\\Blog\\Attachment\\AttachmentFile",
            "ImpressCMS\\Modules\\Blog\\Attachment\\AttachmentData",
            "ImpressCMS\\Modules\\System\\Info",
            "Imponeer\\JustATest\\ContentItem",
          ]
          const tryMatch = () => {
            try {
              matcher.matchClasses(srcClasses, sorted)
            } catch (e) {
              throw e
            }
          }

          expect(tryMatch).toThrow(NoClassesMatchesIncludeRulesError)
        }
      )

    }
)
