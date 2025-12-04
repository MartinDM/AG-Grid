import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useState, useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register all Community features to avoid module registration errors
ModuleRegistry.registerModules([AllCommunityModule]);

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

const MyCellComponent = ({ title }: { title: string }) => {
  return (
    <>
      <button onClick={() => window.alert('Action')}>Add a {title} 🚘 </button>
    </>
  );
};

export default function Home() {
  // Define Row data
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model 3', price: 40000, electric: true },
    { make: 'Toyota', model: 'Celica', price: 3500, electric: false },
    { make: 'Ford', model: 'Mondeo', price: 3200, electric: false },
    { make: 'Porsche', model: 'Boxster', price: 7200, electric: false },
    { make: 'Honda', model: 'Civic', price: 22000, electric: false },
    { make: 'BMW', model: '3 Series', price: 41000, electric: false },
    { make: 'Mercedes', model: 'C-Class', price: 43000, electric: false },
    { make: 'Audi', model: 'A4', price: 39000, electric: false },
    { make: 'Volkswagen', model: 'Golf', price: 25000, electric: false },
    { make: 'Nissan', model: 'Leaf', price: 28000, electric: true },
    { make: 'Chevrolet', model: 'Bolt', price: 27000, electric: true },
    { make: 'Hyundai', model: 'Ioniq 5', price: 45000, electric: true },
    { make: 'Kia', model: 'EV6', price: 47000, electric: true },
    { make: 'Volvo', model: 'XC40', price: 38000, electric: false },
    { make: 'Volvo', model: 'XC40 Recharge', price: 55000, electric: true },
    { make: 'Jaguar', model: 'I-PACE', price: 70000, electric: true },
    { make: 'Renault', model: 'ZOE', price: 26000, electric: true },
    { make: 'Peugeot', model: '208', price: 23000, electric: false },
    { make: 'Peugeot', model: 'e-208', price: 31000, electric: true },
    { make: 'Fiat', model: '500e', price: 28000, electric: true },
    { make: 'Skoda', model: 'Octavia', price: 27000, electric: false },
    { make: 'Skoda', model: 'Enyaq', price: 42000, electric: true },
    { make: 'Mazda', model: 'MX-30', price: 34000, electric: true },
    { make: 'Subaru', model: 'Impreza', price: 26000, electric: false },
    { make: 'Subaru', model: 'Solterra', price: 44000, electric: true },
    { make: 'Toyota', model: 'bZ4X', price: 42000, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 52000, electric: true },
    { make: 'Tesla', model: 'Model S', price: 90000, electric: true },
    { make: 'BMW', model: 'i4', price: 65000, electric: true },
    { make: 'Mercedes', model: 'EQB', price: 62000, electric: true },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      editable: true,
      floatingFilter: true,
    };
  });

  const rowClassRules = useMemo(() => ({
    'red-row': (p) => p.data.make == 'Toyota',
  }));

  // Col definitions
  const [colDefs, setColDefs] = useState([
    {
      headerName: 'Make of Car',
      field: 'make',
      flex: 1,
      checkboxSelection: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Tesla', 'Toyota', 'Ford', 'Dodge'] },
      valueGetter: (p) => p.data.make + ' ' + p.data.price,
    },
    { field: 'model' },
    {
      field: 'price',
      valueFormatter: (p) => '£' + p.value,
      cellClassRules: {
        'green-cell': (p) => p.value > 30000,
      },
    },
    {
      field: 'electric',
      cellDataType: 'text',
      editable: false,
      valueFormatter: (p) => (p.value === true || p.value === 'true' ? 'True' : 'False'),
    },
    {
      field: 'action',
      cellRenderer: MyCellComponent,
      cellRendererParams: (p) => ({ title: p.data.model }),
    },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowSelection={'multiple'}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginagtionPageSizeSelector={[10, 20]}
        paginagtionPageSize={10}
        pageSize={10}
        defaultColDef={defaultColDef}
        rowClassRules={rowClassRules}
      />
    </div>
  );
}
