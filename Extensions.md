# Extensions
Note: currently it is impossible to have different colors depending on whether the light or dark theme is selected.

## Git Graph
Copy and paste the following snippet into your `settings.json` file:

```json
"git-graph.graph.colours": [
    "#EB5CB1",
    "#0194DB",
    "#19A24D",
    "#B98B01",
    "#E5484D",
    "#C75AF3",
    "#A8759A",
    "#6E82A6",
    "#07A3A0",
    "#7BA403"
],
```

## Todo Tree
Copy and paste the following snippet into your `settings.json` file:

```json
"todo-tree.general.tags": [
    "TODO",
    "FIXME",
    "BUG",
    "HACK",
    "MAYBE",
    "[ ]",
    "[x]",
],
"todo-tree.highlights.customHighlight": {
    "TODO": {
        "foreground": "#fafbfc",
        "background": "#565869",
        "icon": "checklist",
        "iconColour": "#565869",
        "gutterIcon": true
    },
    "FIXME": {
        "foreground": "#fafbfc",
        "background": "#E5484D",
        "icon": "tools",
        "iconColour": "#E5484D",
        "gutterIcon": true
    },
    "BUG": {
        "foreground": "#ffffff",
        "background": "#FF1277",
        "icon": "alert",
        "iconColour": "#FF1277",
        "gutterIcon": true
    },
    "HACK": {
        "foreground": "#fafbfc",
        "background": "#B98B01",
        "icon": "flame",
        "iconColour": "#B98B01",
        "gutterIcon": true
    },
    "MAYBE": {
        "foreground": "#fafbfc",
        "background": "#07A3A0",
        "icon": "info",
        "iconColour": "#07A3A0",
        "gutterIcon": true
    },
    "[ ]": {
        "foreground": "#fafbfc",
        "background": "#565869",
        "icon": "checklist",
        "iconColour": "#565869",
        "gutterIcon": true
    },
    "[x]": {
        "foreground": "#19A24D",
        "background": "#fafbfc",
        "icon": "checklist",
        "iconColour": "#19A24D",
        "gutterIcon": true
    }
},
```