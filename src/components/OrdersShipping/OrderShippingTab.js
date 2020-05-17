import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import New from "./New";
import Completed from "./Completed";
import { LocalShipping } from "@styled-icons/material-outlined/LocalShipping";
import { DoneOutline } from "@styled-icons/material-outlined/DoneOutline";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box component="div">{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bar: {
    backgroundColor: "#ffffff",
  },
  tabname: {
    color: "#000000",
    fontFamily: "Poppins",
  },
}));

export default function OrderShippingTab() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /*   useEffect(() => {

    console.log("New value", value);
  }, [value]);
 */
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Orders and Shipping Tabs"
          initialSelectedIndex={0}
        >
          <Tab
            icon={<LocalShipping size="45" />}
            className={classes.tabname}
            label="New"
            {...a11yProps(0)}
          />
          <Tab
            icon={<DoneOutline size="45" />}
            className={classes.tabname}
            label="Completed"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} component={New}>
        <New />
      </TabPanel>
      <TabPanel value={value} index={1} component={Completed}>
        {value === 1 && <Completed />}
      </TabPanel>
    </div>
  );
}
