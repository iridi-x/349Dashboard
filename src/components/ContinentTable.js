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

const columns = [
  {
    Header: 'Continent',
    accessor: 'continent',
  },
  {
    Header: 'Population',
    accessor: 'population',
    Cell: ({ value }) => value.toLocaleString(),
  },
  {
    Header: 'Cases',
    accessor: 'cases',
    Cell: ({ value }) => value.toLocaleString(),
  },
  {
    Header: 'Deaths',
    accessor: 'deaths',
    Cell: ({ value }) => value.toLocaleString(),
  },
  {
    Header: 'Recovered',
    accessor: 'recovered',
    Cell: ({ value }) => value.toLocaleString(),
  },
];

const ContinentTable = ({ covidData }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: covidData });

  return (
    <Styles>
      <h2>Continent Data</h2>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
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

export default ContinentTable;