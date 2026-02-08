import { Config } from "../config";
import { SyntaxColors } from ".";

/// https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-token-classification
export interface StandardTokenTypeColors {
  namespace: string;
  class: string;
  enum: string;
  interface: string;
  struct: string;
  typeParameter: string;
  type: string; // usually primitive type eg `bool`, `i32`
  parameter: string;
  variable: string;
  property: string;
  enumMember: string;
  decorator: string;
  event: string; // ???
  function: string;
  method: string;
  macro: string;
  label: string;
  comment: string;
  string: string;
  regexp: string;
  operator: string;
}
// standard token modifiers
// declaration
// definition
// readonly
// static
// deprecated
// abstract
// async
// modification
// documentation
// defaultLibrary

// custom colors
export interface SemanticThemeColors extends StandardTokenTypeColors {
  keyword: string,
  type: string, // usually primitive type eg `bool`, `i32`
  builtinType: string,
  selfKeyword: string,
  newOperator: string,

  punctuation: string,
  operator: string,
  arithmetic: string,
  comparison: string,
  logical: string,
  bitwise: string,

  function: string,
  mutFunction: string,
  method: string,
  mutMethod: string,
  decorator: string,
  attribute: string,
  macro: string,

  lifetime: string,
  label: string,
  namespace: string,

  struct: string,
  class: string,
  typeAlias: string,

  enum: string,
  union: string,
  enumMember: string,

  interface: string, // `MyTrait`
  typeParameter: string, // `<T> T`

  variable: string,
  mutVariable: string,
  parameter: string,
  mutParameter: string,
  property: string, // Object members

  constant: string,
  boolean: string,
  number: string,
  escapeSequence: string, // `\n`
  character: string, // `'b'`

  string: string, // `"string"`
  regexp: string,
  formatSpecifier: string,
  
  comment: string,
  
  unsafe: string,

  error: string, // unresolvedReference

  text: string,
}

export function generateSemanticThemeColors(
  syntax: SyntaxColors,
): SemanticThemeColors {
  const colors: StandardTokenTypeColors = {
    type: syntax.pink,

    operator: syntax.lightGreen,

    function: syntax.green,
    method: syntax.green,
    decorator: syntax.green,
    macro: syntax.strongPink,

    namespace: syntax.fg,

    struct: syntax.blue,
    class: syntax.blue,
    enum: syntax.blue,

    enumMember: syntax.cyan,

    interface: syntax.cornflower,
    typeParameter: syntax.skyBlue,

    variable: syntax.fg,
    parameter: syntax.violet,
    property: syntax.lightPurple,

    label: syntax.lime,

    string: syntax.yellow,

    comment: syntax.lightPink,

    event: syntax.lime,
    regexp: syntax.orange,
  }
  
  const constant = syntax.orange;

  return {
    keyword: syntax.pink,
    type: colors.type,
    builtinType: syntax.pink,
    selfKeyword: syntax.pink,
    newOperator: syntax.pink,

    punctuation: colors.operator,
    operator: colors.operator,
    arithmetic: colors.operator,
    comparison: colors.operator,
    logical: colors.operator,
    bitwise: colors.operator,

    function: colors.function,
    mutFunction: syntax.boldGreen,
    method: colors.method,
    mutMethod: syntax.boldGreen,
    decorator: colors.decorator,
    attribute: constant,
    macro: colors.macro,

    lifetime: syntax.purple,
    label: colors.label,
    namespace: colors.namespace,

    struct: colors.struct,
    class: colors.class,
    typeAlias: colors.struct,

    enum: colors.enum,
    union: colors.enum,
    enumMember: colors.enumMember,

    interface: colors.interface,
    typeParameter: colors.typeParameter,

    variable: colors.variable,
    mutVariable: syntax.boldFg,
    parameter: colors.parameter,
    mutParameter: syntax.boldViolet,
    property: colors.property,

    constant,
    boolean: constant,
    number: constant,
    escapeSequence: constant,
    character: constant,

    string: colors.string,
    regexp: colors.regexp,
    formatSpecifier: syntax.purple,
    
    comment: colors.comment,

    event: colors.event,
    
    unsafe: syntax.red,

    error: syntax.red,

    text: syntax.fg,
  };
}


export function generateSemanticTheme(
	semantic: SemanticThemeColors,
	config: Config
): Record<string, any> {

	// Configure comment styles
  const commentSemanticStyle = config.italicComments ? {
    comment: {
      foreground: semantic.comment,
      fontStyle: "italic",
    },
  } : { comment: semantic.comment, };


  return {
    ...semantic,
    // keyword
    "plainKeyword:csharp": semantic.keyword,
    "controlKeyword:csharp": semantic.keyword,
    //
    // operators
    //
    // functions
    "member.static:csharp": {
      // Static function.
      foreground: semantic.function,
      fontStyle: "underline",
    },
    "method.static:typescript": {
      // Static method.
      foreground: semantic.method,
      fontStyle: "underline",
    },
    "member:csharp": semantic.method, // Object method.
    "type:typescript": semantic.type,
    // types
    "class.static:csharp": {
      // Static class.
      foreground: semantic.type,
      fontStyle: "underline",
    },
    // enums
    //
    //
    // interfaces
    //
    //
    "local:csharp": semantic.variable, // Local variable
    "field:csharp": semantic.property, // Object members
    "field.static:csharp": {
      // Static object members.
      foreground: semantic.property,
      fontStyle: "underline",
    },
    "property:csharp": {
      // Csharp properties.
      foreground: semantic.property,
      fontStyle: "bold",
    },
    "property.static:csharp": {
      // Cssharp static properties.
      foreground: semantic.property,
      fontStyle: "bold underline",
    },
    "property.static:typescript": {
      // Typescript static members.
      foreground: semantic.property,
      fontStyle: "underline",
    },
    "*.constant": semantic.constant,
    "variable.static:csharp": semantic.constant, // Constants
    "variable.readonly:csharp": semantic.constant, // Constants
    //
    //
    "stringVerbatim:csharp": semantic.string,
    ...commentSemanticStyle,
    //
    //
    //attribute: syntax.attribute, // The #[]!() symbols in an attribute.
    unresolvedReference: {
      foreground: semantic.error,
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
    xmlDocCommentText: semantic.text,
    "xmlDocCommentName:csharp": semantic.comment,
    "xmlDocCommentDelimiter:csharp": semantic.comment,
    "xmlDocCommentAttributeName:csharp": semantic.attribute,
    "xmlDocCommentAttributeQuotes:csharp": semantic.string,
    "xmlDocCommentAttributeValue:csharp": semantic.string,
    //
    // RUST
    "keyword.constant": semantic.keyword,
    "operator.controlFlow:rust": semantic.keyword,
    "label:rust": semantic.label,
    "lifetime:rust": semantic.lifetime,
    "formatSpecifier:rust": semantic.formatSpecifier,
    "macroBang:rust": semantic.macro, // The ! in a macro call.
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
      foreground: semantic.mutVariable,
      fontStyle: "bold",
    },
    "method.mutable": {
      foreground: semantic.mutMethod,
      fontStyle: "bold",
    },
    "function.mutable": {
      foreground: semantic.mutFunction,
      fontStyle: "bold",
    },
    "parameter.mutable": {
      foreground: semantic.mutParameter,
      fontStyle: "bold",
    },
    //"selfKeyword.mutable": {
    //  foreground: syntax.boldPink,
    //  fontStyle: "bold",
    //},
    //
    // MUTABLE REFERENCE
    "variable.mutable.reference": {
      foreground: semantic.mutVariable,
      fontStyle: "italic bold",
    },
    "method.mutable.reference": {
      foreground: semantic.mutMethod,
      fontStyle: "italic bold",
    },
    "function.mutable.reference": {
      foreground: semantic.mutFunction,
      fontStyle: "italic bold",
    },
    "parameter.mutable.reference": {
      foreground: semantic.mutParameter,
      fontStyle: "italic bold",
    },
    //"selfKeyword.mutable.reference": {
    //  foreground: syntax.boldPink,
    //  fontStyle: "italic bold",
    //},
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
    "*.unsafe": semantic.unsafe,
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
    "attributeBracket.attribute:rust": semantic.attribute,
    "builtinAttribute.attribute:rust": semantic.attribute,
    "toolModule.attribute:rust": semantic.attribute,
    "decorator.attribute:rust": semantic.attribute,
    "derive.attribute:rust": semantic.attribute,
    "generic.attribute:rust": semantic.attribute,
    "parenthesis.attribute:rust": semantic.attribute,
    //
    // TOML - Even Better TOML only
    tomlTableKey: semantic.enum, // ?? blue
    tomlArrayKey: semantic.label, // ?? lime
  };
}


