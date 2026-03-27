import { Config } from "../config";
import { generateMarkdownColors, generateAlternateMarkdownColors as generateMutedPunctuationMarkdownColors } from "./markdown";
import { SyntaxColors, UiColors } from ".";

export interface TextMateStyle {
	name: string;
	scope: string | string[];
	settings: {
		foreground?: string;
		fontStyle?: string;
	};
}

export function generateTextMateTheme(
	syntax: SyntaxColors,
	config: Config
) {
	const commentStyles = config.italicComments ?
    {
			settings: {
				foreground: syntax.lightPink,
				fontStyle: "italic",
			},
		} :
    {
			settings: {
				foreground: syntax.lightPink,
			},
		};

	// Markdown plaintest styles.
	let mdStyles: TextMateStyle[] = []; // Need to initialize array otherwise build-theme js script will complain.
	switch (config.markdownSyntaxStyle) {
		case "traditional":
			mdStyles = generateMarkdownColors(syntax, false);
			break;
		case "mutedPlaintext":
			mdStyles = generateMarkdownColors(syntax, true);
			break;
		case "mutedPunctuation":
			mdStyles = generateMutedPunctuationMarkdownColors(syntax);
			break;
	}


  // TextMate grammar token colors
  const textMateTheme = {
    tokenColors: [
      // BASICS
      {
        name: "Keywords",
        scope: [
          "keyword",
          "storage.type",
          "storage.modifier",
          "punctuation.definition.directive.c",
          "punctuation.definition.directive.cpp",
          "keyword.type.go",
          "storage.class.d",
          "markup.deleted.git_gutter",
          "entity.name.tag.css",
          "punctuation.definition.keyword.css",
          "entity.name.tag.wildcard.css",
          // rust
          "storage.modifier.mut.rust",
          "storage.modifier.type.rust",
          "variable.language.self.rust",
          // csharp
          "storage.modifier.cs",
          "keyword.other.this.cs",
          // powershell
          "keyword.control.powershell",
          "storage.type.powershell",
          "meta.function.powershell",
          // js
          "variable.language.this.js",
          "keyword.operator.new.js",
          "keyword.operator.ternary.js",
          "keyword.control.import.js",
          "keyword.control.as.js",
          "keyword.control.from.js",
          "storage.type.js",
          "constant.language.null.js",
          "constant.language.undefined.js",
          // ts
          "variable.language.this.ts",
          "variable.language.super.ts",
          "keyword.operator.new.ts",
          "keyword.operator.ternary.ts",
          "keyword.operator.expression.typeof.ts",
          "keyword.operator.expression.of.ts",
          "keyword.operator.expression.in.ts",
          "keyword.operator.expression.instanceof.ts",
          "keyword.operator.expression.is.ts",
          "keyword.operator.expression.keyof.ts",
          "keyword.operator.expression.infer.ts",
          "keyword.control.import.ts",
          "keyword.control.as.ts",
          "keyword.contorl.from.ts",
          "keyword.contorl.export.ts",
          "storage.type.ts",
          "storage.type.class.ts",
          "storage.type.enum.ts",
          "storage.type.interface.ts",
          "storage.type.namespace.ts",
          "storage.type.function.ts",
          "storage.type.function.arrow.ts",
          "storage.type.numeric.bigint.ts",
          "storage.type.property.ts",
          "storage.modifier.ts",
          "storage.modifier.async.ts",
          "constant.language.null.ts",
          "constant.language.undefined.ts",
        ],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "Built-in Types",
        scope: [
          // rust
          "entity.name.type.primitive.rust",
          "entity.name.type.numeric.rust",
          // csharp
          "keyword.type.cs",
          // js
          "support.type.primitive.js",
          // ts
          "support.type.primitive.ts",
          "support.type.builtin.ts",
        ],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "Punctuation & Operators",
        scope: [
          "punctuation",
          "keyword.operator",
          // c++
          "entity.name.operator.cpp",
          // rust
          "keyword.operator.sigil.rust",
          "keyword.operator.access.dot.rust",
          "keyword.operator.key-value.rust",
          "keyword.operator.attribute.inner.rust",
          "punctuation.definition.tag",
          "punctuation.definition.tag.html",
          "punctuation.definition.tag.begin.html",
          "punctuation.definition.tag.end.html",
          // js
          "meta.brace.round.js",
          "meta.brace.square.js",
          // ts
          "meta.brace.round.ts",
          "meta.brace.square.ts",
          "keyword.operator.optional.ts",
          "keyword.operator.rest.ts",
          // html
          "punctuation.definition.string.begin.html",
          "punctuation.definition.string.end.html",
          // xml
          "punctuation.definition.string.begin.xml",
          "punctuation.definition.string.end.xml",
          // markdown
          "punctuation.definition.string.markdown",
          // json
          "punctuation.support.type.property-name.begin.json",
          "punctuation.support.type.property-name.end.json",
          "punctuation.definition.string.begin.json",
          "punctuation.definition.string.end.json",
        ],
        settings: {
          foreground: syntax.lightGreen,
          fontStyle: "",
        },
      },
      //
      //
      //
      {
        // Free-standing functions and object methods.
        name: "Function and Methods",
        scope: [
          "entity.name.function",
          "meta.function-call",
          "variable.function",
          "support.function",
          "keyword.other.special-method",
          "keyword.other.common.function",
          // rust
          "entity.name.function.rust",
          // csharp
          "entity.name.function.cs",
          // powershell
          "support.function.powershell",
          // js
          "entity.name.function.js",
          // ts
          "entity.name.function.ts",
          // css
          "support.function.misc.css",
          "support.function.misc.scss",
        ],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        // Macros and other fancy functions.
        name: "Special functions, Hygienic Macros, etc",
        scope: [
          "support.function.macro.rust",
          "support.function.macro.builtin.rust",
          "support.function.macro.core.rust",
          "entity.name.type.macro.rust",
          "entity.name.function.macro.rust",
          "entity.name.function.macro.rules.rust",
          "support.function.macro.julia",
          "support.function.builtin.zig",
        ],
        settings: {
          foreground: syntax.strongPink,
        },
      },
      {
        // Macros in C/C++
        name: "Macros in C/C++",
        scope: [
          "entity.name.function.preprocessor.c",
          "entity.name.function.preprocessor.cpp",
        ],
        settings: {
          foreground: syntax.strongPink,
          fontStyle: "underline"
        }
      },
      {
        name: "Non-primitive Types",
        scope: [
          "support.type",
          "support.class",
          "support.other.namespace.use.php",
          "meta.use.php",
          "support.other.namespace.php",
          "markup.changed.git_gutter",
          "support.type.sys-types",
          "entity.other.attribute-name.table.toml",
          "variable.key.table.toml",
          "storage.type.haskell",
          "storage.type.java",
          "storage.type.primitive.java",
          "storage.type.object.array.java",
          "storage.type.c",
          "storage.type.built-in.c",
          "storage.type.built-in.primitive.c",
          "meta.function.definition.parameters.c",
          "storage.type.built-in.cpp",
          "storage.type.built-in.primitive.cpp",
          "entity.name.class.kotlin",
          "storage.type.go",
          "storage.type.boolean.go",
          "storage.type.byte.go",
          "storage.type.error.go",
          "storage.type.numeric.go",
          "storage.type.rune.go",
          "storage.type.string.go",
          "storage.type.uintptr.go",
          "storage.type.concrete.nim",
          "storage.type.basic-type.d",
          "storage.type.d",
          "support.type.python",
          "basicTypes.nim",
          "meta.class.stanza.dune",
          "storage.type.cs",
          "entity.name.type",
          // c++
          "entity.name.type.cpp",
          "entity.name.type.parameter.cpp",
          "entity.name.type.enum.cpp",
          // rust
          "entity.name.type.rust",
          "entity.name.type.struct.rust",
          "entity.name.type.enum.rust",
          "entity.name.type.union.rust",
          "entity.name.type.declaration.rust",
          // csharp
          "storage.type.cs",
          "entity.name.type.class.cs",
          "entity.name.type.struct.cs",
          "entity.name.type.enum.cs",
          // js
          "entity.name.type.class.js",
          "support.class.builtin.js",
          "support.class.component.js",
          // ts
          "entity.name.type.class.ts",
          // java
          "entity.other.inherited-class.java"
        ],
        settings: {
          foreground: syntax.blue,
        },
      },
      {
        name: "Enum variant, Sum Types, etc",
        scope: [
          "constant.other.haskell",
          "variable.other.enummember.cpp",
          // rust
          "support.enum.core.rust",
          "entity.name.type.option.rust",
          "entity.name.type.result.rust",
          // csharp
          "entity.name.variable.enum-member.cs",
          // powershell,
          "constant.language.powershell",
          "constant.language.powershell punctuation.definition.variable.powershell",
          // ts
          "variable.other.enummember.ts",
        ],
        settings: {
          foreground: syntax.cyan,
        },
      },
      //
      //
      //
      {
        name: "Interfaces",
        scope: [
          // rust
          "entity.name.type.trait.rust",
          // ts
          "entity.name.type.interface.ts",
        ],
        settings: {
          foreground: syntax.cornflower,
        },
      },
      {
        name: "Type Parameters",
        scope: [
          // c++
          "entity.name.type.template.cpp",
          // rust
          "entity.name.type.type-parameter.cs",
        ],
        settings: {
          foreground: syntax.skyBlue,
        },
      },
      //
      //
      //
      {
        // Variable declarations and uses.
        name: "Variables",
        scope: [
          "variable",
          "meta.function-call.arguments",
          "string constant.other.placeholder",
          "meta.function-call.java",
          "storage.modifier.import.java",
          "variable.other.object",
          // rust
          "variable.other.rust",
          // csharp
          "entity.name.variable.local.cs",
          "variable.other.readwrite.cs",
          // js
          "variable.other.readwrite.js",
          "variable.other.constant.js",
          // ts
          "",
          // css
          "variable.css",
          "variable.argument.css",
          "variable.scss",
        ],
        settings: {
          foreground: syntax.fg,
        },
      },
      {
        name: "Parameters",
        scope: [
          "variable.parameter",
          "keyword.other.self.rust",
          "meta.parens.block.c",
          "variable.css",
          // "meta.function.definition.parameters",
          // csharp
          "entity.name.variable.parameter.cs",
          // js
          "variable.parameter.js",
          // ts
          "variable.parameter.ts",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      {
        name: "Members",
        scope: [
          "variable.other.object.property",
          // csharp
          "entity.name.variable.field.cs",
          "variable.other.object.property.cs",
          // powershell
          "variable.other.member.powershell",
          // js
          "variable.other.property.js",
          // ts
          "variable.object.property.ts",
          "variable.other.property.ts",
        ],
        settings: {
          foreground: syntax.lightPurple,
        },
      },
      {
        name: "Constants",
        scope: [
          "constant",
          // rust
          "constant.other.caps.rust",
          // csharp
          "constant.language.null.cs",
          // powershell
          "support.constant.variable.powershell",
          "support.constant.variable.powershell punctuation.definition.variable.powershell",
          // js
          "variable.other.constant.js",
          // ts
          "variable.other.constant.ts",
          // json
          "constant.language.json",
          // toml
          // Better TOML
          "constant.other.boolean.toml",
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Booleans",
        scope: [
          "constant.language.bool",
          // rust
          "constant.language.bool.rust",
          // csharp
          "constant.language.boolean.true.cs",
          "constant.language.boolean.false.cs",
          // js
          "constant.language.boolean.true.js",
          "constant.language.boolean.false.js",
          // ts
          "constant.language.boolean.true.ts",
          "constant.language.boolean.false.ts",
          // yaml
          "constant.language.boolean.yaml",
          // toml
          // Even Better TOML
          "constant.language.boolean.toml",
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      //
      //
      //
      {
        name: "String & character",
        scope: [
          "string",
          "punctuation.definition.string",
          "constant.other.symbol",
          "constant.other.key",
          "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
          // rust
          "string.quoted.double.rust",
          "punctuation.definition.string.rust",
          // csharp
          "string.quoted.double.cs",
          "punctuation.definition.string.begin.cs",
          "punctuation.definition.string.end.cs",
          // powershell
          "string.quoted.double.powershell",
          "string.quoted.single.powershell",
          "punctuation.definition.string.begin.powershell",
          "punctuation.definition.string.end.powershell",
          // js
          "string.quoted.single.js",
          "string.quoted.double.js",
          "string.template.js",
          "punctuation.definition.string.begin.js",
          "punctuation.definition.string.end.js",
          "punctuation.definition.string.template.begin.js",
          "punctuation.definition.string.template.end.js",
          // ts
          "string.quoted.single.ts",
          "string.quoted.double.ts",
          "string.template.ts",
          "punctuation.definition.string.begin.ts",
          "punctuation.definition.string.end.ts",
          "punctuation.definition.string.template.begin.ts",
          "punctuation.definition.string.template.end.ts",
          // css
          "string.quoted.double.css",
          "string.quoted.double.scss",
          "string.quoted.single.css",
          "string.quoted.single.scss",
          // xml
          "string.quoted.single.xml",
          "string.quoted.double.xml",
          // json
          "string.quoted.double.json",
          // yaml
          "string.unquoted.plain.out.yaml",
          "string.unquoted.block.yaml",
          "punctuation.definition.string.begin.yaml",
          "punctuation.definition.string.end.yaml",
          "string.quoted.single.yaml",
          "string.quoted.double.yaml",
          // toml
          // Better TOML & Even Better TOML
          "string.quoted.single.basic.line.toml",
          "string.quoted.triple.basic.block.toml",
          "string.quoted.single.literal.line.toml",
          "string.quoted.triple.literal.block.toml",
          // ini
          "string.quoted.single.ini",
          "string.quoted.double.ini",
          "punctuation.definition.string.begin.ini",
          "punctuation.definition.string.end.ini",
          // bnf
          "string.quoted.double.bnf",
          "string.quoted.single.bnf",
        ],
        settings: {
          foreground: syntax.yellow,
        },
      },
      {
        name: "Escape characters",
        scope: [
          "constant.character.escape",
          // rust
          "constant.character.escape.rust",
          // csharp
          "constant.character.escape.cs",
          // powershell
          "constant.character.escape.powershell",
          // js
          "constant.character.escape.js",
          // ts
          "constant.character.escape.ts",
          // xml
          "punctuation.definition.constant.xml",
          "constant.character.entity.xml",
          // yaml
          "constant.character.escape.yaml",
          // toml
          // Better TOML & Even Better TOML
          "constant.character.escape.toml", // (Only within multi-line strings for Better TOML)
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Character literals",
        scope: [
          // rust
          "punctuation.definition.char.rust",
          "string.quoted.single.char.rust",
          // csharp
          "punctuation.definition.char.begin.cs",
          "punctuation.definition.char.end.cs",
          "string.quoted.single.cs",
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Number literals",
        scope: [
          "constant.numeric",
          // rust
          "constant.numeric.decimal.rust",
          "constant.numeric.bin.rust",
          "constant.numeric.hex.rust",
          "constant.numeric.oct.rust",
          "punctuation.separator.dot.decimal.rust",
          // csharp
          "constant.numeric.binary.cs",
          "constant.numeric.decimal.cs",
          "constant.numeric.hex.cs",
          // powershell
          "constant.numeric.integer.powershell",
          "constant.numeric.hex.powershell",
          "constant.numeric.octal.powershell",
          // js
          "constant.numeric.binary.js",
          "constant.numeric.decimal.js",
          "constant.numeric.hex.js",
          "constant.numeric.octal.js",
          // ts
          "constant.numeric.binary.ts",
          "constant.numeric.decimal.ts",
          "constant.numeric.hex.ts",
          "constant.numeric.octal.ts",
          // css
          "constant.numeric.css",
          // json
          "constant.numeric.json",
          // yaml
          "constant.numeric.integer.yaml",
          "constant.numeric.float.yaml",
          // toml
          // Better TOML
          "constant.numeric.integer.toml",
          "constant.numeric.float.toml",
          // Even Better TOML
          "constant.numeric.bin.toml",
          "constant.numeric.hex.toml",
          "constant.numeric.oct.toml",
          "constant.numeric.inf.toml",
          "constant.numeric.nan.toml",
          "constant.language.nan.ts",
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Comment",
        scope: [
          "comment",
          "punctuation.definition.comment",
          // csharp
          "comment.block.cs",
          "comment.line.double-slash.cs",
          // powershell
          "comment.line.powershell",
          // js
          "comment.block.documentation.js",
          "comment.line.double-slash.js",
          // ts
          "comment.block.documentation.ts",
          "comment.line.double-slash.ts",
          // xml
          "comment.block.xml",
          "punctuation.definition.comment.xml",
          // json
          "comment",
          "comment.line.double-slash.js",
          "comment.block.json",
          // yaml
          "punctuation.definition.comment.yaml",
          "comment.line.number-sign.yaml",
          // toml
          "punctuation.definition.comment.toml",
          "comment.line.number-sign.toml",
          // ini
          "punctuation.definition.comment.ini",
          "comment.line.semicolon.ini",
          "comment.line.number-sign.ini",
          // bnf
          "comment.line.bnf",
          "comment.block.bnf",
        ],
        ...commentStyles,
      },
      //
      //
      //
      {
        name: "Attributes",
        scope: [
          // rust
          "meta.attribute.rust",
          "meta.attribute.rust punctuation.definition.attribute.rust",
          "meta.attribute.rust punctuation.brackets.attribute.rust",
          "meta.attribute.rust punctuation.brackets.round.rust",
          "meta.attribute.rust entity.name.type.rust",
          // powershell
          "support.function.attribute.powershell",
          "variable.parameter.attribute.powershell",
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Unresolved Symbol",
        scope: ["invalid", "invalid.illegal"],
        settings: {
          foreground: syntax.red,
        },
      },
      {
        name: "URL",
        scope: ["*url*", "*link*", "*uri*"],
        settings: {
          fontStyle: "underline",
        },
      },
      //
      // RUST
      //
      {
        name: "? Operator",
        scope: [
          "keyword.operator.misc.question-mark.rust",
          "keyword.operator.question.rust",
        ],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "Lifetimes",
        scope: [
          "punctuation.definition.lifetime.rust",
          "entity.name.type.lifetime.rust",
          "storage.modifier.lifetime.rust",
        ],
        settings: {
          foreground: syntax.purple,
        },
      },
      {
        name: "Format Specifier",
        scope: ["meta.interpolation.rust", "punctuation.definition.interpolation.rust"],
        settings: {
          foreground: syntax.purple,
        },
      },
      {
        name: "Macro declaration variable specifier",
        scope: ["variable.other.metavariable.specifier.rust"],
        settings: {
          foreground: syntax.lime,
        },
      },
      //
      // CSHARP
      //
      {
        name: "Csharp - Doc Tag",
        scope: [
          "entity.name.tag.cs",
          "comment.block.documentation.cs punctuation.definition.tag.cs",
          "comment.block.documentation.cs punctuation.separator.equals.cs",
        ],
        settings: {
          foreground: syntax.fadedGray,
        },
      },
      {
        name: "Csharp - Doc Tag Attribute",
        scope: ["entity.other.attribute-name.cs"],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "Csharp - Doc Text",
        scope: ["comment.block.documentation.cs"],
        settings: {
          foreground: syntax.fg,
        },
      },
      {
        name: "Csharp - String Interpolation",
        scope: [
          "punctuation.definition.interpolation.begin.cs",
          "punctuation.definition.interpolation.end.cs",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // JAVA
      //
      {
        name: "Java - this",
        scope: [
          "variable.language.this.java",
          "variable.language.java", // super
        ],
        settings: {
          foreground: syntax.pink,
          fontStyle: "bold"
        },
      },
      {
        name: "Java - mutable",
        scope: [
          "variables.language.java",
          "variable.other.definition.java",
          "variable.other.object.java",
          "variable.other.object.property.java",
          "variable.parameter.java",
        ],
        settings: {
          fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
        },
      },
      //
      // POWERSHELL
      //
      {
        name: "Powershell Variables",
        scope: [
          "variable.other.readwrite.powershell",
          "punctuation.definition.variable.powershell",
          "storage.modifier.scope.powershell",
        ],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "Powershell Variable/Storage Scopes",
        scope: ["storage.modifier.scope.powershell", "support.variable.drive.powershell"],
        settings: {
          foreground: syntax.green,
          fontStyle: "underline",
        },
      },
      {
        name: "Powershell Special/Built-In Variables",
        scope: [
          "support.variable.automatic.powershell",
          "support.variable.automatic.powershell punctuation.definition.variable.powershell",
          "variable.language.powershell",
          "variable.language.powershell punctuation.definition.variable.powershell",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      {
        name: "Powershell Operators",
        scope: [
          "keyword.operator.comparison.powershell",
          "keyword.operator.logical.powershell",
        ],
        settings: {
          foreground: syntax.lightGreen,
        },
      },
      {
        name: "Powershell Comment Keywords",
        scope: "keyword.operator.documentation.powershell",
        settings: {
          foreground: syntax.fg,
        },
      },
      {
        name: "Powershell String Interpolation",
        scope: [
          "punctuation.section.embedded.substatement.begin.powershell",
          "punctuation.section.embedded.substatement.end.powershell",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // JS
      //
      {
        name: "JS - String Interpolation",
        scope: [
          "punctuation.definition.template-expression.begin.js",
          "punctuation.definition.template-expression.end.js",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      {
        name: "JS - Regexp Group",
        scope: [
          "punctuation.definition.group.regexp",
          "punctuation.definition.group.no-capture.regexp",
        ],
        settings: {
          foreground: syntax.fg,
        },
      },
      {
        name: "JS - Regexp Characters",
        scope: [
          "constant.other.character-class.regexp",
          "keyword.operator.quantifier.regexp",
          "keyword.control.anchor.regexp",
          "punctuation.definition.look-ahead.regexp",
          "meta.assertion.look-ahead.regexp",
          "meta.group.assertion.regexp",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // JSX REACT
      //
      {
        name: "JSX - Embedded Code",
        scope: [
          "punctuation.section.embedded.begin.js",
          "punctuation.section.embedded.end.js",
        ],
        settings: {
          foreground: syntax.orange,
          fontStyle: "bold",
        },
      },
      {
        name: "JSX - Attributes",
        scope: ["entity.other.attribute-name.js"],
        settings: {
          foreground: syntax.violet,
          fontStyle: "italic",
        },
      },
      //
      // TS
      //
      {
        name: "TS - String Interpolation",
        scope: [
          "punctuation.definition.template-expression.begin.ts",
          "punctuation.definition.template-expression.end.ts",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // HTML
      //
      {
        name: "HTML - Tags",
        scope: ["entity.name.tag.html"],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "HTML - IDs",
        scope: [
          "meta.attribute.id.html string.quoted.double.html",
          "entity.other.attribute-name.id.css",
        ],
        settings: {
          foreground: syntax.orange,
          fontStyle: "bold",
        },
      },
      {
        name: "HTML - Classes",
        scope: [
          "meta.attribute.class.html string.quoted.double.html",
          "entity.other.attribute-name.class.css",
        ],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "HTML - Attributes",
        scope: ["entity.other.attribute-name.html", "entity.other.attribute-name.css"],
        settings: {
          foreground: syntax.cyan,
          fontStyle: "italic",
        },
      },
      {
        name: "HTML - Attribute Value",
        scope: ["meta.attribute", "meta.attribute-selector.css string.quoted.double.css"],
        settings: {
          foreground: syntax.yellow,
        },
      },
      {
        name: "HTML - Links",
        scope: [
          "meta.attribute.href.html string.quoted.double.html",
          "meta.attribute.src.html string.quoted.double.html",
          "meta.attribute.unrecognized.xmlns.html string.quoted.double.html",
        ],
        settings: {
          foreground: syntax.violet,
        },
      },
      {
        name: "HTML - Embedded CSS",
        scope: ["meta.embedded.line.css"],
        settings: {
          foreground: syntax.lime,
        },
      },
      //
      // CSS
      //
      {
        name: "CSS - Tags",
        scope: ["entity.name.tag.css"],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "CSS - Properties",
        scope: [
          "support.type.property-name.css",
          "meta.property-name.css",
          "meta.property-name.scss",
          "support.type.property-name.media.css",
        ],
        settings: {
          foreground: syntax.lightPurple,
        },
      },
      {
        name: "CSS - Property Values",
        scope: ["support.constant.property-value.css"],
        settings: {
          foreground: syntax.cyan,
        },
      },
      {
        name: "CSS - Fontname Selector",
        scope: ["support.constant.font-name.css"],
        settings: {
          foreground: syntax.yellow,
        },
      },
      {
        name: "CSS - Pseudoclass Selector",
        scope: [
          "entity.other.attribute-name.pseudo-class.css",
          "entity.other.attribute-name.pseudo-element.css",
        ],
        settings: {
          foreground: syntax.lime,
        },
      },
      {
        name: "CSS - Units",
        scope: [
          "keyword.other.unit.rem.css",
          "keyword.other.unit.em.css",
          "keyword.other.unit.ex.css",
          "keyword.other.unit.ch.css",
          "keyword.other.unit.vw.css",
          "keyword.other.unit.vh.css",
          "keyword.other.unit.vmin.css",
          "keyword.other.unit.vmax.css",
          "keyword.other.unit.percentage.css",
          "keyword.other.unit.mm.css",
          "keyword.other.unit.in.css",
          "keyword.other.unit.px.css",
          "keyword.other.unit.pt.css",
          "keyword.other.unit.pc.css",
          "keyword.other.unit.deg.css",
          "constant.other.scss", // {x}n
        ],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "CSS - Logical Operators",
        scope: [
          "keyword.operator.logical.and.media.css",
          "keyword.operator.logical.not.media.css",
          "keyword.operator.logical.only.media.css",
        ],
        settings: {
          foreground: syntax.lightGreen,
        },
      },
      {
        name: "CSS - Media Query Types",
        scope: ["support.constant.media.css"],
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // SCSS
      //
      {
        name: "SCSS - Symbols",
        scope: [
          "punctuation.definition.keyword.scss",
          "keyword.control.at-rule.include.scss",
          "entity.name.tag.reference.scss",
          "entity.name.tag.wildcard.scss",
        ],
        settings: {
          foreground: syntax.pink,
        },
      },
      //
      // XML
      //
      {
        name: "XML - Tags",
        scope: ["entity.name.tag.xml", "entity.name.tag.localname.xml"],
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "XML - Attributes",
        scope: [
          "entity.other.attribute-name.xml",
          "entity.other.attribute-name.localname.xml",
        ],
        settings: {
          foreground: syntax.cyan,
          fontStyle: "italic",
        },
      },
      {
        name: "XML - Tag Namespace",
        scope: ["entity.name.tag.namespace.xml"],
        settings: {
          foreground: syntax.lime,
        },
      },
      {
        name: "XML - Attribute Namespace",
        scope: ["entity.other.attribute-name.namespace.xml"],
        settings: {
          foreground: syntax.lime,
          fontStyle: "italic",
        },
      },
      {
        name: "XML - Attribute Namespace :",
        scope: ["entity.other.attribute-name.xml punctuation.separator.namespace.xml"],
        settings: {
          fontStyle: "italic",
        },
      },
      {
        name: "XML - Doctype",
        scope: "variable.language.documentroot.xml",
        settings: {
          foreground: syntax.violet,
        },
      },
      //
      // MARKDOWN
      //
      ...mdStyles,
      //
      // ASCIIDOC
      //
      {
        name: "Asciidoc - Text",
        scope: ["text.asciidoc"],
        settings: {
          foreground: syntax.fg,
        },
      },
      {
        name: "Asciidoc - Headings",
        scope: [
          "markup.heading.heading-0.asciidoc",
          "markup.heading.heading-1.asciidoc",
          "markup.heading.heading-2.asciidoc",
          "markup.heading.heading-3.asciidoc",
          "markup.heading.heading-4.asciidoc",
          "markup.heading.heading-5.asciidoc",
        ],
        settings: {
          foreground: syntax.pink,
          fontStyle: "bold",
        },
      },
      {
        name: "Asciidoc - Bold Text",
        scope: ["markup.bold.asciidoc"],
        settings: {
          foreground: syntax.orange,
          fontStyle: "bold",
        },
      },
      {
        name: "Asciidoc - Italic Text",
        scope: ["markup.italic.asciidoc"],
        settings: {
          foreground: syntax.blue,
          fontStyle: "italic",
        },
      },
      {
        name: "Asciidoc - Mark Text",
        scope: ["markup.mark.asciidoc"],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "Asciidoc - Punctation",
        scope: [
          "punctuation.separator.asciidoc",
          "callout.asciidoc constant.other.symbol.asciidoc",
          "callout.source.code.asciidoc constant.other.symbol.asciidoc",
          "callout.source.code.asciidoc",
          "markup.macro.kbd.asciidoc",
          "markup.other.menu.asciidoc",
          "markup.macro.btn.asciidoc",
        ],
        settings: {
          foreground: syntax.gray,
        },
      },
      {
        name: "Asciidoc - Inline Punctuation",
        scope: [
          "markup.super.superscript.asciidoc punctuation.definition.asciidoc",
          "markup.sub.subscript.asciidoc punctuation.definition.asciidoc",
          "markup.bold.asciidoc punctuation.definition.asciidoc",
          "markup.italic.asciidoc punctuation.definition.asciidoc",
          "markup.highlight.asciidoc punctuation.definition.asciidoc",
          "markup.mark.constrained.asciidoc markup.meta.attribute-list.asciidoc",
          "markup.mark.asciidoc punctuation.definition.asciidoc",
        ],
        settings: {
          foreground: syntax.gray,
          fontStyle: "italic",
        },
      },
      {
        name: "Asciidoc - Highlight",
        scope: ["markup.highlight.asciidoc"],
        settings: {
          foreground: syntax.yellow,
          fontStyle: "bold",
        },
      },
      {
        name: "Asciidoc - Attribute",
        scope: [
          "markup.meta.attribute-list.asciidoc",
          "markup.heading.block-attribute.asciidoc",
          "markup.heading.block-attribute.asciidoc punctuation.separator.asciidoc",
        ],
        settings: {
          foreground: syntax.gray,
          fontStyle: "italic",
        },
      },
      {
        name: "Asciidoc - Document Attribute",
        scope: [
          "support.constant.attribute-name.asciidoc",
          "markup.substitution.attribute-reference.asciidoc",
        ],
        settings: {
          foreground: syntax.lime,
        },
      },
      {
        name: "Asciidoc - List",
        scope: [
          "markup.list.asciidoc",
          "callout.source.code.asciidoc constant.numeric.asciidoc",
          "callout.asciidoc constant.numeric.asciidoc",
          "markup.list.bullet.asciidoc",
        ],
        settings: {
          foreground: syntax.cyan,
          fontStyle: "bold",
        },
      },
      {
        name: "Asciidoc - Link",
        scope: [
          "markup.link.asciidoc",
          "markup.link.email.asciidoc",
          "markup.reference.xref.asciidoc string.unquoted.asciidoc",
        ],
        settings: {
          foreground: syntax.violet,
          fontStyle: "underline",
        },
      },
      {
        name: "Asciidoc - Table",
        scope: ["markup.table.delimiter.asciidoc", "markup.table.cell.delimiter.asciidoc"],
        settings: {
          foreground: syntax.gray,
          fontStyle: "italic",
        },
      },
      {
        name: "Asciidoc - Footnote",
        scope: ["markup.other.footnote.asciidoc"],
        settings: {
          foreground: syntax.gray,
          fontStyle: "italic",
        },
      },
      {
        name: "Asciidoc - Macro",
        scope: ["entity.name.function.asciidoc"],
        settings: {
          foreground: syntax.blue,
        },
      },
      {
        name: "Asciidoc - Macro content",
        scope: ["string.unquoted.asciidoc"],
        settings: {
          foreground: syntax.yellow,
        },
      },
      {
        name: "Asciidoc - Ruler",
        scope: ["constant.other.symbol.horizontal-rule.asciidoc"],
        settings: {
          foreground: syntax.orange,
          fontStyle: "bold underline",
        },
      },
      //
      // JSON
      //
      {
        name: "JSON - Key",
        scope: "support.type.property-name.json",
        settings: {
          foreground: syntax.lightPurple,
        },
      },
      {
        name: "JSON - Lighten Quotation Marks [DISABLED]",
        scope: [
          "punctuation.support.type.property-name.begin.json",
          "punctuation.support.type.property-name.end.json",
          "punctuation.definition.string.begin.json",
          "punctuation.definition.string.end.json",
        ],
        settings: {
          //"foreground": "#ADB1C2"
        },
      },
      //
      // YAML
      //
      {
        name: "YAML - Keys",
        scope: ["entity.name.tag.yaml"],
        settings: {
          foreground: syntax.lightPurple,
        },
      },
      {
        name: "YAML - Timestamp Values",
        scope: ["constant.other.timestamp.yaml"],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "YAML - Null Values",
        scope: ["constant.language.null.yaml"],
        settings: {
          foreground: syntax.orange,
        },
      },
      {
        name: "YAML - Types",
        scope: ["storage.type.tag-handle.yaml"],
        settings: {
          foreground: syntax.blue,
        },
      },
      {
        name: "YAML - Anchors",
        scope: [
          "entity.name.type.anchor.yaml",
          "punctuation.definition.anchor.yaml",
          "variable.other.alias.yaml",
          "keyword.control.flow.alias.yaml punctuation.definition.alias.yaml",
        ],
        settings: {
          foreground: syntax.lime,
        },
      },
      //
      // TOML
      //
      {
        name: "TOML - Keys",
        scope: [
          // Better TOML
          "keyword.key.toml",
          // Even Better TOML
          "support.type.property-name.toml",
          //"variable.key.toml"
        ],
        settings: {
          foreground: syntax.lightPurple,
        },
      },
      {
        name: "TOML - Timestamp Values",
        scope: [
          // Better TOML
          "constant.other.date.toml",
          "constant.other.datetime.toml",
          "constant.other.datetime-with-timezone.toml",
          // Even Better TOML
          "constant.other.time.date.toml",
          "constant.other.time.time.toml",
          "constant.other.time.datetime.local.toml",
          "constant.other.time.datetime.offset.toml",
        ],
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "TOML - Tables",
        scope: [
          // Better TOML
          "entity.other.attribute-name.table.toml",
          // Even Better TOML
          "support.type.property-name.table.toml",
          //"variable.key.table.toml"
        ],
        settings: {
          foreground: syntax.blue,
        },
      },
      {
        name: "TOML - Array Tables",
        scope: [
          // Better TOML
          "entity.other.attribute-name.table.array.toml",
          // Even Better TOML
          "support.type.property-name.array.toml",
          //"variable.key.array.table.toml"
        ],
        settings: {
          foreground: syntax.lime,
        },
      },
      //
      // INI
      //
      {
        name: "INI - Keys",
        scope: "keyword.other.definition.ini",
        settings: {
          foreground: syntax.pink,
        },
      },
      {
        name: "INI - Headings",
        scope: "entity.name.section.group-title.ini",
        settings: {
          foreground: syntax.lime,
        },
      },
      //
      // BNF
      //
      {
        name: "BNF - Symbol",
        scope: "entity.name.class.bnf",
        settings: {
          foreground: syntax.green,
        },
      },
      {
        name: "BNF - Builtin",
        scope: "support.variable.bnf",
        settings: {
          foreground: syntax.cyan,
        },
      },
    ],
  }
  return textMateTheme;
}
