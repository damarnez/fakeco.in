import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getSchema, validateSchema } from "../../utils/form";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import beauty from "json-beautify";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import context from "../../context";

const Form = withTheme({ ...MuiTheme, ...Button });

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "130px",
    paddingBottom: "130px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    color: "#DDE2F4 !important",
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
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiInputInput: {
      variant: "outlined",
    },
  },
  box: {
    width: "100%",
    marginBottom: "50px",
  },
  responses: {
    width: "100%",
    overflowX: "hidden",
  },
  inputs: {
    paddingBottom: "10px",
  },
}));

const Generator = ({ jsonAbi, address }: any) => {
  const classes = useStyles();

  const {
    store: { web3, address: from },
    actions: { setOpen },
    followTx,
  }: any = useContext(context);
  const [value, setValue]: any = useState({});
  const [response, setResponse]: any = useState({});
  const [contract, setContract]: any = useState();

  useEffect(() => {
    web3 && jsonAbi && setContract(new web3.eth.Contract(jsonAbi, address));
  }, [web3, jsonAbi, address]);

  const handleOnchange = (data: any) => {
    setValue({ [data.schema.title]: data.formData });
  };

  const handleInteraction = (schema: any) => async () => {
    // Check if we have connection
    if (!web3) return setOpen(true);
    const instance = contract || new web3.eth.Contract(jsonAbi, address);
    console.log(" METHOD : ", schema.title, " MOTHODS : ", instance.methods);
    const interaction = instance.methods[schema.title];
    let resp;

    try {
      const arrayParams = schema.required.reduce((prev: any, next: any) => {
        return [...prev, value[schema.title][next].toString()];
      }, []);
      console.log("PARAMS : ", schema.stateMutability, arrayParams);
      if (schema.stateMutability === "view") {
        console.log("CALL");
        resp = await interaction.apply(interaction, arrayParams).call({ from });
      } else {
        resp = await followTx.watchTx(
          interaction.apply(interaction, arrayParams).send({ from })
        );
      }
    } catch (error) {
      console.error(error);
      resp = error.message;
    }
    console.log("RESP:", resp);
    // Concat responses
    // @ts-ignore
    const respBeauty = beauty(resp, null, 2, 80);
    setResponse({
      ...response,
      ...{
        [schema.title]: response[schema.name]
          ? [...response[schema.name], respBeauty]
          : [respBeauty],
      },
    });
    console.log("RESP: ", resp);
  };
  return (
    <Paper elevation={3} className={classes.card}>
      {jsonAbi && (
        <div className={classes.box}>
          INPUTS
          {jsonAbi
            .filter((abi: any) => abi.type === "function")
            .map((abi: any, i: number) => (
              <div className={classes.box} key={`form-${i}`}>
                <Form
                  key={`form-${i}`}
                  uiSchema={classes}
                  schema={getSchema(abi)}
                  showErrorList={false}
                  validate={(formData: any, errors: any) =>
                    validateSchema(formData, errors, abi)
                  }
                  formData={value[abi.name]}
                  onChange={handleOnchange}
                  onSubmit={console.log}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInteraction(getSchema(abi))}
                  >
                    Enviar
                  </Button>
                  <div className={classes.responses}>
                    {response[abi.name] &&
                      response[abi.name].map((resp: any) => {
                        return <p>{resp}</p>;
                      })}
                  </div>
                </Form>
              </div>
            ))}
        </div>
      )}
    </Paper>
  );
};

export default Generator;
