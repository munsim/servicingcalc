import React from "react";

import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NumberFormat from "react-number-format";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  hemfields,
  helpertext,
  hemfieldstest,
  outlinecss,
  button,
} from "./styles/styles.js";
export const url = "http://localhost:4000";

function App() {
  const [relation, setrelation] = useState("blank");
  const [dependents, setdependents] = useState("");
  const [postcode, setpostcode] = useState<any>("");
  const [netmi, setnetmi] = useState<any>("");
  const [netmispouse, setnetmispouse] = useState<any>("");
  const [otherincome, setotherincome] = useState<any>("");

  const [mortgageexp, setmortgageexp] = useState<any>("");
  const [rentexp, setrentexp] = useState<any>("");
  const [cclimit, setcclimit] = useState<any>("");
  const [loanreps, setloanreps] = useState<any>("");
  const [gleexp, setgleexp] = useState<any>("");

  const [hidespouse, sethidespouse] = useState<boolean>(true);

  const handlerelation = (e: any) => {
    setrelation(e.target.value);
  };

  const handledependents = (e: any) => {
    setdependents(e.target.value);
  };
  const handlepostcode = (e: any) => {
    setpostcode(e.target.value);
  };
  const handlenetmi = (e: any) => {
    setnetmi(e.target.value);
  };
  const handlenetmispouse = (e: any) => {
    setnetmispouse(e.target.value);
  };
  const handleotherincome = (e: any) => {
    setotherincome(e.target.value);
  };

  const handlemortgageexp = (e: any) => {
    setmortgageexp(e.target.value);
  };
  const handlerentexp = (e: any) => {
    setrentexp(e.target.value);
  };
  const handlecclimit = (e: any) => {
    setcclimit(e.target.value);
  };
  const handleloanreps = (e: any) => {
    setloanreps(e.target.value);
  };
  const handlegleexp = (e: any) => {
    setgleexp(e.target.value);
  };

  useEffect(() => {
    const fetchHesData = async () => {
      const response = await fetch(`${url}/`);
      const newData = await response.json();

      if (response.ok) {
        console.log(newData);
      }
    };
    fetchHesData();
    console.log("rerender");
  }, []);

  useEffect(() => {
    if (
      relation === "Single" ||
      relation === "Separated" ||
      relation === "Divorced" ||
      relation === "Widowed" ||
      relation === "blank"
    ) {
      sethidespouse(true);
    } else {
      sethidespouse(false);
    }
  }, [relation]);

  return (
    <div className="App">
      <div className="maindiv">
        <div className="line"></div>
        <div>
          <h3>HOW MUCH CAN I BORROW?</h3>
          <p>
            To find out, we need some information about you and your income and
            expenses
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              justifyContent: "space-around",

              alignContent: "center",
            }}
          >
            <FormControl sx={hemfields}>
              <OutlinedInput
                sx={outlinecss}
                id="outlined-adornment-amount"
                value={postcode}
                onChange={handlepostcode}
                inputProps={{ maxLength: 4 }}
              />
              <FormHelperText sx={helpertext}>Enter postcode</FormHelperText>
            </FormControl>

            <FormControl>
              <Select
                sx={hemfields}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={relation}
                onChange={handlerelation}
                displayEmpty
                inputProps={{ "aria-label": "BRAND" }}
              >
                <MenuItem value="blank">
                  <em>Marital status</em>
                </MenuItem>
                <MenuItem value={"Single"}>Single</MenuItem>
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"DeFacto"}>DeFacto</MenuItem>
                <MenuItem value={"Widowed"}>Widowed</MenuItem>
                <MenuItem value={"Divorced"}>Divorced</MenuItem>
                <MenuItem value={"Separated"}>Separated</MenuItem>
              </Select>
              <FormHelperText sx={helpertext}>
                Select Marital status
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Select
                sx={hemfields}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={dependents}
                onChange={handledependents}
                displayEmpty
                inputProps={{ "aria-label": "BRAND" }}
              >
                <MenuItem value="">
                  <em>Dependents</em>
                </MenuItem>
                <MenuItem value={"0"}>0</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4 or more</MenuItem>
              </Select>
              <FormHelperText sx={helpertext}>Select Dependents</FormHelperText>
            </FormControl>
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={netmi}
                onChange={handlenetmi}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Average take home pay
              </FormHelperText>
            </FormControl>
            {hidespouse ? (
              <></>
            ) : (
              <FormControl sx={hemfields}>
                <OutlinedInput
                  style={outlinecss}
                  value={netmispouse}
                  onChange={handlenetmispouse}
                  name="numberformat"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
                <FormHelperText sx={helpertext}>
                  SPOUSE/PARTNER AVERAGE TAKE HOME PAY
                </FormHelperText>
              </FormControl>
            )}
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={otherincome}
                onChange={handleotherincome}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Other regular income
              </FormHelperText>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              justifyContent: "space-around",
              alignContent: "center",
            }}
          >
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={mortgageexp}
                onChange={handlemortgageexp}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Total all monthly mortgage repayments
              </FormHelperText>
            </FormControl>
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={rentexp}
                onChange={handlerentexp}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Monthly rent or living at home expense (if applicable)
              </FormHelperText>
            </FormControl>
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={cclimit}
                onChange={handlecclimit}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Total all Credit Card/s Limit
              </FormHelperText>
            </FormControl>
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={loanreps}
                onChange={handleloanreps}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Total other monthly loan repayments
              </FormHelperText>
            </FormControl>
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                value={gleexp}
                onChange={handlegleexp}
                name="numberformat"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText sx={helpertext}>
                Monthly General Living Expenses
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="buttondiv">
          <Button
            sx={button}
            variant="contained"
            onClick={() => {
              alert("clicked");
            }}
          >
            CALCULATE
          </Button>
          <Button
            sx={button}
            variant="contained"
            onClick={() => {
              alert("clicked");
            }}
          >
            REFRESH
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
