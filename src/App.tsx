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
export const url = "https://bmwservicingcheck.herokuapp.com/";

function App() {
  const [relation, setrelation] = useState("blank");
  const [dependents, setdependents] = useState("");
  const [adjdependents, setadjdependents] = useState("");
  const [postcode, setpostcode] = useState<any>("");
  const [netmi, setnetmi] = useState<any>("");
  const [netmispouse, setnetmispouse] = useState<any>("");
  const [otherincome, setotherincome] = useState<any>("");
  const [region, setregion] = useState<string>("");
  const [mortgageexp, setmortgageexp] = useState<any>("");
  const [rentexp, setrentexp] = useState<any>("");
  const [cclimit, setcclimit] = useState<any>("");
  const [loanreps, setloanreps] = useState<any>("");
  const [gleexp, setgleexp] = useState<any>("");
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

  const handlerelation = (e: any) => {
    setrelation(e.target.value);
  };
  const [butcolor1, setbutcolor1] = useState<string>("rgb(25,118,210,0.8)");

  const [butcolor2, setbutcolor2] = useState<string>("rgb(128,128,128,0.6)");

  const [butcolor3, setbutcolor3] = useState<string>("rgb(128,128,128,0.6)");

  const [frequency, setfrequency] = useState<string>("Per Month");
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

  const calculate = () => {
    if (
      postcode.length === 0 ||
      netmi.length === 0 ||
      otherincome.length === 0 ||
      mortgageexp.length === 0 ||
      rentexp.length === 0 ||
      cclimit.length === 0 ||
      loanreps.length === 0 ||
      gleexp.length === 0 ||
      dependents.length === 0 ||
      relation === "blank"
    ) {
      alert("Please, ensure all boxes are completed");
    }
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

    let array = new Array(Number(60)).fill({
      value:
        (Number(netmi) +
          Number(netmispouse) * 0.8 +
          Number(otherincome) * 0.8 -
          Number(mortgageexp) -
          Number(rentexp) -
          Number(cclimit) * 0.038 -
          Number(loanreps) -
          (Number(gleexp) > Number(hes) ? Number(gleexp) : Number(hes))) *
        0.95,
    });
    settotalamount(
      array
        .map((payment, index) => ({
          value:
            ((Number(netmi) +
              Number(netmispouse) * 0.8 +
              Number(otherincome) * 0.8 -
              Number(mortgageexp) -
              Number(rentexp) -
              Number(cclimit) * 0.038 -
              Number(loanreps) -
              (Number(gleexp) > Number(hes) ? Number(gleexp) : Number(hes))) *
              0.95) /
            (1 + 9.95 / 1200) ** (index + 1),
        }))
        .reduce((accum, item) => accum + Number(item.value), 0)
    );
  };

  const refresh = () => {
    setpostcode("");
    setrelation("");
    setdependents("");
    setadjdependents("");
    setnetmispouse("");
    setnetmi("");
    setotherincome("");
    setregion("");
    setmortgageexp("");
    setrentexp("");
    setcclimit("");
    setloanreps("");
    setgleexp("");
    sethidespouse(false);
    setcombo("");
    setpcerror("");
    setbirelation("");
    setloansize(0);
    setbutcolor2("rgb(128,128,128,0.6)");
    setbutcolor1("rgb(25,118,210,0.8)");
    setbutcolor3("rgb(128,128,128,0.6)");
    setfrequency("Per Month");
    settotalamount(0);
  };

  /*   useEffect(() => {

  }, [loansize]); */

  const but1 = () => {
    if (butcolor1 === "rgb(25,118,210,0.8)") {
      setbutcolor2("rgb(128,128,128,0.6)");
      setbutcolor3("rgb(128,128,128,0.6)");
    } else if (butcolor1 === "rgb(128,128,128,0.6)") {
      setbutcolor2("rgb(128,128,128,0.6)");
      setbutcolor1("rgb(25,118,210,0.8)");
      setbutcolor3("rgb(128,128,128,0.6)");
    }
    setfrequency("Per Month");
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
  };

  const but2 = () => {
    if (butcolor2 === "rgb(25,118,210,0.8)") {
      setbutcolor1("rgb(128,128,128,0.6)");
      setbutcolor3("rgb(128,128,128,0.6)");
    } else if (butcolor2 === "rgb(128,128,128,0.6)") {
      setbutcolor1("rgb(128,128,128,0.6)");
      setbutcolor2("rgb(25,118,210,0.8)");
      setbutcolor3("rgb(128,128,128,0.6)");
    }
    setfrequency("Per Fortnight");
    setloansize(
      (((Number(netmi) +
        Number(netmispouse) * 0.8 +
        Number(otherincome) * 0.8 -
        Number(mortgageexp) -
        Number(rentexp) -
        Number(cclimit) * 0.038 -
        Number(loanreps) -
        (Number(gleexp) > Number(hes) ? Number(gleexp) : Number(hes))) *
        0.95) /
        4.333333) *
        2
    );
  };

  const but3 = () => {
    if (butcolor3 === "rgb(25,118,210,0.8)") {
      setbutcolor2("rgb(128,128,128,0.6)");
      setbutcolor3("rgb(128,128,128,0.6)");
    } else if (butcolor3 === "rgb(128,128,128,0.6)") {
      setbutcolor1("rgb(128,128,128,0.6)");
      setbutcolor3("rgb(25,118,210,0.8)");
      setbutcolor2("rgb(128,128,128,0.6)");
    }
    setfrequency("Per Week");
    setloansize(
      ((Number(netmi) +
        Number(netmispouse) * 0.8 +
        Number(otherincome) * 0.8 -
        Number(mortgageexp) -
        Number(rentexp) -
        Number(cclimit) * 0.038 -
        Number(loanreps) -
        (Number(gleexp) > Number(hes) ? Number(gleexp) : Number(hes))) *
        0.95) /
        4.3333333333
    );
  };
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
              width: "30vw",
              justifyContent: "space-around",

              alignContent: "center",
            }}
          >
            <FormControl sx={hemfields}>
              <OutlinedInput
                sx={outlinecss}
                type="number"
                id="outlined-adornment-amount"
                value={postcode}
                onChange={handlepostcode}
                inputProps={{ maxLength: 4 }}
              />
              <FormHelperText sx={helpertext}>
                Enter postcode <span style={{ color: "red" }}>{pcerror}</span>{" "}
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
                  SPOUSE/PARTNER AVERAGE TAKE HOME PAY
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
            <p style={{ fontSize: "2.2em" }}>
              ${Number(loansize.toFixed(0)) < 0 ? 0 : loansize.toFixed(0)}{" "}
              {frequency}
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
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
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                This estimate based on a 60 month loan term with an interest
                rate of{" "}
              </p>
              <p style={{ fontSize: "3em" }}>9.95% </p>
              <p style={{ fontSize: "2em" }}> p.a.</p>
            </div>
            <p>Disclaimer: Affordability Calculator</p>
            <h3>
              Your total amount $
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
