import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {LockAlt} from "@styled-icons/boxicons-solid/LockAlt";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Shipping" {...a11yProps(0)} />
        <Tab label="Payment Options" {...a11yProps(1)} />
        <Tab label="Returns & exchanges" {...a11yProps(2)} />
        <Tab label="Frequently Asked Questions" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <h3>Processing time</h3>
        <p>
          The time I need to prepare an order for shipping varies. For details,
          see individual items.
        </p>
        <h3>Estimated shipping times</h3>
        <h4>North America: 3-5 business days</h4>
        <p>
          I'll do my best to meet these shipping estimates, but cannot guarantee
          them. Actual delivery time will depend on the shipping method you
          choose. Customs and import taxes Buyers are responsible for any
          customs and import taxes that may apply. I'm not responsible for
          delays due to customs.
        </p>
      </TabPanel>
      <TabPanel value={value} index={1}>        
        <h3><LockAlt size="20" />&nbsp;Secure options</h3>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </div>
  );
}
