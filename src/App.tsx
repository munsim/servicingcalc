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
export const url = "https://bmwservicingcheck.herokuapp.com";

function App() {
  const [relation, setrelation] = useState("blank");
  const [dependents, setdependents] = useState("");
  const [adjdependents, setadjdependents] = useState("");
  const [postcode, setpostcode] = useState<any>("");
  const [netmi, setnetmi] = useState<number>(0);
  const [netmispouse, setnetmispouse] = useState<number>(0);
  const [otherincome, setotherincome] = useState<number>(0);
  const [region, setregion] = useState<string>("");
  const [mortgageexp, setmortgageexp] = useState<number>(0);
  const [rentexp, setrentexp] = useState<number>(0);
  const [cclimit, setcclimit] = useState<number>(0);
  const [loanreps, setloanreps] = useState<number>(0);
  const [gleexp, setgleexp] = useState<number>(0);
  const [pcexist, setpcexist] = useState<boolean>(false);
  const [hidespouse, sethidespouse] = useState<boolean>(true);
  const [combo, setcombo] = useState<string>("");
  const [hesdata, sethesdata] = useState<any[]>([]);
  const [regsdata, setregsdata] = useState<any[]>([]);
  const [pcerror, setpcerror] = useState<string>("");
  const [hes, sethes] = useState<string>("");
  const [birelation, setbirelation] = useState<string>("");
  const [loansize, setloansize] = useState<number>(0);
  const [npvsarray, setnpvsarray] = useState<{ value: number }[]>([]);
  const [maxrep, setmaxrep] = useState<number>(0);
  const [maxrepfn, setmaxrepfn] = useState<number>(0);
  const [maxrepw, setmaxrepw] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const handlerelation = (e: any) => {
    setrelation(e.target.value);
  };
  const [butcolor1, setbutcolor1] = useState<string>("rgb(25,118,210,0.8)");

  const [butcolor2, setbutcolor2] = useState<string>("rgb(128,128,128,0.6)");

  const [butcolor3, setbutcolor3] = useState<string>("rgb(128,128,128,0.6)");

  const [totalamount, settotalamount] = useState<number>(0);
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
    if (birelation === "Single" && dependents === "0") {
      setadjdependents("0");
    } else if (birelation === "Single" && dependents === "1") {
      setadjdependents("1");
    } else if (birelation === "Single" && dependents === "2") {
      setadjdependents("1");
    } else if (birelation === "Single" && dependents === "3") {
      setadjdependents("1");
    } else if (birelation === "Single" && dependents === "4") {
      setadjdependents("1");
    } else if (birelation === "Couple" && dependents === "0") {
      setadjdependents("0");
    } else if (birelation === "Couple" && dependents === "1") {
      setadjdependents("1");
    } else if (birelation === "Couple" && dependents === "2") {
      setadjdependents("2");
    } else if (birelation === "Couple" && dependents === "3") {
      setadjdependents("3");
    } else if (birelation === "Couple" && dependents === "4") {
      setadjdependents("3");
    }
  }, [dependents, birelation]);

  useEffect(() => {
    const fetchHesData = async () => {
      const response = await fetch(`${url}/data`);
      const hesdata = await response.json();

      if (response.ok) {
        sethesdata(hesdata);
        setloading(false);
      }
    };
    fetchHesData();
  }, []);

  useEffect(() => {
    const fetchHesData2 = async () => {
      const response = await fetch(`${url}/regs`);
      const regsdata = await response.json();

      if (response.ok) {
        setregsdata(regsdata);
      }
    };
    fetchHesData2();

    console.log("rerender");
  }, []);

  useEffect(() => {
    if (
      relation === "Single" ||
      relation === "Separated" ||
      relation === "Divorced" ||
      relation === "Widowed"
    ) {
      sethidespouse(true);
      setbirelation("Single");
    } else if (relation === "blank") {
      sethidespouse(true);
    } else {
      sethidespouse(false);
      setbirelation("Couple");
    }
  }, [relation]);

  useEffect(() => {
    if (postcode.length < 4) {
      setpcerror("");
    }
  }, [postcode]);

  useEffect(() => {
    if (regsdata) {
      let check = regsdata.some(
        (item: any) => Number(item.postcode) === Number(postcode)
      );
      setpcexist(check);

      if (pcexist === true && postcode.length === 4) {
        const pcmatch = regsdata.find(
          (item: any) => item.postcode === postcode
        );
        setregion(pcmatch.region);

        setpcerror("");
      } else if (pcexist === false && postcode.length === 4) {
        setpcerror(" - invalid postcode");
      }
    }
  }, [postcode, pcexist]);

  useEffect(() => {
    if (
      birelation &&
      dependents &&
      region &&
      hesdata &&
      regsdata &&
      adjdependents
    ) {
      setcombo(`${region}${birelation}${adjdependents}`);
    }
  }, [relation, dependents, region, birelation, adjdependents]);

  try {
    useEffect(() => {
      if (combo && hesdata && adjdependents && birelation) {
        const hesmatch = hesdata.find((item: any) => item.combo === combo);
        sethes(hesmatch?.hes);
      }
    }, [combo]);
  } catch (error) {
    alert("Plese, refresh ");
  }

  useEffect(() => {
    setloansize(
      (Number(netmi) +
        Number(netmispouse) * 0.8 +
        Number(otherincome) * 0.8 -
        Number(mortgageexp) -
        Number(rentexp) -
        Number(cclimit) * 0.038 -
        Number(loanreps) -
        (Number(gleexp) > Number(hes) ? Number(gleexp) : Number(hes))) *
        0.95
    );
  }, [
    netmi,
    netmispouse,
    otherincome,
    mortgageexp,
    rentexp,
    cclimit,
    loanreps,
    gleexp,
    hes,
  ]);

  const calculate = () => {
    if (
      Number(loansize) >
      (Number(netmi) + Number(netmispouse) * 0.8 + Number(otherincome) * 0.8) *
        0.25
    ) {
      setmaxrep(
        (Number(netmi) +
          Number(netmispouse) * 0.8 +
          Number(otherincome) * 0.8) *
          0.25
      );
    } else {
      setmaxrep(Number(loansize));
    }
  };

  useEffect(() => {
    let array = new Array(Number(60)).fill({
      value: Number(maxrep),
    });

    console.log(array);
    settotalamount(
      new Array(Number(60))
        .fill({
          value: Number(maxrep),
        })
        .map((payment, index) => ({
          value: maxrep / (1 + 9.95 / 1200) ** (index + 1),
        }))
        .reduce((accum, item) => accum + Number(item.value), 0)
    );
    console.log(totalamount);
  }, [maxrep]);

  const refresh = () => {
    setpostcode("");
    setrelation("");
    setdependents("");
    setadjdependents("");
    setnetmispouse(0);
    setnetmi(0);
    setotherincome(0);
    setregion("");
    setmortgageexp(0);
    setrentexp(0);
    setcclimit(0);
    setloanreps(0);
    setgleexp(0);
    sethidespouse(false);
    setcombo("");
    setpcerror("");
    setbirelation("");
    setloansize(0);
    setmaxrep(0);
    setmaxrepfn(0);
    setmaxrepw(0);

    settotalamount(0);
  };

  return (
    <div className="App">
      <div className="maindiv">
        <div className="line"></div>
        <div>
          <h1>HOW MUCH CAN I BORROW?</h1>
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
              width: "30vw",
              justifyContent: "space-around",

              alignContent: "center",
            }}
          >
            {" "}
            <FormControl sx={hemfields}>
              <OutlinedInput
                sx={outlinecss}
                id="outlined-adornment-amount"
                value={postcode}
                onChange={handlepostcode}
                inputProps={{ maxLength: 4 }}
              />
              <FormHelperText sx={helpertext}>
                Enter postcode{" "}
                <span style={{ color: "red" }}>
                  {" "}
                  {loading ? `Loading postcodes..` : ""}
                </span>{" "}
                <span style={{ color: "red" }}>{pcerror}</span>{" "}
              </FormHelperText>
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
                type="number"
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
                  type="number"
                  onChange={handlenetmispouse}
                  name="numberformat"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
                <FormHelperText sx={helpertext}>
                  Spouse Take Home Pay
                </FormHelperText>
              </FormControl>
            )}
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                type="number"
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
              width: "30vw",
              justifyContent: "space-around",
              alignContent: "center",
            }}
          >
            <FormControl sx={hemfields}>
              <OutlinedInput
                style={outlinecss}
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
          <div style={{ width: "30vw" }}>
            <h3>YOU WILL BE ABLE TO BORROW:</h3>
            <p style={{ fontSize: "2em" }}>
              ${Number(maxrep.toFixed(0)) < 0 ? 0 : maxrep.toFixed(0)} Per Month
            </p>
            <p style={{ fontSize: "2em" }}>
              $
              {Number(((maxrep / 4.3333333333333) * 2).toFixed(0)) < 0
                ? 0
                : Number((maxrep / 4.3333333333333) * 2).toFixed(0)}{" "}
              Per Fortnight
            </p>
            <p style={{ fontSize: "2em" }}>
              $
              {Number((maxrep / 4.3333333333333333).toFixed(0)) < 0
                ? 0
                : (maxrep / 4.3333333333333333).toFixed(0)}{" "}
              Per Week
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ textAlign: "right", marginRight: "35px" }}>
                This estimate based on a 60 month loan term with an interest
                rate of:{" "}
              </p>
              <p style={{ fontSize: "2.5em" }}>9.95% </p>
              <p style={{ fontSize: "1.8em", marginLeft: "5px" }}> p.a.</p>
            </div>
            <p>Disclaimer: Affordability Calculator</p>
            <h3>
              Your total loan amount is $
              {Number(totalamount.toFixed(0)) < 0 ? 0 : totalamount.toFixed(0)}
            </h3>
          </div>
        </div>
        <div className="buttondiv">
          <Button
            sx={button}
            variant="contained"
            onClick={() => {
              calculate();
            }}
          >
            CALCULATE
          </Button>

          <Button
            sx={button}
            variant="contained"
            onClick={() => {
              refresh();
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

/*    <Button
                onClick={() => {
                  but1();
                }}
                sx={{
                  color: "white",
                  backgroundColor: butcolor1,
                  border: "1px solid gray",
                }}
              >
                Monthly
              </Button>
              <Button
                onClick={() => {
                  but2();
                }}
                sx={{
                  color: "white",
                  backgroundColor: butcolor2,
                  border: "1px solid gray",
                }}
              >
                Fortnightly
              </Button>
              <Button
                onClick={() => {
                  but3();
                }}
                sx={{
                  color: "white",
                  backgroundColor: butcolor3,
                  border: "1px solid gray",
                }}
              >
                Weekly
              </Button> */
