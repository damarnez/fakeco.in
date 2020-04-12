import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { FormLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { isValidAddress } from "ethereumjs-util";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "130px",
    paddingBottom: "130px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputs: {
    paddingBottom: "10px",
  },
  buttons: {
    marginRight: "15px",
    width: "100px",
  },
  form: {
    width: "100%",
  },
  card: {
    background: "#2C3039",
    borderRadius: 0,
    marginTop: "30px",
    position: "relative",
    visibility: "visible",
    display: "flex",
    zIndex: 101,
    padding: "30px",
  },
  selector: {
    color: "#4A61DD",
  },
}));

const getAllStored = () => {
  const { localStorage }: any = window;
  return Object.keys(window.localStorage)
    .filter((key) => key.indexOf("def") > -1)
    .reduce((prev: any, next: string) => {
      try {
        prev.push(JSON.parse(localStorage.getItem(next)));
        return prev;
      } catch (error) {
        localStorage.removeItem(next);
      }
    }, []);
};

const Definition = ({ handleNext }: any) => {
  const classes = useStyles();
  const [stored, setStored] = useState([]);
  const [value, setValue]: any = useState({
    id: null,
    name: "",
    address: "",
    abi: "",
    jsonAbi: null,
  });
  const [error, setError]: any = useState({
    address: null,
    abi: null,
  });

  useEffect(() => {
    setStored(getAllStored());
  }, []);

  const handleChangeSelector = (event: any) => {
    const selectedData = stored.find(
      (data: any) => data.id === event.target.value
    );
    if (selectedData) {
      setValue(selectedData);
    } else {
      setValue({
        id: null,
        name: "",
        address: "",
        abi: "",
        jsonAbi: null,
      });
    }
  };

  const isValid = () => {
    !value.jsonAbi && setError({ ...error, ...{ abi: "NOT VALID ABI" } });
    !isValidAddress(value.address) &&
      setError({ ...error, ...{ address: "NOT VALID ADDRESS" } });
    return value.jsonAbi && isValidAddress(value.address);
  };

  const handleSave = () => {
    if (isValid()) {
      if (value.id) {
        //Updated stored
        window.localStorage.setItem(value.id, JSON.stringify(value));
      } else {
        //Create new register
        const id = `def-${Date.now()}`;
        const storeValue = { ...value, ...{ id } };
        window.localStorage.setItem(id, JSON.stringify(storeValue));
      }
    }
  };

  const handleChange = (keyName: string) => (e: any) => {
    switch (keyName) {
      case "abi":
        const newValues = { [keyName]: e.target.value, jsonAbi: null };
        try {
          newValues.jsonAbi = JSON.parse(e.target.value);
          setError({ ...error, ...{ abi: null } });
        } catch (e) {
          setError({ ...error, ...{ abi: "NOT VALID ABI" } });
        }
        setValue({ ...value, ...newValues });
        break;
      case "address":
        const newAddress = e.target.value;
        if (!isValidAddress(newAddress)) {
          setError({ ...error, ...{ address: "NOT VALID ADDRESS" } });
        } else {
          setError({ ...error, ...{ address: null } });
        }
        setValue({ ...value, ...{ [keyName]: e.target.value } });
        break;
      case "name":
        setValue({ ...value, ...{ [keyName]: e.target.value } });
        break;
    }
  };
  const handleSuccess = () => {
    if (isValid()) handleNext(value);
  };
  return (
    <Paper elevation={3} className={classes.card}>
      <form noValidate autoComplete="off" className={classes.form}>
        <div>
          <label>Stored definitions</label>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              value={value.id}
              onChange={handleChangeSelector}
              inputProps={{
                name: "Stored Definitions",
                id: "stored-selector",
              }}
              className={classes.selector}
            >
              <option aria-label="None" value="" />
              {stored.map((data: any) => {
                return (
                  <option key={`${data.id}-op`} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <div>
            <label>Name</label>
            <TextField
              id="input-name"
              value={value.name}
              className={classes.inputs}
              placeholder="My awesome smart contract ...."
              onChange={handleChange("name")}
              variant="outlined"
              fullWidth
            />
          </div>
          <div>
            <label>* Address </label>
            <TextField
              id="input-address"
              placeholder="0x0000000000000000"
              className={classes.inputs}
              variant="outlined"
              onChange={handleChange("address")}
              fullWidth
              value={value.address}
            />
            {error.address && <FormLabel error>{error.address}</FormLabel>}
          </div>
          <div>
            <label>* ABI </label>
            <TextField
              id="input-abi"
              placeholder="[{..ABI..}]"
              className={classes.inputs}
              multiline
              rows="10"
              onChange={handleChange("abi")}
              variant="outlined"
              fullWidth
              value={value.abi}
            />
            {error.abi && <FormLabel error>{error.abi}</FormLabel>}
          </div>
        </div>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!(value.name.length > 0)}
          className={classes.buttons}
        >
          Save
        </Button>
        <Button
          onClick={handleSuccess}
          variant="contained"
          color="primary"
          className={classes.buttons}
        >
          Next
        </Button>
      </form>
    </Paper>
  );
};

export default Definition;
