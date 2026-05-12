import type { Config } from "../config";
import { generateMarkdownColors, generateAlternateMarkdownColors as generateMutedPunctuationMarkdownColors } from "./markdown";
import { SyntaxColors } from ".";

export interface TextMateStyle {
	name: string;
	scope: string | string[];
	settings: {
		foreground?: string;
		fontStyle?: string;
	};
}

function tok(name: string, scope: string | string[], foreground?: string, fontStyle?: string): TextMateStyle {
  const settings: TextMateStyle["settings"] = {};
  if (foreground !== undefined) {
    settings.foreground = foreground;
  }
  if (fontStyle !== undefined) {
    settings.fontStyle = fontStyle;
  }
  return { name, scope, settings };
}

export function generateTextMateTheme(
	syntax: SyntaxColors,
	config: Config
) {
  const commentColor = config.mutedComments ? syntax.fadedGray : syntax.lightPink;
	const commentStyles = config.italicComments ?
    {
			settings: {
				foreground: commentColor,
				fontStyle: "italic",
			},
		} :
    {
			settings: {
				foreground: commentColor,
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
          "keyword.control.from.ts",
          "keyword.control.export.ts",
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
          // csharp
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
          "variable.other.readwrite.ts",
          "variable.other.constant.ts",
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
      tok("Powershell Variables",
        [
          "variable.other.readwrite.powershell",
          "punctuation.definition.variable.powershell",
          "storage.modifier.scope.powershell",
        ],
        syntax.green,
      ),
      tok("Powershell Variable/Storage Scopes",
        ["storage.modifier.scope.powershell", "support.variable.drive.powershell"],
        syntax.green,
        "underline",
      ),
      tok("Powershell Special/Built-In Variables",
        [
          "support.variable.automatic.powershell",
          "support.variable.automatic.powershell punctuation.definition.variable.powershell",
          "variable.language.powershell",
          "variable.language.powershell punctuation.definition.variable.powershell",
        ],
        syntax.violet,
      ),
      tok("Powershell Operators",
        [
          "keyword.operator.comparison.powershell",
          "keyword.operator.logical.powershell",
        ],
        syntax.lightGreen,
      ),
      tok("Powershell Comment Keywords",
        "keyword.operator.documentation.powershell",
        syntax.fg,
      ),
      tok("Powershell String Interpolation",
        [
          "punctuation.section.embedded.substatement.begin.powershell",
          "punctuation.section.embedded.substatement.end.powershell",
        ],
        syntax.violet,
      ),
      //
      // JS
      //
      tok("JS - String Interpolation",
        [
          "punctuation.definition.template-expression.begin.js",
          "punctuation.definition.template-expression.end.js",
        ],
        syntax.violet,
      ),
      tok("JS - Regexp Group",
        [
          "punctuation.definition.group.regexp",
          "punctuation.definition.group.no-capture.regexp",
        ],
        syntax.fg,
      ),
      tok("JS - Regexp Characters",
        [
          "constant.other.character-class.regexp",
          "keyword.operator.quantifier.regexp",
          "keyword.control.anchor.regexp",
          "punctuation.definition.look-ahead.regexp",
          "meta.assertion.look-ahead.regexp",
          "meta.group.assertion.regexp",
        ],
        syntax.violet,
      ),
      //
      // JSX REACT
      //
      tok("JSX - Embedded Code",
        [
          "punctuation.section.embedded.begin.js",
          "punctuation.section.embedded.end.js",
        ],
        syntax.orange,
        "bold",
      ),
      tok("JSX - Attributes",
        "entity.other.attribute-name.js",
        syntax.violet,
        "italic",
      ),
      //
      // TS
      //
      tok("TS - String Interpolation",
        [
          "punctuation.definition.template-expression.begin.ts",
          "punctuation.definition.template-expression.end.ts",
        ],
        syntax.violet,
      ),
      //
      // HTML
      //
      tok("HTML - Tags",
        "entity.name.tag.html",
        syntax.pink,
      ),
      tok("HTML - IDs",
        [
          "meta.attribute.id.html string.quoted.double.html",
          "entity.other.attribute-name.id.css",
        ],
        syntax.orange,
        "bold",
      ),
      tok("HTML - Classes",
        [
          "meta.attribute.class.html string.quoted.double.html",
          "entity.other.attribute-name.class.css",
        ],
        syntax.green,
      ),
      tok("HTML - Attributes",
        ["entity.other.attribute-name.html", "entity.other.attribute-name.css"],
        syntax.cyan,
        "italic",
      ),
      tok("HTML - Attribute Value",
        ["meta.attribute", "meta.attribute-selector.css string.quoted.double.css"],
        syntax.yellow,
      ),
      tok("HTML - Links",
        [
          "meta.attribute.href.html string.quoted.double.html",
          "meta.attribute.src.html string.quoted.double.html",
          "meta.attribute.unrecognized.xmlns.html string.quoted.double.html",
        ],
        syntax.violet,
      ),
      tok("HTML - Embedded CSS", "meta.embedded.line.css", syntax.lime),
      // CSS
      //
      tok("CSS - Tags", "entity.name.tag.css", syntax.pink),
      tok("CSS - Properties",
        [
          "support.type.property-name.css",
          "meta.property-name.css",
          "meta.property-name.scss",
          "support.type.property-name.media.css",
        ],
        syntax.lightPurple,
      ),
      tok("CSS - Property Values", "support.constant.property-value.css", syntax.cyan),
      tok("CSS - Fontname Selector", "support.constant.font-name.css", syntax.yellow),
      tok("CSS - Pseudoclass Selector",
        [
          "entity.other.attribute-name.pseudo-class.css",
          "entity.other.attribute-name.pseudo-element.css",
        ],
        syntax.lime,
      ),
      tok("CSS - Units",
        [
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
        syntax.orange,
      ),
      tok("CSS - Logical Operators",
        [
          "keyword.operator.logical.and.media.css",
          "keyword.operator.logical.not.media.css",
          "keyword.operator.logical.only.media.css",
        ],
        syntax.lightGreen,
      ),
      tok("CSS - Media Query Types",
        ["support.constant.media.css"],
        syntax.violet,
      ),
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
      tok("XML - Tags",
        ["entity.name.tag.xml", "entity.name.tag.localname.xml"],
        syntax.pink,
      ),
      tok(
        "XML - Attributes",
        [
          "entity.other.attribute-name.xml",
          "entity.other.attribute-name.localname.xml",
        ],
        syntax.cyan,
        "italic",
      ),
      tok("XML - Tag Namespace", "entity.name.tag.namespace.xml", syntax.lime),
      tok("XML - Attribute Namespace", "entity.other.attribute-name.namespace.xml", syntax.lime, "italic"),
      {
        name: "XML - Attribute Namespace :",
        scope: ["entity.other.attribute-name.xml punctuation.separator.namespace.xml"],
        settings: {
          fontStyle: "italic",
        },
      },
      tok("XML - Doctype", "variable.language.documentroot.xml", syntax.violet),
      // MARKDOWN
      //
      ...mdStyles,
      //
      // ASCIIDOC
      //
      tok("Asciidoc - Text", "text.asciidoc", syntax.fg),
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
      tok("Asciidoc - Bold Text", "markup.bold.asciidoc", syntax.orange, "bold"),
      tok("Asciidoc - Italic Text", "markup.italic.asciidoc", syntax.blue, "italic"),
      tok("Asciidoc - Mark Text", "markup.mark.asciidoc", syntax.green),
      {
        name: "Asciidoc - Punctuation",
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
      tok("Asciidoc - Highlight", "markup.highlight.asciidoc", syntax.yellow, "bold"),
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
      tok("Asciidoc - Footnote", "markup.other.footnote.asciidoc", syntax.gray, "italic"),
      tok("Asciidoc - Macro", "entity.name.function.asciidoc", syntax.blue),
      tok("Asciidoc - Macro content", "string.unquoted.asciidoc", syntax.yellow),
      tok("Asciidoc - Ruler", "constant.other.symbol.horizontal-rule.asciidoc", syntax.orange, "bold underline"),
      //
      // JSON
      //
      tok("JSON - Key", "support.type.property-name.json", syntax.lightPurple),
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
      tok("YAML - Keys","entity.name.tag.yaml", syntax.lightPurple),
      tok("YAML - Timestamp Values", "constant.other.timestamp.yaml", syntax.green),
      tok("YAML - Null Values", "constant.language.null.yaml", syntax.orange),
      tok("YAML - Types", "storage.type.tag-handle.yaml", syntax.blue),
      tok("YAML - Anchors",
        [
          "entity.name.type.anchor.yaml",
          "punctuation.definition.anchor.yaml",
          "variable.other.alias.yaml",
          "keyword.control.flow.alias.yaml punctuation.definition.alias.yaml",
        ],
        syntax.lime,
      ),
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
      tok("INI - Keys", "keyword.other.definition.ini", syntax.pink),
      tok("INI - Headings", "entity.name.section.group-title.ini", syntax.lime),
      //
      // BNF
      //
      tok("BNF - Symbol", "entity.name.class.bnf", syntax.green),
      tok("BNF - Builtin", "support.variable.bnf", syntax.cyan),
    ],
  }
  return textMateTheme;
}
