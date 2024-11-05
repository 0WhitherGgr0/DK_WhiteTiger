import * as React from 'react';
import editPart1SVG from "../assets/edit1.svg"
import editPart2SVG from "../assets/edit2.svg"
import removeSVG from "../assets/remove.svg"
import Paper  from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { TableVirtuoso } from 'react-virtuoso';

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
  
export default function TableCrud({heads, rows}){

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
            <>                                  
                {heads.map((head) =>{                                
                    const value = row[head.key];                                
                    return (                                
                        <StyledTableCell key={head.id} style={{ minWidth: head.minWidth }} className={`head_${head.special}`}>                                
                            {                                
                                (head.key === "estado") ?                                   
                                 (<div className="panelCRUD_tableStates">                                                                                           
                                    {row.estado.map((item)=>(                                         
                                        <div className={`panelCRUD_tableState panelCRUD_tableState--${item}`}>                               
                                            <p>{item}</p>                                   
                                        </div>                                                      
                                    ))}                                    
                                 </div>)                                   
                                : ( head.key == "opciones" ) ?                                 
                                (<div className="panelCRUD_tableOptions">
                                    <div className="panelCRUD_iconJoiner">
                                         <div className="panelCRUD_tableIcon">
                                            <img src={editPart1SVG} alt="" />
                                        </div>
                                        <div className="panelCRUD_tableIcon">
                                            <img src={editPart2SVG} alt="" />
                                        </div>
                                    </div>
                                    <div className="panelCRUD_tableIcon">
                                        <img src={removeSVG} alt="" />
                                    </div>
                                </div>) 
                                :  (value) 
                            }
                        </StyledTableCell >
                    )
                 })}    
            </>
        );
    }

    return (
        <Paper sx={{ height:"370px", width: '100%', overflow: 'hidden', padding: "12px 16px",            
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
                sx = {{
                    border: "1px solid var(--lightBlue2)",           
                }}
            />
        </Paper>
    )

}