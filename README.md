# AG Grid + React (Vite) Practice

A minimal practice project using AG Grid React, built with React Router on top of Vite. Demonstrates grid setup, theming, TypeScript typing, custom cell renderers, formatting, pagination, and row/cell styling.

## Quickstart

```bash
# Install
npm install

# Dev (HMR)
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Serve built app
npm run start
```

Default dev port is `http://localhost:5173`.

## Key Files

- `app/routes/home.tsx`: Grid setup with 30 sample car records, custom cell renderers, value formatters, row class rules, and pagination
- `app/app.css`: Overrides Quartz theme CSS variables like `--ag-background-color` and `--ag-row-hover-color`
- `app/root.tsx`: Imports global styles
- `tsconfig.json`: TypeScript config with strict mode, excludes `node_modules`
- `.prettierignore`: Excludes build/cache directories from formatting

## AG Grid Features Demonstrated

### Module Registration
```ts
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
```

### TypeScript Typing
```ts
import type {
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams,
  RowClassParams,
  ColDef,
} from 'ag-grid-community';

type RowType = { make: string; model: string; price: number; electric: boolean };
type ButtonParams = ICellRendererParams<RowType> & { buttonText: string };

const colDefs: ColDef<RowType>[] = [ /* ... */ ];
```

### Custom Cell Renderers
- `MakeComp`: Renders buttons with custom params (`buttonText`) and displays cell value with emoji
- `CounterComp`: Tracks render count using `useRef`
- `MyCellComponent`: Simple action button renderer

### Value Formatting
- Price: `valueFormatter: (p) => '£' + p.value`
- Electric: `valueFormatter: (p) => p.value === true ? 'True' : 'False'`
- Make: `valueGetter` combines make field with electric emoji (🍃 or 🔥)

### Styling
- Row class rules: `'featured-row'` applied to Toyota rows
- Cell class rules: `'green-cell'` for prices > £30,000
- Theme customization via CSS variables in `app.css`

### Pagination
```tsx
<AgGridReact
  pagination={true}
  paginationPageSize={10}
  paginationPageSizeSelector={[10, 20]}
/>
```

## Formatting

- One-off: `npx prettier . --write`
- Check only: `npx prettier . --check`
- `.prettierignore` excludes: `node_modules/`, `build/`, `dist/`, `.vite/`, `public/build/`

## TypeScript

- Type check: `npm run typecheck`
- Runs `react-router typegen && tsc`
- Config excludes `node_modules`, `build`, `dist`
- `skipLibCheck: true` avoids checking dependency type definitions

## Troubleshooting

- **"No AG Grid modules are registered (#272)"**: Import and register `AllCommunityModule` as shown above
- **Theme overrides not applying**: Ensure `app/app.css` is imported in `root.tsx` and grid container has `className="ag-theme-quartz"`
- **Row class rules overridden by `.ag-row-odd`**: Increase CSS specificity: `.ag-theme-quartz .ag-row.featured-row { /* styles */ }`
- **Console error `/.well-known/appspecific/`**: Harmless browser request for Apple app-site-association; empty file added in `public/.well-known/`
- **Type errors**: Ensure all AG Grid callback params are properly typed (`ICellRendererParams<RowType>`, `ValueFormatterParams<RowType, TValue>`, etc.)

## Tech Stack

- React 19 + React Router 7
- Vite 7
- TypeScript 5 (strict mode)
- AG Grid Community 34
- Tailwind CSS 4
