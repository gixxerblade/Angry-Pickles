import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserContext } from "../components/UserContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const ReceiptTable = () => {
  const classes = useStyles();
  const { data, loading } = useContext(UserContext);
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map(item => (
                <TableRow key={item.parent}>
                  <TableCell component="th" scope="row">
                    {item.description}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    ${(item.amount / 100).toFixed(2)}&nbsp;
                  </TableCell>
                  {item.quantity ? (
                    <TableCell align="center">
                      ${((item.amount / 100) * item.quantity).toFixed(2)}&nbsp;
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      ${(item.amount / 100).toFixed(2)}&nbsp;
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h4 style={{ textAlign: "right" }}>
            Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
            {(data.amount / 100).toFixed(2)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </h4>
        </TableContainer>
      )}
    </>
  );
};
export default ReceiptTable;
