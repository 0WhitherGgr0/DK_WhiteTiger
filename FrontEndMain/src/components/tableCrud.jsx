import * as React from 'react';
import editPart1SVG from "../assets/edit1.svg";
import editPart2SVG from "../assets/edit2.svg";
import removeSVG from "../assets/remove.svg";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { TableVirtuoso } from 'react-virtuoso';
import "../styles/panelCRUD.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgba(227, 241, 255, 1)',
      fontWeight: 500,
      fontSize: 14,
      height: 46,
      fontFamily: 'Poppins',
    },
    [`&.${tableCellClasses.body}`]: {
      fontWeight: 400,
      fontSize: 14,
      height: 72,
      fontFamily: 'Work Sans',
    },
}));

export default function TableCrud({ heads, rows, onEdit, onDelete }) {

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
          <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
        TableRow,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };
    
    function fixedHeaderContent() {
        return (
          <TableRow>
            {heads.map((head) => (
                <StyledTableCell key={head.id} style={{ minWidth: head.minWidth }}>
                    {head.id}
                </StyledTableCell>
            ))}
          </TableRow>
        );
    }
      
    function rowContent(_index, row) {
        return (
            <>
                {heads.map((head) => {
                    const value = row[head.key];
                    return (
                        <StyledTableCell key={head.id} style={{ minWidth: head.minWidth }} className={`head_${head.special}`}>
                            {
                            head.key === "estado" ? (
                                <div className="panelCRUD_tableStates">
                                    {Array.isArray(row.estado) ? (
                                        row.estado.map((item) => (
                                            <div
                                                className={`panelCRUD_tableState panelCRUD_tableState--${item}`}
                                                key={item}
                                            >
                                                <p>{item}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={`panelCRUD_tableState panelCRUD_tableState--${row.estado}`}>
                                            <p>{row.estado}</p>
                                        </div>
                                    )}
                                </div>
                            ) : head.key === "opciones" ? (
                                <div className="panelCRUD_tableOptions">
                                    <button
                                        className="panelCRUD_tableIcon transparent-button"
                                        onClick={() => onEdit(row.idConductor || row.placa)}
                                        title="Editar"
                                    >
                                        <div className="panelCRUD_iconJoiner">
                                            <div className="panelCRUD_tableIcon">
                                                <img src={editPart1SVG} alt="Editar parte 1" />
                                            </div>
                                            <div className="panelCRUD_tableIcon">
                                                <img src={editPart2SVG} alt="Editar parte 2" />
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        className="panelCRUD_tableIcon transparent-button"
                                        onClick={() => onDelete(row.idConductor || row.placa)}
                                        title="Eliminar"
                                    >
                                        <img src={removeSVG} alt="Eliminar" />
                                    </button>
                                </div>
                            ) : (
                                value
                            )
                        }
                        </StyledTableCell>
                    );
                })}
            </>
        );
    }

    return (
        <Paper sx={{ height: "370px", width: '100%', overflow: 'hidden', padding: "12px 16px",
            '& .head_special': {
                color: 'rgba(79, 115, 150, 1)',
            }
        }} elevation={0}>
            <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
                elevation={0}
                sx={{
                    border: "1px solid var(--lightBlue2)",
                }}
            />
        </Paper>
    );
}
