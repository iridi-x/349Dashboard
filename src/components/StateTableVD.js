import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem 0;

  .table-container {
    display: flex;
    justify-content: center;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;

      &:last-child {
        border-right: 0;
      }
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f5f5f5;
    }
  }
`;
// ... (other imports and styles)

const columns = [
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'Population',
    accessor: 'population',
    Cell: ({ value }) => value ? value.toLocaleString() : 'error!',
  },
  {
    Header: 'Cases',
    accessor: 'cases',
    Cell: ({ value }) => value ? value.toLocaleString() : 'error!',
  },
  {
    Header: 'Deaths',
    accessor: 'deaths',
    Cell: ({ value }) => value ? value.toLocaleString() : 'error!',
  },
  {
    Header: 'Vaccinations',
    accessor: 'vaccinations',
    Cell: ({ value }) => value ? value.toLocaleString() : 'error!',
  },
];

const StateTableVD = ({ covidData, covidData1 }) => {
  // Check if both data arrays exist
  if (!covidData || !covidData1) {
    return <p>Error: Missing data.</p>;
  }

  // Merge data based on the state name and filter out rows with all values as 0
  const mergedData = covidData
    .map((item1) => {
      const item2 = covidData1.find((item2) => item1.state === item2.state);

      return {
        state: item1.state,
        population: item1.population,
        cases: item1.cases,
        deaths: item1.deaths,
        vaccinations: item2 && item2.timeline ? Object.values(item2.timeline)[0] || 0 : 0,
      };
    })
    .filter((row) => Object.values(row).some((value) => value !== 0));

  // Limit the number of rows to 25
  const limitedData = mergedData.slice(0, 25);

  // Render the table using limitedData
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: limitedData });

  return (
    <Styles>
      <h2>State Population, Vaccinations, and Deaths</h2>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Styles>
  );
};

export default StateTableVD;
