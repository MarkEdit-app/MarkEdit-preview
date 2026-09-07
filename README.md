# MarkEdit-preview

Markdown view modes for [MarkEdit](https://github.com/MarkEdit-app/MarkEdit) that leverage [markedit-api](https://github.com/MarkEdit-app/MarkEdit-api).

## Installation

Install this extension from the [MarkEdit Extension Registry](https://markedit-app.github.io/extensions/#markedit-preview).

## Building

Run `yarn install && yarn build` to build and deploy the script.

To build the lite version, run `yarn build:lite` instead.

## Development

- `yarn test` — run tests
- `yarn lint` — run linting (also runs automatically before build)

## How to Use

Choose a mode from `Extensions` > `View Mode`, or use the keyboard shortcut <kbd>Shift–Command–V</kbd> to cycle through modes.

<img src="./screenshot.png" width="520" alt="Using MarkEdit-preview">

To display local images, please ensure you're using MarkEdit 1.24.0 or later and follow [the guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#grant-folder-access) to grant file access.

This extension also exposes global functions, `MarkEditGetHtml(styled: boolean) => Promise<string>` and `MarkEditRenderHtml(markdown: string, styled: boolean) => Promise<string>`, allowing other extensions or scripts to easily generate the rendered HTML — either from the current document or from arbitrary markdown input.

## Styling

This extension applies the [github-markdown](https://github.com/sindresorhus/github-markdown-css) styling. You can customize the appearance by following the [customization](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization) guidelines.

The preview pane can be styled using the `markdown-body` CSS class.

## Settings

In [settings.json](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#advanced-settings), you can define a settings node named `extension.markeditPreview` to configure this extension, default settings are:

```json
{
  "extension.markeditPreview": {
    "syncScroll": true,
    "hidePreviewButtons": true,
    "syntaxAutoDetect": false,
    "imageHoverPreview": false,
    "inlineImages": false,
    "themeName": "github",
    "styledHtmlColorScheme": "auto",
    "mathDelimiters": [],
    "changeMode": {
      "modes": ["edit", "side-by-side", "preview", "syntax-hidden"],
      "hotKey": {
        "key": "V",
        "modifiers": ["Command"]
      }
    },
    "markdownIt": {
      "preset": "default",
      "options": {}
    }
  }
}
```

- `syncScroll`: Whether to enable scroll synchronization.
- `hidePreviewButtons`: Whether to hide the built-in preview buttons in side-by-side mode (not applicable for lite build).
- `syntaxAutoDetect`: Whether to enable automatic language detection for syntax highlighting in code blocks (not applicable for lite build).
- `imageHoverPreview`: Whether to enable image preview on hover.
- `inlineImages`: Whether Mixed mode replaces image links with inline images.
- `themeName`: Set the preview color theme, available themes can be found in the [`styles/themes`](styles/themes) folder. Use `"auto"` to follow the app's current theme (every built-in app theme has a preview counterpart, and a dark app theme keeps the preview dark regardless of the system appearance). Use `"none"` to disable preview styling and render the raw HTML.
- `styledHtmlColorScheme`: Determine the color scheme of saving styled html files, valid values are `light`, `dark`, and `auto`.
- `mathDelimiters`: Customize math delimiters for KaTeX rendering (not applicable for lite build), each delimiter object has `left`, `right`, and `display` properties, defaults to `$...$`, `$$...$$`, `\(...\)`, and `\[...\]`.
- `changeMode.modes`: Order modes by ID: `edit` (Markdown Source), `side-by-side` (Side-by-Side), `preview` (Overlay), and `syntax-hidden` (Mixed). If neither editor mode is included, `edit` is added automatically.
- `changeMode.hotKey`: Assign keyboard shortcuts for mode switching. See the specification [here](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#generalmainwindowhotkey).
- `markdownIt.preset`: Override the default [markdown-it](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) preset.
- `markdownIt.options`: Customize [markdown-it](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) options.

> [!TIP]
>
> In MarkEdit 1.33.0 or later, this extension also provides preview support in [Quick Look](https://github.com/MarkEdit-app/MarkEdit/wiki/Manual#quick-look-extension).
>
> To add menu items to the toolbar, see MarkEdit [Customization](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#editorcustomtoolbaritems) wiki.

## Community Extensions

- [Bidirectional Preview Sync](https://github.com/Nigelw/MarkEdit-bidirectional-preview-sync) (by [@Nigelw](https://github.com/Nigelw/)): Keeps MarkEdit’s editor and preview modes synchronized as you switch between them and scroll, replacing MarkEdit-preview's one-way editor→preview sync.
- [Direct Preview](https://github.com/Squarelight-ai/markedit-direct-preview) (by [@Squarelight-ai](https://github.com/Squarelight-ai)): A setup helper that provides a one-click setup for a two-mode Edit/Preview toggle by configuring the toolbar item and `changeMode.modes` for you.

## Contribution

Pull requests are welcome, but please discuss the proposal before making changes. This helps avoid misunderstandings and saves effort on both sides.
