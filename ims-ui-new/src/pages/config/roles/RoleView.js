import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import Box from '@material-ui/core/Box/index';
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import RolePermissions from "./RolePermissions";
import RoleUser from "./RoleUser";

const roleById = Constants.ROLE_BY_ID;
const pagesUrl = Constants.PAGES_LIST;
const customersUrl = "/api/customernames";


const tabs = ['ROLE', 'PERMISSIONS', 'USERS'];

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function RoleView(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [role, setRole] = React.useState({pages:[]});
    const [values, setValues] = React.useState([]);
    const [pages, setPages] = React.useState({});
    const [options, setOptions] = React.useState({});

    const [customers, setCustomers] = React.useState([]);
    const [customerOptions, setCustomerOptions] = React.useState({});

    const {id} = props.match.params;

    const [value, setValue] = React.useState(0);

    useEffect(() => {
        get(`${roleById  }/${  id}`, (data) => {
            setRole(data);
            const values = data.pages.map(({id}) => id)
            setValues(values)
        }, function (response) {

        })
    }, []);

    useEffect(() => {
        get(pagesUrl, (data) => {
            const values = data.map(t=>({value: t.id, label: t.label,}))
            setOptions(values);
            setPages(data);
        }, function (response) {

        })
    }, []);

    useEffect(() => {
        get(customersUrl, (data) => {
            const values = data.map(t=>({value: t.customerId, label: `${t.firstName  } ${ t.lastName}`}))
            setCustomerOptions(values);
        }, function (response) {

        })
    }, []);

    function handleChange(event, newValue) {

    }

    function handlePermissionChange(event, newValue) {

    }

    function handleChangeIndex(event, newValue) {
        setValue(newValue);
    }

    function getRoleView() {
        return <div>
            <Typography>Role: {role.role}</Typography>
            <Typography>Role Description: {role.roleDesc}</Typography>
        </div>
    }


    function getStepContent(step) {
        switch (step) {
            case 0:
                return getRoleView();
            case 1:
                return <RolePermissions options={options} id={id} values={values} setValues={setValues}/>;
            case 2:
                return <RoleUser  options={customerOptions} id={id} values={customers} setValues={setCustomers}/>;
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChangeIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabs.map((e, i) => {
                        return <Tab key={i} label={e} {...a11yProps(i)} />
                    })}
                </Tabs>
            </AppBar>

            {tabs.map((e, i) => {
                return <TabPanel key={i} value={value} index={i}>
                    {getStepContent(i)}
                </TabPanel>
            })}
        </div>
    );
}