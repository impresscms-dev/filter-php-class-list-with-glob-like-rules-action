export class NoClassesMatchesIncludeRulesError extends Error {
  constructor() {
    super('No classes match include rules')
  }
}