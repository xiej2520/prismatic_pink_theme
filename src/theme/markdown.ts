import { TextMateStyle } from "./textmate";
import { SyntaxColors } from ".";

export function generateMarkdownColors(syntax: SyntaxColors, muted: boolean): TextMateStyle[] {
	let text;
	let inlineCode;
	let fencedCode;
	if (muted) {
		text = [
			{
				name: "Markdown - Text",
				scope: ["text.html.markdown"],
				settings: {
					foreground: syntax.fadedGray,
				},
			},
		];
		inlineCode = [
			{
				name: "Markdown - Inline Code $inline",
				scope: [
					"markup.inline.raw.string.markdown",
					"markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
				],
				settings: {
					foreground: syntax.fg,
				},
			},
		];
		fencedCode = [
			{
				name: "Markdown - Fenced Code Block",
				scope: [
					"markup.fenced_code.block.markdown",
					"markup.fenced_code.block.markdown punctuation.definition.markdown",
				],
				settings: {
					foreground: syntax.fg,
				},
			},
			{
				name: "Markdown - Fenced Code Block Language",
				scope: ["markup.fenced_code.block.markdown fenced_code.block.language.markdown"],
				settings: {
					foreground: syntax.fg,
				},
			},
			{
				name: "Markdown - Fenced Code Block Attributes",
				scope: [
					"markup.fenced_code.block.markdown fenced_code.block.language.attributes.markdown",
				],
				settings: {
					foreground: syntax.yellow,
				},
			},
			{
				name: "Markdown - Raw Block",
				scope: ["markup.raw.block.markdown"],
				settings: {
					foreground: syntax.fg,
				},
			},
		];
	} else {
		text = [
			{
				name: "Markdown - Text",
				scope: ["text.html.markdown"],
				settings: {
					foreground: syntax.fg,
				},
			},
		];
		inlineCode = [
			{
				name: "Markdown - Inline Code $inline",
				scope: [
					"markup.inline.raw.string.markdown",
					"markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
				],
				settings: {
					foreground: syntax.fg,
					fontStyle: "bold",
				},
			},
		];
		fencedCode = [
			{
				name: "Markdown - Fenced Code Block",
				scope: [
					"markup.fenced_code.block.markdown",
					"markup.fenced_code.block.markdown punctuation.definition.markdown",
				],
				settings: {
					foreground: syntax.fg,
				},
			},
			{
				name: "Markdown - Fenced Code Block Language",
				scope: ["markup.fenced_code.block.markdown fenced_code.block.language.markdown"],
				settings: {
					foreground: syntax.fg,
					fontStyle: "bold",
				},
			},
			{
				name: "Markdown - Fenced Code Block Attributes",
				scope: [
					"markup.fenced_code.block.markdown fenced_code.block.language.attributes.markdown",
				],
				settings: {
					foreground: syntax.yellow,
				},
			},
			{
				name: "Markdown - Raw Block",
				scope: ["markup.raw.block.markdown"],
				settings: {
					foreground: syntax.fg,
				},
			},
		];
	}

	return [
		...text,
		{
			name: "Markup - Bold $inline",
			scope: [
				"markup.bold.markdown",
				"markup.bold.markdown punctuation.definition.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold",
			},
		},
		{
			name: "Markup - Italic $inline",
			scope: [
				"markup.italic.markdown",
				"markup.italic.markdown punctuation.definition.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic",
			},
		},
		{
			name: "Markup - Strikethrough $inline",
			scope: [
				"markup.strikethrough.markdown",
				"markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			settings: {
				foreground: syntax.fadedGray,
				fontStyle: "strikethrough",
			},
		},
		...inlineCode,
		{
			name: "Markdown - Url $inline Link",
			scope: [
				"meta.link.email.lt-gt.markdown markup.underline.link.markdown",
				"meta.link.inet.markdown markup.underline.link.markdown",
				"meta.link.inline.markdown markup.underline.link.markdown",
				"meta.link.reference.markdown constant.other.reference.link.markdown",
				"meta.link.reference.def.markdown markup.underline.link.markdown",
				"meta.image.inline.markdown markup.underline.link.image.markdown",
				"meta.image.reference.markdown constant.other.reference.link.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Url $inline Title",
			scope: [
				"meta.link.inline.markdown string.other.link.title.markdown",
				"meta.link.reference.markdown string.other.link.title.markdown",
				"meta.link.reference.def.markdown constant.other.reference.link.markdown",
				"meta.image.inline.markdown string.other.link.description.markdown",
				"meta.image.reference.markdown string.other.link.description.markdown",
			],
			settings: {
				foreground: syntax.green,
			},
		},
		{
			name: "Markdown - Url $inline Descrption",
			scope: [
				"meta.link.inline.markdown string.other.link.description.title.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown",
			],
			settings: {
				foreground: syntax.yellow,
			},
		},
		{
			name: "Markdown - Escape $inline",
			scope: ["constant.character.escape.markdown"],
			settings: {
				foreground: syntax.orange,
			},
		},
		// #region: inline permutations
		{
			name: "Markdown - Bold > Italic $inline",
			scope: [
				"markup.bold.markdown markup.italic.markdown",
				"markup.bold.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic bold",
			},
		},
		{
			name: "Markdown - Italic > Bold $inline",
			scope: [
				"markup.italic.markdown markup.bold.markdown",
				"markup.italic.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "italic bold",
			},
		},
		{
			name: "Markdown - Bold > Strikethrough $inline",
			scope: [
				"markup.bold.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			settings: {
				foreground: syntax.fadedGray,
				fontStyle: "bold strikethrough",
			},
		},

		{
			name: "Markdown - Strikethrough > Bold $inline",
			scope: [
				"markup.strikethrough.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold strikethrough",
			},
		},
		{
			name: "Markdown - Italic > Strikethrough $inline",
			scope: [
				"markup.italic.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			settings: {
				foreground: syntax.fadedGray,
				fontStyle: "italic strikethrough",
			},
		},
		{
			name: "Markdown - Strikethrough > Italic $inline",
			scope: [
				"markup.strikethrough.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic strikethrough",
			},
		},
		{
			name: "Markdown - Bold > Italic > Strikethrough $inline",
			scope: [
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			settings: {
				foreground: syntax.fadedGray,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown - Bold > Strikethrough > Italic $inline",
			scope: [
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown -  Italic > Bold > Strikethrough $inline",
			scope: [
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown punctuation.definition.strikethrough.markdown",
			],
			settings: {
				foreground: syntax.fadedGray,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown -  Italic > Strikethrough > Bold $inline",
			scope: [
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown - Strikethrough > Bold > Italic $inline",
			scope: [
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown punctuation.definition.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown - Strikethrough > Italic > Bold $inline",
			scope: [
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown punctuation.definition.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown - Bold > Inline Code $inline",
			scope: [
				"markup.bold.markdown markup.inline.raw.string.markdown",
				"markup.bold.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			settings: {
				foreground: syntax.fg,
				fontStyle: "bold",
			},
		},
		{
			name: "Markdown - Italic > Inline Code $inline",
			scope: [
				"markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			settings: {
				foreground: syntax.fg,
				fontStyle: "italic",
			},
		},
		{
			name: "Markdown - Strikethrough > Inline Code $inline",
			scope: [
				"markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.inline.raw.string.markdown punctuation.definition.raw.markdown",
			],
			settings: {
				foreground: syntax.fg,
				fontStyle: "strikethrough",
			},
		},
		// #endregion: inline permutations
		{
			name: "Markdown - Math Delimiter $inline/$block",
			scope: [
				"markup.math.inline.markdown punctuation.definition.math.begin.markdown",
				"markup.math.inline.markdown punctuation.definition.math.end.markdown",
				"markup.math.block.markdown punctuation.definition.math.begin.markdown",
				"markup.math.block.markdown punctuation.definition.math.end.markdown",
			],
			settings: {
				foreground: syntax.lime,
			},
		},
		{
			name: "Markdown - Heading",
			scope: [
				"markup.heading.markdown",
				// by default, punctuation is coloured for programming languages
				"markup.heading.markdown punctuation.definition.heading.markdown",
				"markup.heading.markdown entity.name.section.markdown",
				"markup.heading.setext.1.markdown",
				"markup.heading.setext.2.markdown",
			],
			settings: {
				foreground: syntax.pink,
			},
		},
		...fencedCode,
		{
			name: "Markdown - Block Quote",
			scope: [
				"markup.quote.markdown",
				// by default, punctuation is coloured for programming languages
				"markup.quote.markdown punctuation.definition.quote.begin.markdown",
				"markup.quote.markdown meta.paragraph.markdown",
			],
			settings: {
				foreground: syntax.yellow,
				fontStyle: "italic",
			},
		},
		{
			name: "Markdown - Separator",
			scope: ["meta.separator.markdown"],
			settings: {
				foreground: syntax.fg,
				fontStyle: "bold",
			},
		},
		{
			name: "Markdown - List Point",
			scope: [
				"markup.list.numbered.markdown punctuation.definition.list.begin.markdown",
				"markup.list.unnumbered.markdown punctuation.definition.list.begin.markdown",
			],
			settings: {
				foreground: syntax.cyan,
			},
		},
		{
			name: "Markdown - Punctuation",
			scope: [
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
			settings: {
				foreground: syntax.gray,
			},
		},
	];
}

export function generateAlternateMarkdownColors(syntax: SyntaxColors): TextMateStyle[] {
	return [
		{
			name: "Markdown - Text",
			scope: ["text.html.markdown"],
			settings: {
				foreground: syntax.fg,
			},
		},
		{
			name: "Markdown - Bold $inline",
			scope: ["markup.bold.markdown"],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold",
			},
		},
		{
			name: "Markdown - Italic $inline",
			scope: ["markup.italic.markdown"],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic",
			},
		},
		{
			name: "Markdown - Bold + Italic $inline",
			scope: [
				"markup.italic.markdown markup.bold.markdown",
				"markup.bold.markdown markup.italic.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "bold italic",
			},
		},
		{
			name: "Markdown - Strikethrough $inline",
			scope: ["markup.strikethrough.markdown"],
			settings: {
				fontStyle: "strikethrough",
			},
		},
		{
			name: "Markdown - Inline Code $inline",
			scope: ["markup.inline.raw.string.markdown"],
			settings: {
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Url $inline Link",
			scope: [
				"meta.link.email.lt-gt.markdown markup.underline.link.markdown",
				"meta.link.inet.markdown markup.underline.link.markdown",
				"meta.link.inline.markdown markup.underline.link.markdown",
				"meta.link.reference.markdown constant.other.reference.link.markdown",
				"meta.link.reference.def.markdown markup.underline.link.markdown",
				"meta.image.inline.markdown markup.underline.link.image.markdown",
				"meta.image.reference.markdown constant.other.reference.link.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Url $inline Title",
			scope: [
				"meta.link.inline.markdown string.other.link.title.markdown",
				"meta.link.reference.markdown string.other.link.title.markdown",
				"meta.link.reference.def.markdown constant.other.reference.link.markdown",
				"meta.image.inline.markdown string.other.link.description.markdown",
				"meta.image.reference.markdown string.other.link.description.markdown",
			],
			settings: {
				foreground: syntax.green,
			},
		},
		{
			name: "Markdown - Url $inline Descrption",
			scope: [
				"meta.link.inline.markdown string.other.link.description.title.markdown",
				"meta.image.inline.markdown string.other.link.description.title.markdown",
			],
			settings: {
				foreground: syntax.yellow,
			},
		},
		{
			name: "Markdown - Escape $inline",
			scope: ["constant.character.escape.markdown"],
			settings: {
				foreground: syntax.orange,
			},
		},
		// #region: inline permutations
		{
			name: "Markdown - Bold + Strikethrough $inline",
			scope: [
				"markup.bold.markdown markup.strikethrough.markdown",
				"markup.strikethrough.markdown markup.bold.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold strikethrough",
			},
		},
		{
			name: "Markdown - Italic + Strikethrough $inline",
			scope: [
				"markup.italic.markdown markup.strikethrough.markdown",
				"markup.strikethrough.markdown markup.italic.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic strikethrough",
			},
		},
		{
			name: "Markdown - Bold + Italic + Strikethrough $inline",
			scope: [
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "bold italic strikethrough",
			},
		},
		{
			name: "Markdown - Bold > Inline code $inline",
			scope: ["markup.bold.markdown markup.inline.raw.string.markdown"],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold underline",
			},
		},
		{
			name: "Markdown - Italic > Inline code $inline",
			scope: ["markup.italic.markdown markup.inline.raw.string.markdown"],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic underline",
			},
		},
		{
			name: "Markdown - Bold + Italic > Inline code $inline",
			scope: [
				"markup.bold.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "bold italic underline",
			},
		},
		{
			name: "Markdown - Strikethrough > Inline code $inline",
			scope: ["markup.strikethrough.markdown markup.inline.raw.string.markdown"],
			settings: {
				fontStyle: "strikethrough underline",
			},
		},
		{
			name: "Markdown - Bold + Strikethrough > Inline code $inline",
			scope: [
				"markup.bold.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			settings: {
				foreground: syntax.orange,
				fontStyle: "bold strikethrough underline",
			},
		},
		{
			name: "Markdown - Italic + Strikethrough > Inline code $inline",
			scope: [
				"markup.italic.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.inline.raw.string.markdown",
			],
			settings: {
				foreground: syntax.blue,
				fontStyle: "italic strikethrough underline",
			},
		},
		{
			name: "Markdown - Bold + Italic > Inline code $inline",
			scope: [
				"markup.italic.markdown markup.bold.markdown markup.inline.raw.string.markdown",
				"markup.bold.markdown markup.italic.markdown markup.inline.raw.string.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "bold italic underline",
			},
		},
		{
			name: "Markdown - Bold + Italic + Strikethrough > Inline code $inline",
			scope: [
				"markup.bold.markdown markup.italic.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.bold.markdown markup.strikethrough.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.bold.markdown markup.strikethrough.markdown markup.inline.raw.string.markdown",
				"markup.italic.markdown markup.strikethrough.markdown markup.bold.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.bold.markdown markup.italic.markdown markup.inline.raw.string.markdown",
				"markup.strikethrough.markdown markup.italic.markdown markup.bold.markdown markup.inline.raw.string.markdown",
			],
			settings: {
				foreground: syntax.violet,
				fontStyle: "bold italic strikethrough underline",
			},
		},
		// #endregion: inline permutations
		{
			name: "Markdown - Heading",
			scope: [
				"markup.heading.markdown",
				"markup.heading.markdown entity.name.section.markdown",
				"markup.heading.setext.1.markdown",
				"markup.heading.setext.2.markdown",
			],
			settings: {
				foreground: syntax.pink,
			},
		},
		{
			name: "Markdown - Fenced Code Block",
			scope: ["markup.fenced_code.block.markdown"],
			settings: {
				foreground: syntax.fg,
			},
		},
		{
			name: "Markdown - Fenced Code Block Language",
			scope: ["markup.fenced_code.block.markdown fenced_code.block.language.markdown"],
			settings: {
				foreground: syntax.fg,
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Fenced Code Block Attributes",
			scope: [
				"markup.fenced_code.block.markdown fenced_code.block.language.attributes.markdown",
			],
			settings: {
				foreground: syntax.yellow,
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Raw Block",
			scope: ["markup.raw.block.markdown"],
			settings: {
				foreground: syntax.blue,
			},
		},
		{
			name: "Markdown - Block Quote",
			scope: ["markup.quote.markdown", "markup.quote.markdown meta.paragraph.markdown"],
			settings: {
				foreground: syntax.yellow,
				fontStyle: "italic",
			},
		},
		{
			name: "Markdown - Separator",
			scope: ["meta.separator.markdown"],
			settings: {
				foreground: syntax.lime,
			},
		},
		{
			name: "Markdown - List Point",
			scope: [
				"markup.list.numbered.markdown punctuation.definition.list.begin.markdown",
				"markup.list.unnumbered.markdown punctuation.definition.list.begin.markdown",
			],
			settings: {
				foreground: syntax.cyan,
			},
		},
		{
			name: "Markdown - Table Control",
			scope: ["punctuation.separator.table.markdown"],
			settings: {
				foreground: syntax.lime,
			},
		},
		{
			name: "Markdown - Punctuation",
			scope: [
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
			settings: {
				foreground: syntax.fadedGray,
			},
		},
	];
}
