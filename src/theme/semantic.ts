import { Config } from "../config";
import { SyntaxColors } from ".";

export function generateSemanticTheme(
	syntax: SyntaxColors,
	config: Config
) {
	// Configure comment styles.
	let commentSemanticStyles;
	if (config.italicComments) {
		commentSemanticStyles = {
			comment: {
				foreground: syntax.lightPink,
				fontStyle: "italic",
			},
		};
	} else {
		commentSemanticStyles = {
			comment: syntax.lightPink,
		};
	}

  const semanticTokenColors = {
    keyword: syntax.pink,
    type: syntax.pink,
    builtinType: syntax.pink,
    selfKeyword: syntax.pink,
    newOperator: syntax.pink,
    "plainKeyword:csharp": syntax.pink,
    "controlKeyword:csharp": syntax.pink,
    //
    //
    punctuation: syntax.lightGreen,
    operator: syntax.lightGreen,
    arithmetic: syntax.lightGreen,
    comparison: syntax.lightGreen,
    logical: syntax.lightGreen,
    bitwise: syntax.lightGreen,
    //
    //
    function: syntax.green, // Static function.
    "member.static:csharp": {
      // Static function.
      foreground: syntax.green,
      fontStyle: "underline",
    },
    "method.static:typescript": {
      // Static method.
      foreground: syntax.green,
      fontStyle: "underline",
    },
    method: syntax.green, // Object method.
    "member:csharp": syntax.green, // Object method.
    macro: syntax.strongPink,
    namespace: syntax.fg,
    "type:typescript": syntax.blue,
    struct: syntax.blue,
    class: syntax.blue,
    "class.static:csharp": {
      // Static class.
      foreground: syntax.blue,
      fontStyle: "underline",
    },
    enum: syntax.blue,
    union: syntax.blue,
    typeAlias: syntax.blue,
    enumMember: syntax.cyan,
    boolean: syntax.orange,
    //
    //
    interface: syntax.cornflower, // Interfaces, e.g. `MyTrait`
    typeParameter: syntax.skyBlue, // Generic type annotation, e.g. `T`
    //
    //
    variable: syntax.fg,
    "local:csharp": syntax.fg, // Local variable.
    parameter: syntax.violet,
    property: syntax.lightPurple, // Object members.
    "field:csharp": syntax.lightPurple, // Object members.
    "field.static:csharp": {
      // Static object members.
      foreground: syntax.lightPurple,
      fontStyle: "underline",
    },
    "property:csharp": {
      // Csharp properties.
      foreground: syntax.lightPurple,
      fontStyle: "bold",
    },
    "property.static:csharp": {
      // Cssharp static properties.
      foreground: syntax.violet,
      fontStyle: "bold underline",
    },
    "property.static:typescript": {
      // Typescript static members.
      foreground: syntax.violet,
      fontStyle: "underline",
    },
    "*.constant": syntax.orange,
    "variable.static:csharp": syntax.orange, // Constants
    "variable.readonly:csharp": syntax.orange, // Constants
    //
    //
    string: syntax.yellow, // `"string"`
    "stringVerbatim:csharp": syntax.yellow,
    escapeSequence: syntax.orange, // `\n`
    character: syntax.orange, // `'b'`
    number: syntax.orange,
    ...commentSemanticStyles,
    //
    //
    //attribute: syntax.attribute, // The #[]!() symbols in an attribute.
    unresolvedReference: {
      foreground: syntax.red,
    },
    // C
    "macro:c": {
      fontStyle: "underline"
    },
    "variable:c": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "variable.readonly:c": {
      fontStyle: ""
    },
    "parameter:c": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "parameter.readonly:c": {
      fontStyle: ""
    },
    // C++
    "macro:cpp": {
      fontStyle: "underline"
    },
    "variable:cpp": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "variable.readonly:cpp": {
      fontStyle: "",
    },
    "parameter:cpp": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "parameter.readonly:cpp": {
      fontStyle: ""
    },
    "property:cpp": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "property.readonly:cpp": {
      fontStyle: ""
    },
    "method:cpp": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "method.readonly:cpp": {
      fontStyle: ""
    },
    //
    // CSHARP
    xmlDocCommentText: syntax.fg,
    "xmlDocCommentName:csharp": syntax.fadedGray,
    "xmlDocCommentDelimiter:csharp": syntax.fadedGray,
    "xmlDocCommentAttributeName:csharp": syntax.orange,
    "xmlDocCommentAttributeQuotes:csharp": syntax.yellow,
    "xmlDocCommentAttributeValue:csharp": syntax.yellow,
    //
    // RUST
    "keyword.constant": syntax.pink,
    "operator.controlFlow:rust": syntax.pink,
    "label:rust": syntax.lime,
    "lifetime:rust": syntax.purple,
    "formatSpecifier:rust": syntax.violet,
    "macroBang:rust": syntax.strongPink, // The ! in a macro call.
    //
    // REFERENCE
    "variable.reference": {
      fontStyle: "italic",
    },
    "method.reference": {
      fontStyle: "italic",
    },
    "function.reference": {
      fontStyle: "italic",
    },
    "parameter.reference": {
      fontStyle: "italic",
    },
    "selfKeyword.reference": {
      fontStyle: "italic",
    },
    //
    // MUTABLE
    "variable.mutable": {
      foreground: syntax.boldFg,
      fontStyle: "bold",
    },
    "method.mutable": {
      foreground: syntax.boldGreen,
      fontStyle: "bold",
    },
    "function.mutable": {
      foreground: syntax.boldGreen,
      fontStyle: "bold",
    },
    "parameter.mutable": {
      foreground: syntax.boldViolet,
      fontStyle: "bold",
    },
    "selfKeyword.mutable": {
      foreground: syntax.boldPink,
      fontStyle: "bold",
    },
    //
    // MUTABLE REFERENCE
    "variable.mutable.reference": {
      foreground: syntax.boldFg,
      fontStyle: "italic bold",
    },
    "method.mutable.reference": {
      foreground: syntax.boldGreen,
      fontStyle: "italic bold",
    },
    "function.mutable.reference": {
      foreground: syntax.boldGreen,
      fontStyle: "italic bold",
    },
    "parameter.mutable.reference": {
      foreground: syntax.boldViolet,
      fontStyle: "italic bold",
    },
    "selfKeyword.mutable.reference": {
      foreground: syntax.boldPink,
      fontStyle: "italic bold",
    },
    // Unset the underline effect, since something like `+=` would otherwise be underlined.
    "arithmetic.mutable": {
      fontStyle: "",
    },
    // Also unset.
    "bitwise.mutable": {
      fontStyle: "",
    },
    //
    // UNSAFE
    "*.unsafe": syntax.red,
    "keyword.unsafe": {
      fontStyle: "bold underline",
    },
    "function.unsafe": {
      fontStyle: "underline",
    },
    "function.mutable.unsafe": {
      fontStyle: "bold underline",
    },
    "function.mutable.reference.unsafe": {
      fontStyle: "bold underline italic",
    },
    "method.unsafe": {
      fontStyle: "underline",
    },
    "method.mutable.unsafe": {
      fontStyle: "bold underline",
    },
    "method.mutable.reference.unsafe": {
      fontStyle: "bold underline italic",
    },
    // JS
    "variable:javascript": {
      fontStyle: "bold",
    },
    "parameter:javascript": {
      fontStyle: "bold",
    },
    "property:javascript": {
      fontStyle: "bold",
    },
    "variable.readonly:javascript": {
      fontStyle: "",
    },
    "parameter.readonly:javascript": {
      fontStyle: "",
    },
    "property.readonly:javascript": {
      fontStyle: "",
    },
    // TS
    "variable:typescript": {
      fontStyle: "bold",
    },
    "parameter:typescript": {
      fontStyle: "bold",
    },
    "property:typescript": {
      fontStyle: "bold",
    },
    "variable.readonly:typescript": {
      fontStyle: "",
    },
    "parameter.readonly:typescript": {
      fontStyle: "",
    },
    "property.readonly:typescript": {
      fontStyle: "",
    },
    //
    // JAVA
    "variable:java": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "parameter:java": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "property:java": {
      fontStyle: config.boldDefaultMutableVariables ? "bold" : "",
    },
    "variable.readonly:java": {
      fontStyle: "",
    },
    "parameter.readonly:java": {
      fontStyle: "",
    },
    "property.readonly:java": {
      fontStyle: "",
    },
    //
    // ATTRIBUTES
    "attributeBracket.attribute:rust": syntax.orange,
    "builtinAttribute.attribute:rust": syntax.orange,
    "toolModule.attribute:rust": syntax.orange,
    "decorator.attribute:rust": syntax.orange,
    "derive.attribute:rust": syntax.orange,
    "generic.attribute:rust": syntax.orange,
    "parenthesis.attribute:rust": syntax.orange,
    //
    // TOML - Even Better TOML only
    tomlTableKey: syntax.blue,
    tomlArrayKey: syntax.lime,
  };
  return semanticTokenColors;
}


