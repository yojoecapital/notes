# Words and Pattern Matching

[toc]

## Regular Expressions :happy:

a formal language for specifying text strings

### Disjunctions

- letters inside square brackets `[]`
  - `[wW]oodchuck` matches on <span style="color:orange">Woodchuck</span>, <span style="color:orange">woodchuck</span>
  - `[0123456789]` matches on any single digit
- ranges `[A-Z]`
  - `[A-Z]` matches on any uppercase letter
  - `[a-z]` matches on any lowercase letter
  - `[A-Za-z]` matches on any letter
  - `[0-9]` matches on any single digit
- negations `[^Ss]`
  - `[^Ss]` matches on neither <span style="color:orange">S</span> or <span style="color:orange">s</span>
  - `[^A-z]` matches on any *not* uppercase letter

### Special Characters `? * + .`

| Pattern   | Description                     | Matches                                                      |
| --------- | ------------------------------- | ------------------------------------------------------------ |
| `colou?r` | optional previous character     | <span style="color:orange">color</span>, <span style="color:orange">colour</span> |
| `o*h!`    | 0 or more of previous character | <span style="color:orange">h!</span>, <span style="color:orange">oooooh!</span> |
| `o+h!`    | 1 or more of previous character | <span style="color:orange">oh!</span>, <span style="color:orange">oooooh!</span> |
| `beg.n`   | any character                   | <span style="color:orange">began</span>, <span style="color:orange">beg3n</span> |
| `\.`      | escape character                | period<span style="color:orange">.</span>                    |

### Anchors `^ $`

| Pattern  | Description     | Matches                                                      |
| -------- | --------------- | ------------------------------------------------------------ |
| `^[A-Z]` | start of string | <span style="color:orange">P</span>alo Alto                  |
| `.$`     | end of string   | the end<span style="color:orange">?</span>, the en<span style="color:orange">d</span> |

### Character Classes

| Pattern     | Description                       |
| ----------- | --------------------------------- |
| `\s`        | a whitespace character            |
| `\S`        | a non-whitespace character        |
| `\d`        | a digit `[0-9]`                   |
| `\D`        | a non-digit                       |
| `\w`        | a "word" character `[0-9a-zA-Z_]` |
| `\W`        | a non-word character              |
| `[:upper:]` | an upper-case character `[A-Z]`   |
| `[:lower:]` | a lower-case character `[a-z]`    |

### Backreference `(...)...\n`

- sometimes we want to know which part of the text matched a part of a pattern
- we can even use it within the pattern itself, by "capturing it" in parenthesis
  - `(...)` captures some pattern
  - `\1` grabs the first captured pattern

| Pattern            | Matches                                          | Description                                                  |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `(\d)[a-z]\1`      | fjsjga<span style="color:orange">1a1</span>fdsga | a letter bracketed by the <br />same number on each side     |
| `^(\d)(\d).*\2\1$` | <span style="color:orange">13woqietoiwq31</span> | A line starting with two digits, <br />and ending with those two digits <br />in reverse order |

<hr>

## Text Normalization

1. segmenting / tokenizing words in running text
2. normalizing word formats
3. segmenting sentences in running text

### Tokenization

- **Type** is an element of the vocabulary (i.e. the unique words)
- **Token** is an instance of a that type in running text

> "they lay back on the San Francisco grass and looked at the stars and their"
>
> - 15 tokens and 13 types

#### Tokenization: Language Issues

- French: `L'ensemble` is one or two tokens?
- German: `Lebensversicherungsgesellschaftsangestellter` translates to – "life insurance company employee"
  - we need a compound splitter
- Chinese and Japanese: `莎拉波娃现在居住在美国东南部的佛罗里达。` no spaces between words 

##### Maximum Matching Word Segmentation Algorithm

This is greedy algorithm to segment strings with no delimiters

>1. Start a pointer at the beginning of the string
>2. Find the longest word in dictionary that matches the string starting at pointer
>3. Move the pointer over the word in string
>4. Go to 2

- this works well in Chinese 
- doesn't generally work in English!
  - `Thecatinthehat` → `the cat in the hat` :+1:
  - `Thetabledownthere` → `theta bled own there` :-1:

### Word Normalization & Stemming

#### Normalization

- we want to match `USA` and `U.S.A.`
- reducing all letters to lowercase has issues like:
  - `SAT` (the test) → `sat` (the verb)
  - `US` (united states) → `us`

#### Lemmatization

- reduce **inflections** or variant forms to base form
  - `am, are, is` → `be`
  - `car, cars, car's, cars'` → `car`
- this is based on *morphemes* from *morphology*
  - the small meaningful units that make up words
  - **stems** are the core meaning-baring units
  - **affixes** are bits and pieces that adhere to stems
    - usually grammatical functions

#### Stemming

- reduce terms to their stems
- *stemming* is crude chopping of affixes
  - `automate(s), automatic, automation` → `automat`
- this works well for English but not languages with complex morphology

### Sentence Segmentation

- some NLP process are unable to take very large strings
- because of this, we can break sentences

#### Where to break?

- `! ?` are relatively unambiguous
- `.` is *very* ambiguous
  - sentence boundary
  - abbreviations like "Dr."
  - numbers like "1.00%"
- build a classifier
  - looks at `.`
  - decides if its end of sentence or not

<img src="images/image-20230905135408569.png" alt="image-20230905135408569" style="zoom:67%;" />
