import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { LockAlt } from "@styled-icons/boxicons-solid/LockAlt";
import { Visa } from "@styled-icons/remix-fill/Visa";
import { CcMastercard } from "@styled-icons/fa-brands/CcMastercard";
import { CcAmex } from "@styled-icons/fa-brands/CcAmex";
import { CcDiscover } from "@styled-icons/fa-brands/CcDiscover";
import {CcDinersClub} from "@styled-icons/fa-brands/CcDinersClub"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  bar: {
    backgroundColor: "#679436"
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Shop Policies Tabs"
          centered
          variant="fullWidth"
        >
          <Tab label="Shipping" {...a11yProps(0)} />
          <Tab label="Payment options" {...a11yProps(1)} />
          <Tab label="Returns & exchanges" {...a11yProps(2)} />
          <Tab label="Frequently asked questions" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h2>Shipping Costs</h2>
        <p>USPS Priority Mail is used for all shipments.</p>
        <h2>Processing time</h2>
        <p>
          The time I need to prepare an order for shipping varies. For details,
          see individual items. Generally, you can expect your items processed
          to ship within 3–5 days.
        </p>
        <h2>Estimated shipping times</h2>
        <p>North America: 3-5 business days</p>
        <p>
          I'll do my best to meet these shipping estimates, but cannot guarantee
          them. Actual delivery time will depend on the shipping method you
          choose.
        </p>
        <h2>Customs and import taxes</h2>
        <p>
          Buyers are responsible for any customs and import taxes that may
          apply. I'm not responsible for delays due to customs.
        </p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>
          <LockAlt size="25" style={{ color: "#679436" }} />
          &nbsp;<u>Secure options</u>
        </h3>
        <CCDiv>
          <Visa title="Visa" size="70" />
          <CcMastercard title="Master Card" size="70" />
          <CcAmex title="American Express" size="70" />
          <CcDiscover title="Discover" size="70" />
          <CcDinersClub title="Diners Club" size="70"/>
        </CCDiv>
        <p>
          Angry Pickles keeps your payment information secure.&nbsp;
          Angry Pickles never receives your credit card information. All credit card information is
          processed in accordance with&nbsp; 
          <a
            href="https://stripe.com/guides/pci-compliance"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Stripe's Payment Card Industry Data Security Standards"
          >
            Payment Card Industry Data Security Standards (PCI DSS)
          </a>&nbsp;through Stripe
        </p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>I don't accept returns, exchanges, or cancellations</h3>
        <p>But please contact me if you have any problems with your order.</p>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h3>Sizing details</h3>
        <p>All items are packed and sealed in 16 oz. mason jars. One jar of pickles will fit in a 6" x 6" X 6" box and weighs approximately 18 ounces.</p>
        <h3>Care instructions</h3>
        <p>
          Unopened pickles are good for up to one year. Once opened, refrigerate
          and eat within 2 weeks.
        </p>
        <h3>Wholesale availability</h3>
        <p>
          Please contact me at sales@angrypickles.com for wholesale
          opportunities.
        </p>
        <h3>Shipment to P.O. boxes or APO/FPO addresses</h3>
        <p>
          Angry Pickles ships to addresses within the U.S., U.S. Territories,
          and APO/FPO/DPO addresses.
        </p>
        <h3>Damages</h3>
        <p>
          We understand that damage can occur from time to time. We do our best
          to ensure the packages are protected. If for any reason you package is
          damaged during shipment, please take a photo of the damaged box before
          it is open and a picture of the damaged item after you have opened it
          as soon as possible and let us know and we will send you a new jar.
          Angry Pickles is not liable for any products lost during shipping. If
          you received your order damaged, please contact us.
        </p>
        <h3>Are your pickles gluten free?</h3>
        <p>
          A pickle is a cucumber that has been soaked in a briny solution to
          make it sour. Whether pickles are gluten free is sometimes questioned
          because they are made with vinegar and the safety of vinegar has been
          questioned in the past. The vinegar we use is distilled and is gluten
          free so the pickles are too.&nbsp;<br/>
          <a
            href="https://www.beyondceliac.org/gluten-free-diet/is-it-gluten-free/vinegar/"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to article about vinegar gluten free"
          >
            Link to article about Vinegar and it's gluten free qualities
          </a>
        </p>
        <h3>Do you offer local pickup?</h3>
        <p>
          Yes I do for any customers within <a href="https://www.onslowcountync.gov/" target="_blank"
            rel="noreferrer"
            aria-label="Link to Onslow County website">Onslow County</a>. Please contact me for
          local pickup. We will then arrange a meeting place so you can enjoy
          your pickles.
        </p>
        <h3>Anymore Questions?</h3>
        <p>Please email me at <a href="mailto:sales@angrypickles.com">sales@angrypickles.com</a></p>
      </TabPanel>
    </div>
  );
}
const CCDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  > * {
    margin: 0.5rem;
    &:hover {
      color: #679436;
      transform: scale(1.1);
    }
  }
`;
