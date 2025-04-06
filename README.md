[![License](https://img.shields.io/github/license/impresscms-dev/filter-php-class-list-with-glob-like-rules-action.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/release/impresscms-dev/filter-php-class-list-with-glob-like-rules-action.svg)](https://github.com/impresscms-dev/filter-php-class-list-with-glob-like-rules-action/releases)

# Filter PHP class list with glob like rules

GitHub action to filter PHP class list with [Glob like syntax](https://en.wikipedia.org/wiki/Glob_(programming)).

We recommend using this GitHub action with [impresscms-dev/generate-php-project-classes-list-file-action](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action).

## Usage

To use this action in your project, create a workflow file similar to the example below (Note: you may need to adjust some parts and arguments to fit your specific needs):
```yaml
name: Get filtered PHP classes list

on:
  push:

jobs:
  get_filtered_php_classes_list:
    runs-on: ubuntu-latest
    steps:
      - name: Checkouting project code...
        uses: actions/checkout@v4

      - name: Install PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.1
          extensions: curl, gd, pdo_mysql, json, mbstring, pcre, session
          ini-values: post_max_size=256M
          coverage: none
          tools: composer:v2

      - name: Install Composer dependencies (with dev)
        run: composer install --no-progress --prefer-dist --optimize-autoloader

      - name: Getting PHP classes list...
        uses: impresscms-dev/generate-php-project-classes-list-file-action@v1.0.0
        with:
          output_file: ./php-classes.lst

      - uses: DamianReeves/write-file-action@v1.0
        with:
          path: ./filtering-rules.lst
          contents: |
            ImpressCMS\**
          write-mode: overwrite

      - name: Filtering PHP classes list...
        uses: impresscms-dev/filter-php-class-list-with-glob-like-rules-action@v2
        with:
          rules_file: ./filtering-rules.lst
          input_file: ./php-classes.lst
          output_file: ./php-classes-filtered.lst

      - uses: actions/upload-artifact@v3
        with:
          name: my-artifact
          path: ./php-classes-filtered.lst
```

## Arguments

This action supports the following arguments (specified under the `with` keyword in your workflow file):

| Argument    | Required | Default value        | Description                       |
|-------------|----------|----------------------|-----------------------------------|
| rules_file | Yes      |                      | File with rules list (each rule separate line - like [.gitignore](https://git-scm.com/docs/gitignore)) |
| input_file | Yes      |                      | File with PHP class names list |
| output_file | Yes      |                      | File where result will be written |

## How to contribute

Contributions are welcome! If you'd like to add new features or fix bugs:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Implement your changes
4. Submit a pull request

If you're new to this process, check out GitHub's [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) guides.

## Reporting issues

Found a bug or have a suggestion? Please use the [GitHub Issues](https://github.com/impresscms-dev/filter-php-class-list-with-glob-like-rules-action/issues) page to:

- Report bugs
- Request new features
- Ask questions about the project
