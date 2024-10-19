import * as React from 'react';
import "../styles/vehiculos.css"
import Paper  from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { TableVirtuoso } from 'react-virtuoso';

const heads = [
    {
    id: 'Placa Vehicular',
    key: "placa",
    minWidth: 149,},
    {
    id: 'Capacidad',
    key: "capacidad",
    minWidth: 112,},
    {
    id: 'Estado',
    key: "estado",
    minWidth: 195,},
    {
    id: 'Ubicación',
    key: "ubicacion",
    minWidth: 145,},
    {
    id: 'Actualización',
    key: "actualizacion",
    minWidth: 156,},
    {
    id: 'Opciones',
    key: "opciones",
    minWidth: 117,},
];

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
  
const rows = [];
for(let i =0;i<2000;i++){
    rows.push( createData(867686,13,["Activo"],"Lima","1m"));
}

function createData(placa,capacidad,estado,ubicacion,actualizacion){
    return {placa,capacidad,estado,ubicacion,actualizacion};
}

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
        {console.log(12)}
        {heads.map((head) =>(
            
            <StyledTableCell key={head.id} style={{ minWidth: head.minWidth }}>
                {head.id}
            </StyledTableCell >
        ))}
      </TableRow>
    );
}
  
function rowContent(_index, row) {
    return (
        < >                                  
            {heads.map((head) =>{                                
                const value = row[head.key];                                
                return (                                
                    <StyledTableCell key={head.id} style={{ minWidth: head.minWidth }} className={`head_${head.key}`}>                                
                        {                                
                            (head.key === "estado") ?                                   
                             (<div className="vehiculosBlock_tableStates">                                                                                           
                                {row.estado.map((item)=>{                                       
                                    return (                                         
                                         <div className={`vehiculosBlock_tableState vehiculosBlock_tableState--${item}`}>                               
                                            <p>{item}</p>                                   
                                         </div>                                
                                    )                                    
                                })}                                    
                             </div>)                                   
                            : ( head.key == "opciones" ) ?                                 
                            (<div className="vehiculosBlock_tableOptions">
                                <div className="vehiculosBlock_iconJoiner">
                                     <div className="vehiculosBlock_tableIcon">
                                        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.564 26.765H22.2C23.5427 26.7637 24.8301 26.2298 25.7797 25.2804C26.7292 24.331 27.2634 23.0437 27.265 21.701V11.445C27.265 11.0472 27.107 10.6656 26.8257 10.3843C26.5444 10.103 26.1628 9.945 25.765 9.945C25.3672 9.945 24.9856 10.103 24.7043 10.3843C24.423 10.6656 24.265 11.0472 24.265 11.445V21.7C24.2642 22.2473 24.0464 22.772 23.6592 23.1589C23.2721 23.5459 22.7473 23.7635 22.2 23.764H5.564C5.01701 23.7632 4.49264 23.5456 4.10576 23.1589C3.71889 22.7723 3.50106 22.248 3.5 21.701V5.065C3.5 3.927 4.426 3 5.564 3H15.82C16.2178 3 16.5994 2.84196 16.8807 2.56066C17.162 2.27936 17.32 1.89782 17.32 1.5C17.32 1.10218 17.162 0.720644 16.8807 0.43934C16.5994 0.158035 16.2178 0 15.82 0H5.564C4.22109 0.00158883 2.93366 0.535901 1.98426 1.48567C1.03486 2.43545 0.501059 3.72308 0.5 5.066V21.701C0.501588 23.0436 1.03562 24.3307 1.98497 25.28C2.93431 26.2294 4.22143 26.7634 5.564 26.765Z" fill="#4F7396"/>
                                        </svg>
                                    </div>
                                    <div className="vehiculosBlock_tableIcon">
                                        <svg   svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.15 0.939997C15.0109 0.800669 14.8456 0.690136 14.6637 0.614721C14.4819 0.539306 14.2869 0.500488 14.09 0.500488C13.8931 0.500488 13.6981 0.539306 13.5162 0.614721C13.3343 0.690136 13.1691 0.800669 13.03 0.939997L1.55999 12.4C1.29999 12.66 1.14999 13.01 1.12999 13.38L0.929988 16.99C0.909988 17.41 1.06999 17.83 1.36999 18.13C1.64999 18.41 2.02999 18.57 2.42999 18.57H2.50999L6.11999 18.37C6.47999 18.35 6.82999 18.19 7.08999 17.93L18.56 6.48C18.84 6.19 19 5.81 19 5.42C19 5.02 18.84 4.64 18.56 4.35L15.15 0.939997Z" fill="#4F7396"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="vehiculosBlock_tableIcon">
                                    <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.71875 24.6458C1.71875 26.3264 3.1032 27.6875 4.8125 27.6875H17.1875C18.8968 27.6875 20.2812 26.3264 20.2812 24.6458V6.39583H1.71875V24.6458ZM21.8281 1.83333H16.4141L14.8672 0.3125H7.13281L5.58594 1.83333H0.171875V4.875H21.8281V1.83333Z" fill="#4F7396"/>
                                    </svg>
                                </div>
                            </div>) 
                            :   (head.id) 
                        }
                    </StyledTableCell >
                )
             })}    
        </>
    );
}
  

export default function Vehiculos(){

    return (
        <>
            <div className="vehiculosBlock">
                <div className="vehiculosBlock_tittle">
                    <h2>Vehículos</h2>
                </div>
                <div className="vehiculosBlock_options">
                    <button className="vehiculosBlock_button">
                        <div className="vehiculosBlock_icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 8C15.5 8.34518 15.2202 8.625 14.875 8.625H8.625V14.875C8.625 15.2202 8.34518 15.5 8 15.5C7.65482 15.5 7.375 15.2202 7.375 14.875V8.625H1.125C0.779822 8.625 0.5 8.34518 0.5 8C0.5 7.65482 0.779822 7.375 1.125 7.375H7.375V1.125C7.375 0.779822 7.65482 0.5 8 0.5C8.34518 0.5 8.625 0.779822 8.625 1.125V7.375H14.875C15.2202 7.375 15.5 7.65482 15.5 8Z" fill="white"/>
                            </svg>
                        </div>    
                        Agregar Vehiculo
                    </button>
                </div>
                <Paper sx={{ height:"400px", width: '100%', overflow: 'hidden', padding: "12px 16px",
                    '& .head_capacidad': {
                        color: 'rgba(79, 115, 150, 1)',
                    },
                    '& .head_ubicacion': {
                        color: 'rgba(79, 115, 150, 1)',
                    },
                    '& .head_actualizacion': {
                        color: 'rgba(79, 115, 150, 1)',
                    },   
                 }} elevation={0}>
                    <TableVirtuoso
                        data={rows}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>
            </div>
        </>
    )
}