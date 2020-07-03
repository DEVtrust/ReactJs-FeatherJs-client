import React from "react";
//import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
//import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";
////
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



/////
// const useStyles = makeStyles(styles);
//
// export default function CustomTable(props) {
//   const [open, setOpen] = React.useState(false);
//   const classes = useStyles();
//   const {
//     tableHead,
//     tableData,
//     tableHeaderColor,
//     hover,
//     colorsColls,
//     coloredColls,
//     customCellClasses,
//     customClassesForCells,
//     striped,
//     tableShopping,
//     customHeadCellClasses,
//     customHeadClassesForCells,
//   } = props;
//   return (
//     <div className={classes.tableResponsive}>
//       <Table className={classes.table}>
//         {tableHead !== undefined ? (
//           <TableHead className={classes[tableHeaderColor]}>
//             <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
//               <TableCell>
//                 <IconButton
//                   aria-label="expand row"
//                   size="small"
//                   onClick={() => setOpen(!open)}
//                 >
//                   {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//               {tableHead.map((prop, key) => {
//                 const tableCellClasses =
//                   classes.tableHeadCell +
//                   " " +
//                   classes.tableCell +
//                   " " +
//                   cx({
//                     [customHeadCellClasses[
//                       customHeadClassesForCells.indexOf(key)
//                     ]]: customHeadClassesForCells.indexOf(key) !== -1,
//                     [classes.tableShoppingHead]: tableShopping,
//                     [classes.tableHeadFontSize]: !tableShopping,
//                   });
//                 return (
//                   <TableCell className={tableCellClasses} key={key}>
//                     {prop}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           </TableHead>
//         ) : null}
//         <TableBody>
//           {tableData.map((prop, key) => {
//             var rowColor = "";
//             var rowColored = false;
//             if (prop.color !== undefined) {
//               rowColor = prop.color;
//               rowColored = true;
//               prop = prop.data;
//             }
//             const tableRowClasses = cx({
//               [classes.tableRowBody]: true,
//               [classes.tableRowHover]: hover,
//               [classes[rowColor + "Row"]]: rowColored,
//               [classes.tableStripedRow]: striped && key % 2 === 0,
//             });
//             if (prop.total) {
//               return (
//                 <TableRow key={key} hover={hover} className={tableRowClasses}>
//                   <TableCell
//                     className={classes.tableCell}
//                     colSpan={prop.colspan}
//                   />
//                   <TableCell
//                     className={classes.tableCell + " " + classes.tableCellTotal}
//                   >
//                     Total
//                   </TableCell>
//                   <TableCell
//                     className={
//                       classes.tableCell + " " + classes.tableCellAmount
//                     }
//                   >
//                     {prop.amount}
//                   </TableCell>
//                   {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
//                     <TableCell
//                       className={classes.tableCell}
//                       colSpan={tableHead.length - (prop.colspan - 0 + 2)}
//                     />
//                   ) : null}
//                 </TableRow>
//               );
//             }
//             if (prop.purchase) {
//               return (
//                 <TableRow key={key} hover={hover} className={tableRowClasses}>
//                   <TableCell
//                     className={classes.tableCell}
//                     colSpan={prop.colspan}
//                   />
//                   <TableCell
//                     className={classes.tableCell + " " + classes.right}
//                     colSpan={prop.col.colspan}
//                   >
//                     {prop.col.text}
//                   </TableCell>
//                 </TableRow>
//               );
//             }
//             return (
//               <React.Fragment>
//                 <TableRow
//                   key={key}
//                   hover={hover}
//                   className={classes.tableRow + " " + tableRowClasses}
//                 >
//                   {prop.map((prop, key) => {
//                     const tableCellClasses =
//                       classes.tableCell +
//                       " " +
//                       cx({
//                         [classes[colorsColls[coloredColls.indexOf(key)]]]:
//                           coloredColls.indexOf(key) !== -1,
//                         [customCellClasses[customClassesForCells.indexOf(key)]]:
//                           customClassesForCells.indexOf(key) !== -1,
//                       });
//                     return (
//                       <TableCell className={tableCellClasses} key={key}>
//                         {prop}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//                 <TableRow>
//                   <TableCell
//                     style={{ paddingBottom: 0, paddingTop: 0 }}
//                     colSpan={6}
//                   >
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                       <Box margin={1}>
//                         <Typography variant="h6" gutterBottom component="div">
//                           History
//                         </Typography>
//                         <Table size="small" aria-label="purchases">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>Date</TableCell>
//                               <TableCell>Customer</TableCell>
//                               <TableCell align="right">Amount</TableCell>
//                               <TableCell align="right">
//                                 Total price ($)
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {row.history.map(historyRow => (
//                               <TableRow key={historyRow.date}>
//                                 <TableCell component="th" scope="row">
//                                   {historyRow.date}
//                                 </TableCell>
//                                 <TableCell>{historyRow.customerId}</TableCell>
//                                 <TableCell align="right">
//                                   {historyRow.amount}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                   {Math.round(
//                                     historyRow.amount * row.price * 100
//                                   ) / 100}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
//
// CustomTable.defaultProps = {
//   tableHeaderColor: "gray",
//   hover: false,
//   colorsColls: [],
//   coloredColls: [],
//   striped: false,
//   customCellClasses: [],
//   customClassesForCells: [],
//   customHeadCellClasses: [],
//   customHeadClassesForCells: [],
// };
//
// CustomTable.propTypes = {
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray",
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
//   tableData: PropTypes.array,
//   hover: PropTypes.bool,
//   coloredColls: PropTypes.arrayOf(PropTypes.number),
//   // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
//   colorsColls: PropTypes.array,
//   customCellClasses: PropTypes.arrayOf(PropTypes.string),
//   customClassesForCells: PropTypes.arrayOf(PropTypes.number),
//   customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
//   customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
//   striped: PropTypes.bool,
//   // this will cause some changes in font
//   tableShopping: PropTypes.bool,
// };
