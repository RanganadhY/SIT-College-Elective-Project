import React,{ useState, useMemo} from 'react';
import { useTable, usePagination, useRowSelect} from "react-table";
import { useLocation } from 'react-router-dom';
import * as XLSX from "xlsx";

//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import { AdminLoader } from '../../components/loading component/loader';

import { Checkbox } from "../../components/Checkbox/Checkbox";
import { ColumnFilter } from '../../components/columnFilter/ColumnFilter';
import "../../css/adminCss/report.css"


function Report() {

    const state = useLocation().state;

    const [reportData, setReportData] = useState(state.reportData);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: "USN",
                accessor: "usn",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Branch",
                accessor: "branch",
                Filter:ColumnFilter
            },
            {
                Header: "Semester",
                accessor: "semester",
                Filter:ColumnFilter
            },
            {
                Header: "Academic Year",
                accessor: "academicYear",
                Filter:ColumnFilter
            },
            {
                Header: "Cycle",
                accessor: "cycle",
                Filter:ColumnFilter
            },
            {
                Header: "Engineering Science Course",
                accessor: "ESC",
            },
            {
                Header: "Optional Course",
                accessor: "CYC",
            },
            {
                Header: "Mandatory Courses",
                accessor: "MD",
            },
        ],
        []
    );


    const tableData = useMemo(() => reportData, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        selectedFlatRows,
        canPreviousPage,
        prepareRow,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data: tableData,
            initialState: { pageSize: 10 }
        },
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        },
        usePagination,
        useRowSelect,
    );

    const handleDownload = async()=>{
        if (selectedFlatRows.length === 0) {
            alert("No data Selected")
        } else {
            let toDownload = [];
            selectedFlatRows.forEach((row) => {
                toDownload.push(row.original)
            });
            var fullBook = XLSX.utils.book_new(),
                fullSheet = XLSX.utils.json_to_sheet(toDownload);

            XLSX.utils.book_append_sheet(fullBook, fullSheet, "registrations");
            XLSX.writeFile(fullBook, "registrations.xlsx");
        }
    }

    return (
        <>
            <AdminNavbar/>
            {
                loading && <AdminLoader/>
            }
            <div className='downloadButtons'>
                <button className='downloadButton' onClick={handleDownload}>Download Excel</button>
            </div>
            <table className='report' cellSpacing={0} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr className='headerRow' {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className='headerData' {...column.getHeaderProps()}>{column.render("Header")}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className='dataRow' {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td className='data' {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className='paginationButtons'>
                <button className='paginationButton' onClick={() => previousPage()} disabled={!canPreviousPage}> Previous page{" "} </button>
                <button className='paginationButton' onClick={() => nextPage()} disabled={!canNextPage}> Next page{" "} </button>
            </div>
        </>
    )
}

export default Report