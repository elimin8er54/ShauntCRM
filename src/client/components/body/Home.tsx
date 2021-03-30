import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const createData = (
  name: string,
  email: string,
  phone: string,
  stage: string
) => {
  return { name, email, phone, stage };
};

//temporary until we fetch values from mongodb

const rows = [
  createData("John", "asd.asd.com", "(617) 231-2312", "Pending"),
  createData("John", "asd.asd.com", "(617) 231-2312", "Pending"),
  createData("John", "asd.asd.com", "(617) 231-2312", "Pending"),
  createData("John", "asd.asd.com", "(617) 231-2312", "Pending"),
];

const Home = () => {
  /**
   * This is the home page. @see index.tsx
   * This is a componenet that swaps out in the parent Body componenet
   */

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Stage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.stage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
