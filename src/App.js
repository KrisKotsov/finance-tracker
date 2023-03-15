import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  styled,
} from "@mui/material";
import TransactionsTable from "./components/TransactionsTable/TransactionsTable";

const PageContainer = styled(Box)(() => ({
  textAlign: "center",
  padding: "50px",
}));

function App() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [isIncome, setIsIncome] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      const newTransaction = {
        amount: inputValue,
        isIncome,
      };
      setAllTransactions((prevTransactions) => [
        newTransaction,
        ...prevTransactions,
      ]);
      setInputValue("");
    }
  };

  useEffect(() => {
    console.log("All transactions: ", allTransactions);
    setTotalBalance(
      allTransactions.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.isIncome ? +currentValue.amount : -currentValue.amount),
        0
      )
    );
  }, [allTransactions]);

  return (
    <PageContainer>
      <Typography variant="h3">Finance Tracker</Typography>
      <Typography
        variant="h5"
        sx={{
          margin: "30px 0",
        }}
      >
        Balance: {totalBalance.toFixed(2)} BGN
      </Typography>
      <FormControlLabel
        control={
          <Switch checked={isIncome} onChange={() => setIsIncome(!isIncome)} />
        }
        label="Switch transaction type"
      />
      <FormControl fullWidth sx={{ margin: "20px 0" }}>
        <InputLabel htmlFor="outlined-adornment-amount">{`Add ${
          isIncome ? "income" : "expense"
        }`}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label={`Add ${isIncome ? "income" : "expense"}`}
          color={isIncome ? "success" : "error"}
          type="number"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: isIncome ? "green" : "red",
            },
          }}
        />
      </FormControl>
      <TransactionsTable transactions={allTransactions} />
    </PageContainer>
  );
}

export default App;
