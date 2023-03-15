import { useEffect, useState, useCallback, memo } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";

const colors = {
  income: "#00b53c3f",
  expense: "#b50c003f",
};

const TableHeading = ({ orderBy, setOrderBy, order, setOrder }) => {
  const headCells = [
    { id: "isIncome", numeric: false, label: "Type" },
    { id: "amount", numeric: true, label: "Amount" },
  ];

  const createSortHandler = (headCellId) => {
    if (headCellId === orderBy) {
      setOrder(() => {
        if (order === "asc") return "desc";
        return "asc";
      });
      return;
    }
    setOrderBy(headCellId);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() => createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TransactionsTable = ({ transactions }) => {
  // debugger;
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const sortComparator = useCallback(
    (a, b) => {
      if (+a[orderBy] < +b[orderBy]) {
        return 1;
      }
      return -1;
    },
    [orderBy]
  );

  useEffect(() => {
    setSortedTransactions(transactions);
  }, []);

  useEffect(() => {
    if (orderBy === "") {
      setSortedTransactions(transactions);
      return;
    }

    setSortedTransactions(
      transactions.sort((a, b) =>
        order === "asc" ? sortComparator(a, b) : -sortComparator(a, b)
      )
    );
  }, [orderBy, order, transactions, sortComparator]);

  if (!transactions && !transactions.length) return <></>;

  console.log("Sorted transactions: ", sortedTransactions);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableHeading
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              order={order}
              setOrder={setOrder}
            />
            <TableBody>
              {sortedTransactions.map((transaction, index) => {
                return (
                  <TableRow
                    key={`${transaction.amount}-${transaction.type}-${index}`}
                    sx={{
                      backgroundColor: transaction.isIncome
                        ? colors.income
                        : colors.expense,
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "22px",
                      }}
                    >
                      {transaction.isIncome ? "+" : "-"}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      $ {(+transaction.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default memo(TransactionsTable);
