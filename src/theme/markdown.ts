import { tok, type TextMateStyle } from "./textmate";
import type { SyntaxColors } from ".";

export function generateMarkdownColors(syntax: SyntaxColors, muted: boolean): TextMateStyle[] {
	// Muted plaintext: gray text, and code isn't bold.
	const codeStyle = muted ? undefined : "bold";
	const text = [
		tok("Markdown - Text", ["text.html.markdown"], muted ? syntax.fadedGray : syntax.fg),
	];
	const inlineCode = [
		tok(
			"Markdown - Inline Code $inline",
			[
				"markup.inline.raw.string.markdown",
				"markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			syntax.fg,
			codeStyle,
		),
	];
	const fencedCode = [
		tok(
			"Markdown - Fenced Code Block",
			[
				"markup.fenced_code.block.markdown",
				"markup.fenced_code.block.markdown punctuation.definition.markdown",
			],
			syntax.fg,
		),
		tok(
			"Markdown - Fenced Code Block Language",
			["markup.fenced_code.block.markdown fenced_code.block.language.markdown"],
			syntax.fg,
			codeStyle,
		),
		tok(
			"Markdown - Fenced Code Block Attributes",
			["markup.fenced_code.block.markdown fenced_code.block.language.attributes.markdown"],
			syntax.yellow,
		),
		tok("Markdown - Raw Block", ["markup.raw.block.markdown"], syntax.fg),
	];

	const boldColor = syntax.boldGreen;
	const italicColor = syntax.lightPink;
	const boldItalicColor = syntax.boldPink;
	const boldItalicStrikethroughColor = syntax.strongPink;
	const strikethroughColor = syntax.fadedGray;

	return [
		...text,
		tok(
			"Markup - Bold $inline",
			["markup.bold.markdown", "markup.bold.markdown punctuation.definition.bold.markdown"],
			boldColor,
			"bold",
		),
		tok(
			"Markup - Italic $inline",
			[
				"markup.italic.markdown",
				"markup.italic.markdown punctuation.definition.italic.markdown",
			],
			italicColor,
			"italic",
		),
		tok(
			"Markup - Strikethrough $inline",
			[
				"markup.strikethrough.markdown",
				"markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			strikethroughColor,
			"strikethrough",
		),
		...inlineCode,
		// #region: inline permutations
		tok(
			"Markdown - Bold > Italic $inline",
			[
				"markup.bold.markdown markup.italic.markdown",
				"markup.bold.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			boldItalicColor,
			"italic bold",
		),
		tok(
			"Markdown - Italic > Bold $inline",
			[
				"markup.italic.markdown markup.bold.markdown",
				"markup.italic.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			boldItalicColor,
			"italic bold",
		),
		tok(
			"Markdown - Bold > Strikethrough $inline",
			[
				"markup.bold.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			boldColor,
			"bold strikethrough",
		),

		tok(
			"Markdown - Strikethrough > Bold $inline",
			[
				"markup.strikethrough.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			boldColor,
			"bold strikethrough",
		),
		tok(
			"Markdown - Italic > Strikethrough $inline",
			[
				"markup.italic.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			strikethroughColor,
			"italic strikethrough",
		),
		tok(
			"Markdown - Strikethrough > Italic $inline",
			[
				"markup.strikethrough.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			italicColor,
			"italic strikethrough",
		),
		tok(
			"Markdown - Bold > Italic > Strikethrough $inline",
			[
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Bold > Strikethrough > Italic $inline",
			[
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Italic > Bold > Strikethrough $inline",
			[
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Italic > Strikethrough > Bold $inline",
			[
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Strikethrough > Bold > Italic $inline",
			[
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Strikethrough > Italic > Bold $inline",
			[
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Bold > Inline Code $inline",
			[
				"markup.bold.markdown markup.inline.raw.string.markdown",
				"markup.bold.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			syntax.boldFg,
			"bold",
		),
		tok(
			"Markdown - Italic > Inline Code $inline",
			[
				"markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			syntax.fg,
			"italic",
		),
		tok(
			"Markdown - Strikethrough > Inline Code $inline",
			[
				"markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			syntax.fg,
			"strikethrough",
		),
		// #endregion: inline permutations
		tok(
			"Markdown - Url $inline Link",
			[
				"meta.link.email.lt-gt.markdown markup.underline.link.markdown",
				"meta.link.inet.markdown markup.underline.link.markdown",
				"meta.link.inline.markdown markup.underline.link.markdown",
				"meta.link.reference.markdown constant.other.reference.link.markdown",
				"meta.link.reference.def.markdown markup.underline.link.markdown",
				"meta.image.inline.markdown markup.underline.link.image.markdown",
				"meta.image.reference.markdown constant.other.reference.link.markdown",
			],
			syntax.cornflower,
			"underline",
		),
		tok(
			"Markdown - Url $inline Title",
			[
				"meta.link.inline.markdown string.other.link.title.markdown",
				"meta.link.reference.markdown string.other.link.title.markdown",
				"meta.link.reference.def.markdown constant.other.reference.link.markdown",
				"meta.image.inline.markdown string.other.link.description.markdown",
				"meta.image.reference.markdown string.other.link.description.markdown",
			],
			syntax.blue,
		),
		// [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle "inline Description")
		tok(
			"Markdown - Url $inline Description",
			[
				"meta.link.inline.markdown string.other.link.description.title.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown",
			],
			syntax.yellow,
		),
		tok("Markdown - Escape $inline", ["constant.character.escape.markdown"], syntax.lime),
		tok(
			"Markdown - Math Delimiter $inline/$block",
			[
				"markup.math.inline.markdown punctuation.definition.math.begin.markdown",
				"markup.math.inline.markdown punctuation.definition.math.end.markdown",
				"markup.math.block.markdown punctuation.definition.math.begin.markdown",
				"markup.math.block.markdown punctuation.definition.math.end.markdown",
			],
			syntax.orange,
		),
		tok(
			"Markdown - Heading",
			[
				"markup.heading.markdown",
				// by default, punctuation is coloured for programming languages
				"markup.heading.markdown punctuation.definition.heading.markdown",
				"markup.heading.markdown entity.name.section.markdown",
				"markup.heading.setext.1.markdown",
				"markup.heading.setext.2.markdown",
			],
			syntax.pink,
		),
		...fencedCode,
		tok(
			"Markdown - Block Quote",
			[
				"markup.quote.markdown",
				// by default, punctuation is coloured for programming languages
				"markup.quote.markdown punctuation.definition.quote.begin.markdown",
				"markup.quote.markdown meta.paragraph.markdown",
			],
			syntax.yellow,
			"italic",
		),
		tok("Markdown - Separator", ["meta.separator.markdown"], syntax.pink, "bold"),
		tok(
			"Markdown - Unordered List Point",
			["markup.list.unnumbered.markdown punctuation.definition.list.begin.markdown"],
			syntax.cyan,
		),
		tok(
			"Markdown - Ordered List Point",
			["markup.list.numbered.markdown punctuation.definition.list.begin.markdown"],
			syntax.orange,
		),
		tok(
			"Markdown - Punctuation",
			[
				"meta.link.email.lt-gt.markdown punctuation.definition.link.markdown",
				"meta.link.inet.markdown punctuation.definition.link.markdown",
				"meta.link.inline.markdown punctuation.definition.link.title.begin.markdown",
				"meta.link.inline.markdown punctuation.definition.link.title.end.markdown",
				"meta.link.inline.markdown punctuation.definition.metadata.markdown",
				"meta.link.reference.markdown punctuation.definition.link.title.begin.markdown",
				"meta.link.reference.markdown punctuation.definition.link.title.end.markdown",
				"meta.link.reference.markdown punctuation.definition.constant.begin.markdown",
				"meta.link.reference.markdown punctuation.definition.constant.end.markdown",
				"meta.link.reference.def.markdown punctuation.definition.constant.markdown",
				"meta.link.reference.def.markdown punctuation.separator.key-value.markdown",
				"meta.image.inline.markdown punctuation.definition.link.description.begin.markdown",
				"meta.image.inline.markdown punctuation.definition.link.description.end.markdown",
				"meta.image.inline.markdown punctuation.definition.metadata.markdown",
				"meta.image.reference.markdown punctuation.definition.link.description.begin.markdown",
				"meta.image.reference.markdown punctuation.definition.constant.markdown",
			],
			syntax.lightGreen,
		),
		tok(
			"Markdown - Punctuation - Table Definition",
			[
				"punctuation.definition.table.markdown",
				"punctuation.separator.table.markdown", // header separator
			],
			syntax.lime,
		),
		tok("Markdown - Table Text", ["markup.table.markdown"], syntax.fg),
	];
}

export function generateAlternateMarkdownColors(syntax: SyntaxColors): TextMateStyle[] {
	const boldColor = syntax.boldGreen;
	const italicColor = syntax.lightPink;
	const boldItalicColor = syntax.boldPink;
	const boldItalicStrikethroughColor = syntax.strongPink;
	const strikethroughColor = syntax.fadedGray;

	return [
		tok("Markdown - Text", ["text.html.markdown"], syntax.fg),
		tok("Markdown - Bold $inline", ["markup.bold.markdown"], boldColor, "bold"),
		tok("Markdown - Italic $inline", ["markup.italic.markdown"], italicColor, "italic"),
		tok(
			"Markdown - Bold + Italic $inline",
			[
				"markup.italic.markdown markup.bold.markdown",
				"markup.bold.markdown markup.italic.markdown",
			],
			boldItalicColor,
			"bold italic",
		),
		tok(
			"Markdown - Strikethrough $inline",
			["markup.strikethrough.markdown"],
			undefined,
			"strikethrough",
		),
		tok(
			"Markdown - Inline Code $inline",
			["markup.inline.raw.string.markdown"],
			undefined,
			"underline",
		),
		tok(
			"Markdown - Url $inline Link",
			[
				"meta.link.email.lt-gt.markdown markup.underline.link.markdown",
				"meta.link.inet.markdown markup.underline.link.markdown",
				"meta.link.inline.markdown markup.underline.link.markdown",
				"meta.link.reference.markdown constant.other.reference.link.markdown",
				"meta.link.reference.def.markdown markup.underline.link.markdown",
				"meta.image.inline.markdown markup.underline.link.image.markdown",
				"meta.image.reference.markdown constant.other.reference.link.markdown",
			],
			syntax.cornflower,
			"underline",
		),
		tok(
			"Markdown - Url $inline Title",
			[
				"meta.link.inline.markdown string.other.link.title.markdown",
				"meta.link.reference.markdown string.other.link.title.markdown",
				"meta.link.reference.def.markdown constant.other.reference.link.markdown",
				"meta.image.inline.markdown string.other.link.description.markdown",
				"meta.image.reference.markdown string.other.link.description.markdown",
			],
			syntax.blue,
		),
		tok(
			"Markdown - Url $inline Description",
			[
				"meta.link.inline.markdown string.other.link.description.title.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown",
			],
			syntax.yellow,
		),
		tok("Markdown - Escape $inline", ["constant.character.escape.markdown"], syntax.lime),
		// #region: inline permutations
		tok(
			"Markdown - Bold + Strikethrough $inline",
			[
				"markup.bold.markdown markup.strikethrough.markdown",
				"markup.strikethrough.markdown markup.bold.markdown",
			],
			strikethroughColor,
			"bold strikethrough",
		),
		tok(
			"Markdown - Italic + Strikethrough $inline",
			[
				"markup.italic.markdown markup.strikethrough.markdown",
				"markup.strikethrough.markdown markup.italic.markdown",
			],
			strikethroughColor,
			"italic strikethrough",
		),
		tok(
			"Markdown - Bold + Italic + Strikethrough $inline",
			[
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough",
		),
		tok(
			"Markdown - Bold > Inline code $inline",
			["markup.bold.markdown markup.inline.raw.string.markdown"],
			boldColor,
			"bold underline",
		),
		tok(
			"Markdown - Italic > Inline code $inline",
			["markup.italic.markdown markup.inline.raw.string.markdown"],
			italicColor,
			"italic underline",
		),
		tok(
			"Markdown - Bold + Italic > Inline code $inline",
			[
				"markup.bold.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			boldItalicColor,
			"bold italic underline",
		),
		tok(
			"Markdown - Strikethrough > Inline code $inline",
			["markup.strikethrough.markdown markup.inline.raw.string.markdown"],
			undefined,
			"strikethrough underline",
		),
		tok(
			"Markdown - Bold + Strikethrough > Inline code $inline",
			[
				"markup.bold.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			boldColor,
			"bold strikethrough underline",
		),
		tok(
			"Markdown - Italic + Strikethrough > Inline code $inline",
			[
				"markup.italic.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.inline.raw.string.markdown",
			],
			italicColor,
			"italic strikethrough underline",
		),
		tok(
			"Markdown - Bold + Italic + Strikethrough > Inline code $inline",
			[
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			boldItalicStrikethroughColor,
			"bold italic strikethrough underline",
		),
		// #endregion: inline permutations
		tok(
			"Markdown - Heading",
			[
				"markup.heading.markdown",
				"markup.heading.markdown entity.name.section.markdown",
				"markup.heading.setext.1.markdown",
				"markup.heading.setext.2.markdown",
			],
			syntax.pink,
		),
		tok("Markdown - Fenced Code Block", ["markup.fenced_code.block.markdown"], syntax.fg),
		tok(
			"Markdown - Fenced Code Block Language",
			["markup.fenced_code.block.markdown fenced_code.block.language.markdown"],
			syntax.fg,
			"underline",
		),
		tok(
			"Markdown - Fenced Code Block Attributes",
			["markup.fenced_code.block.markdown fenced_code.block.language.attributes.markdown"],
			syntax.yellow,
			"underline",
		),
		tok("Markdown - Raw Block", ["markup.raw.block.markdown"], syntax.blue),
		tok(
			"Markdown - Block Quote",
			["markup.quote.markdown", "markup.quote.markdown meta.paragraph.markdown"],
			syntax.yellow,
			"italic",
		),
		tok("Markdown - Separator", ["meta.separator.markdown"], syntax.pink),
		tok(
			"Markdown - Unordered List Point",
			["markup.list.unnumbered.markdown punctuation.definition.list.begin.markdown"],
			syntax.cyan,
		),
		tok(
			"Markdown - Ordered List Point",
			["markup.list.numbered.markdown punctuation.definition.list.begin.markdown"],
			syntax.orange,
		),
		tok("Markdown - Table Control", ["punctuation.separator.table.markdown"], syntax.lime),
		tok(
			"Markdown - Punctuation",
			[
				"punctuation.definition.tag.begin.html",
				"punctuation.definition.tag.end.html",
				"punctuation.separator.key-value.html",
				"punctuation.definition.string.begin.html",
				"punctuation.definition.string.end.html",
				"punctuation.definition.comment.html",
				"markup.bold.markdown punctuation.definition.bold.markdown",
				"markup.italic.markdown punctuation.definition.italic.markdown",
				"markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
				"markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
				"meta.link.email.lt-gt.markdown punctuation.definition.link.markdown",
				"meta.link.inet.markdown punctuation.definition.link.markdown",
				"meta.link.inline.markdown punctuation.definition.link.title.begin.markdown",
				"meta.link.inline.markdown punctuation.definition.link.title.end.markdown",
				"meta.link.inline.markdown punctuation.definition.metadata.markdown",
				"meta.link.inline.markdown string.other.link.description.title.markdown punctuation.definition.string.begin.markdown",
				"meta.link.inline.markdown string.other.link.description.title.markdown punctuation.definition.string.end.markdown",
				"meta.link.reference.markdown punctuation.definition.link.title.begin.markdown",
				"meta.link.reference.markdown punctuation.definition.link.title.end.markdown",
				"meta.link.reference.markdown punctuation.definition.constant.begin.markdown",
				"meta.link.reference.markdown punctuation.definition.constant.end.markdown",
				"meta.link.reference.def.markdown punctuation.definition.constant.markdown",
				"meta.link.reference.def.markdown punctuation.separator.key-value.markdown",
				"meta.image.inline.markdown punctuation.definition.link.description.begin.markdown",
				"meta.image.inline.markdown punctuation.definition.link.description.end.markdown",
				"meta.image.inline.markdown punctuation.definition.metadata.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown punctuation.definition.string.begin.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown punctuation.definition.string.end.markdown",
				"meta.image.reference.markdown punctuation.definition.link.description.begin.markdown",
				"meta.image.reference.markdown punctuation.definition.constant.markdown",
				"markup.math.inline.markdown punctuation.definition.math.begin.markdown",
				"markup.math.inline.markdown punctuation.definition.math.end.markdown",
				"markup.math.block.markdown punctuation.definition.math.begin.markdown",
				"markup.math.block.markdown punctuation.definition.math.end.markdown",
				"markup.heading.markdown punctuation.definition.heading.markdown",
				"markup.fenced_code.block.markdown punctuation.definition.markdown",
				"markup.quote.markdown punctuation.definition.quote.begin.markdown",
				"markup.table.markdown punctuation.definition.table.markdown",
			],
			syntax.fadedGray,
		),
	];
}
