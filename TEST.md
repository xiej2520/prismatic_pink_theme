# Markdown Theme Test File
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

Alt-H1
======

Alt-H2
------

text
`inline code`

```
markup.fenced_code.block.markdown
```

```fenced_code.block.language
```

```rust
println!("code")
```

```md { attributes go here }
a code block with attributes
```

```{=markdown}
raw
```

\*\*\[escape inline\]\_\_

*italic inline*
**bold inline**
~~strikethrough inline~~
*a **bold** > italic* inline
**a *italic* > bold** inline
**a bold > ~~strikethrough~~** inline
~~a strikethrough > **bold**~~ inline
*a italic > ~~strikethrough~~* inline
~~a strikethrough > *italic*~~ inline
**a bold > *italic > ~~strikethrough~~*** inline
**a bold > ~~strikethrough > *italic*~~** inline
*a italic > **bold > ~~strikethrough~~*** inline
*a italic > ~~strikethrough > **bold**~~* inline
~~a strikethrough > **bold > *italic***~~ inline
~~a strikethrough > *italic > **bold***~~ inline

**a bold > `inline code`** inline
*a italic > `inline code`* inline
***a bold italic > `inline code`*** inline
~~a strikethrough > `inline code`~~ inline

$math delimiter$
$$math delimiter line$$

> Block Quote
> asdfkjasdlf;kj
>
> Block Quote

separator:

---

***

___

- <- list point
- unordered list
  * unordered sublist
  + sublist
  - sublist
1. ordered list
2. ordered list 2

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

[www.url.inline.link](Url_Inline_Title "Url Inline description")

https://www.google.com
<https://www.google.com>

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| git diff | Show file differences that haven't been staged |

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |

| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

<punctuation>
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
</punctuation>

