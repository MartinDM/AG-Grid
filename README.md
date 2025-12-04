# AG Grid + React (Vite) Practice

A minimal practice project using AG Grid React, built with React Router on top of Vite. It demonstrates basic grid setup, theming, and formatting.

## Quickstart

```bash
# Install
npm install

# Dev (HMR)
npm run dev

# Build
npm run build

# Serve built app
npm run start
```

Default dev port is `http://localhost:5173`.

## Key Files

- `app/routes/home.tsx`: Grid setup (row data, column defs, custom cell renderer). Registers AG Grid Community modules:
	```ts
	import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
	ModuleRegistry.registerModules([AllCommunityModule]);
	```
- `app/app.css`: Overrides Quartz theme CSS variables like `--ag-background-color`.
- `app/root.tsx`: Imports global styles (`import './app.css'`).

## AG Grid Theme

- Theme CSS loaded in `home.tsx`:
	```ts
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	```
- Custom variables applied via `.ag-theme-quartz` in `app/app.css`.
	Ensure your grid container uses `className="ag-theme-quartz"`.

## Boolean Display Example

To render a boolean as the strings `True`/`False` instead of a checkbox:

```ts
{
	field: 'electric',
	cellDataType: 'text',
	valueFormatter: (p) => (p.value === true || p.value === 'true' ? 'True' : 'False'),
}
```

## Formatting

- One-off format: `npx prettier . --write`
- Ignore file: `.prettierignore` is included to skip build, cache, and dependency folders.

## Troubleshooting

- "No AG Grid modules are registered (#272)": import and register `AllCommunityModule` as shown above.
- Theme overrides not applying: ensure `app/app.css` is imported and the grid container has `.ag-theme-quartz`.

## Notes

- Tech stack: React Router + Vite, TypeScript, Tailwind CSS, AG Grid React.
