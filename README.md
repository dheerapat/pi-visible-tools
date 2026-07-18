# visible-tools

A small [Pi coding agent](https://github.com/badlogic/pi-mono) extension that displays the currently active built-in tools below the editor.

When the active tool set changes, the extension updates a `visible-tools` widget with a line such as:

```text
tools: read, bash, edit, write
```

Only Pi's built-in tools are shown: `read`, `bash`, `edit`, `write`, `grep`, `find`, and `ls`.

## Installation

```bash
pi install git:github.com/dheerapat/pi-visible-tools
```

If you are loading the extension directly from a local checkout, point Pi at this repository or load `index.ts` according to your Pi configuration.

## Behavior

- Updates when a session starts.
- Updates at the start of each turn.
- Shows only active built-in tools.
- Places the widget below the editor.
- Removes the widget when no supported tools are active.
- Avoids unnecessary redraws when the active tool list has not changed.
