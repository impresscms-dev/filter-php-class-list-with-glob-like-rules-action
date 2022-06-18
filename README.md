[![License](https://img.shields.io/github/license/impresscms-dev/filter-php-class-list-with-glob-like-rules-action.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/release/impresscms-dev/filter-php-class-list-with-glob-like-rules-action.svg)](https://github.com/impresscms-dev/filter-php-class-list-with-glob-like-rules-action/releases)

# Filter PHP class list with glob like rules

GitHub action to filter PHP class list with [Glob like syntax](https://en.wikipedia.org/wiki/Glob_(programming)).

We recommend to use this GitHub action with [impresscms-dev/generate-php-project-classes-list-file-action](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action).

## Usage

To use this action in your project, create workflow in your project similar to this code (Note: some parts and arguments needs to be altered):
```yaml
name: Get filtered PHP classes list

on:
  push:

jobs:
  get_filtered_php_classes_list:
    runs-on: ubuntu-latest
    steps:
      - name: Checkouting project code...
        uses: actions/checkout@v2
        
      - name: Install PHP
        uses: shivammathur/setup-php@master
        with:
          php-version: 8.1
          extensions: curl, gd, pdo_mysql, json, mbstring, pcre, session
          ini-values: post_max_size=256M
          coverage: none
          tools: composer:v2
          
      - name: Install Composer dependencies (with dev)
        run: composer install --no-progress --no-suggest --prefer-dist --optimize-autoloader       
          
      - name: Getting PHP classes list...
        uses: impresscms-dev/generate-php-project-classes-list-file-action@v0.1
        with:
          output_file: ./php-classes.lst
          
      - uses: DamianReeves/write-file-action@v1.0
        with:
          path: ./filtering-rules.lst
          contents: |
            ImpressCMS\**
          write-mode: overwrite
      
      - name: Filtering PHP classes list...
        use: impresscms-dev/filter-php-class-list-with-glob-like-rules-action@v0.1
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

This action supports such arguments (used in `with` keyword):
| Argument    | Required | Default value        | Description                       |
|-------------|----------|----------------------|-----------------------------------|
| rules_file | Yes      |                      | File with rules list (each rule separate line - like [.gitignore](https://git-scm.com/docs/gitignore)) |
| input_file | Yes      |                      | File with PHP class names list |
| output_file | Yes      |                      | File where result will be written |

## How to contribute? 

If you want to add some functionality or fix bugs, you can fork, change and create pull request. If you not sure how this works, try [interactive GitHub tutorial](https://try.github.io).

If you found any bug or have some questions, use [issues tab](https://github.com/impresscms-dev/filter-php-class-list-with-glob-like-rules-action/issues) and write there your questions.

