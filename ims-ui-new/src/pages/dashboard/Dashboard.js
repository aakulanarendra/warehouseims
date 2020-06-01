import React, {useEffect, useState} from "react";
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis,
} from "recharts";

// styles
import MaterialTable, {MTableToolbar} from "material-table";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle";
import {Typography} from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import DashboardWidget from "../../components/Widget/DashBoardWidget";
import ContentWidget from "../../components/Widget/ContentWidget";
import {get} from "../../utils/client";
import * as Constants from "../../utils/constants";

const primary = "#1890ff";
const secondary = "#FF5C93";
const warning = "#FFC260";
const success = "#3dbb3d";
const info = "#9013FE";


const mainChartData = getMainChartData();
const PieChartData = [
    {name: "Card", value: 400, color: "primary"},
    {name: "Cash", value: 300, color: "secondary"},
    {name: "Others", value: 300, color: "warning"},
];

const dataUrl = Constants.DASHBOARD_URL;

export default function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();

    const columns = [{title: 'Name', field: '_id'}, {title: 'Amount', field: 'price',render: rowData=><span>{rowData.price}$</span>}, {title: 'Quantity', field: 'count'}]

    const [state, setState] = React.useState({
        topProducts: []

    })

    useEffect(() => {
        get(dataUrl, (data) => {
            setState(data)
        }, function (response) {

        })

    }, []);

    // local
    const [mainChartState, setMainChartState] = useState("monthly");

    return (
        <>
            {/* <PageTitle title="Dashboard" button="Latest Reports" /> */}
            <Grid container spacing={4}>
                <Grid item md={3} sm={6} xs={12}>
                    <ContentWidget
                        title="Customers"
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        bbgColor={success}
                        icon="people"
                        content={state.users}
                     />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <ContentWidget
                        title="Orders"
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        bbgColor={secondary}
                        icon="shopping_cart"
                        content={state.orders}
                     />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <ContentWidget
                        title="Total Sales"
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        bbgColor={primary}
                        icon=""
                        content={`$ ${state.totalAmount||0}`}
                     />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <ContentWidget
                        title="Products"
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        bbgColor={warning}
                        icon="bookmarks"
                        content={state.products}
                     />
                </Grid>


                <Grid item lg={4} md={4} sm={4} xs={12}>
                    <Widget
                        title="Top Items by Sales"
                        upperTitle
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        disableWidgetMenu
                    >
                        <div>
                            <MaterialTable
                                options={{toolbar:false,paging:false,header:false,search:false,padding:"dense"}}
                                data={state.topProducts}
                                columns={columns} />

                        </div>
                    </Widget>
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={12}>
                    <Widget title="Top Categories" upperTitle className={classes.card}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <ResponsiveContainer width="100%" height={144}>
                                    <PieChart margin={{left: theme.spacing(1)}}>
                                        <Pie
                                            data={PieChartData}
                                            innerRadius={45}
                                            outerRadius={60}
                                            dataKey="value"
                                        >
                                            {PieChartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={theme.palette[entry.color].main}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.pieChartLegendWrapper}>
                                    {PieChartData.map(({name, value, color}, index) => (
                                        <div key={color} className={classes.legendItemContainer}>
                                            <Dot color={color}/>
                                            <Typography style={{whiteSpace: "nowrap"}}>
                                                &nbsp;{name}&nbsp;
                                            </Typography>
                                            <Typography color="text" colorBrightness="secondary">
                                                &nbsp;{value} $
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>


                <Grid item md={4} sm={6} xs={12}>
                    <DashboardWidget
                        title="Deposits"
                        upperTitle
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                        disableWidgetMenu
                        tbgColor="#3dbb3d"
                        bbgColor=""
                    >
                        <div className={classes.visitsNumberContainer}>
                            <Typography size="xl" weight="medium">
                                12, 678
                            </Typography>
                            <LineChart
                                width={55}
                                height={30}
                                data={[
                                    {value: 10},
                                    {value: 15},
                                    {value: 10},
                                    {value: 17},
                                    {value: 18},
                                ]}
                                margin={{left: theme.spacing(2)}}
                            >
                                <Line
                                    type="natural"
                                    dataKey="value"
                                    stroke={theme.palette.success.main}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </div>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography color="text" colorBrightness="secondary">
                                    Registrations
                                </Typography>
                                <Typography size="md">860</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="text" colorBrightness="secondary">
                                    Sign Out
                                </Typography>
                                <Typography size="md">32</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="text" colorBrightness="secondary">
                                    Rate
                                </Typography>
                                <Typography size="md">3.25%</Typography>
                            </Grid>
                        </Grid>
                    </DashboardWidget>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <DashboardWidget
                        title="Gross Sales"
                        upperTitle
                        className={classes.card}
                        bodyClass={classes.fullHeightBody}
                        tbgColor="#439aea"
                    >
                        <div className={classes.serverOverviewElement}>
                            <Typography
                                color="text"
                                colorBrightness="secondary"
                                className={classes.serverOverviewElementText}
                            >
                                60% / 37°С / 3.3 Ghz
                            </Typography>
                            <div className={classes.serverOverviewElementChartWrapper}>
                                <ResponsiveContainer height={50} width="99%">
                                    <AreaChart data={getRandomData(10)}>
                                        <Area
                                            type="natural"
                                            dataKey="value"
                                            stroke={theme.palette.secondary.main}
                                            fill={theme.palette.secondary.light}
                                            strokeWidth={2}
                                            fillOpacity="0.25"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={classes.serverOverviewElement}>
                            <Typography
                                color="text"
                                colorBrightness="secondary"
                                className={classes.serverOverviewElementText}
                            >
                                54% / 31°С / 3.3 Ghz
                            </Typography>
                            <div className={classes.serverOverviewElementChartWrapper}>
                                <ResponsiveContainer height={50} width="99%">
                                    <AreaChart data={getRandomData(10)}>
                                        <Area
                                            type="natural"
                                            dataKey="value"
                                            stroke={theme.palette.primary.main}
                                            fill={theme.palette.primary.light}
                                            strokeWidth={2}
                                            fillOpacity="0.25"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={classes.serverOverviewElement}>
                            <Typography
                                color="text"
                                colorBrightness="secondary"
                                className={classes.serverOverviewElementText}
                            >
                                57% / 21°С / 3.3 Ghz
                            </Typography>
                            <div className={classes.serverOverviewElementChartWrapper}>
                                <ResponsiveContainer height={50} width="99%">
                                    <AreaChart data={getRandomData(10)}>
                                        <Area
                                            type="natural"
                                            dataKey="value"
                                            stroke={theme.palette.warning.main}
                                            fill={theme.palette.warning.light}
                                            strokeWidth={2}
                                            fillOpacity="0.25"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </DashboardWidget>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <DashboardWidget title="Payment Methods" upperTitle className={classes.card} disableWidgetMenu
                                     tbgColor="#ea6767">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <ResponsiveContainer width="100%" height={144}>
                                    <PieChart margin={{left: theme.spacing(1)}}>
                                        <Pie
                                            data={PieChartData}
                                            innerRadius={45}
                                            outerRadius={60}
                                            dataKey="value"
                                        >
                                            {PieChartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={theme.palette[entry.color].main}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.pieChartLegendWrapper}>
                                    {PieChartData.map(({name, value, color}, index) => (
                                        <div key={color} className={classes.legendItemContainer}>
                                            <Dot color={color}/>
                                            <Typography style={{whiteSpace: "nowrap"}}>
                                                &nbsp;{name}&nbsp;
                                            </Typography>
                                            <Typography color="text" colorBrightness="secondary">
                                                &nbsp;{value} $
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </DashboardWidget>
                </Grid>


                <Grid item xs={12}>
                    <Widget
                        bodyClass={classes.mainChartBody}
                        header={
                            <div className={classes.mainChartHeader}>
                                <Typography
                                    variant="h5"
                                    color="text"
                                    colorBrightness="secondary"
                                >
                                    Daily Sales
                                </Typography>
                                <div className={classes.mainChartHeaderLabels}>
                                    <div className={classes.mainChartHeaderLabel}>
                                        <Dot color="warning"/>
                                        <Typography className={classes.mainChartLegentElement}>
                                            Tablet
                                        </Typography>
                                    </div>
                                    <div className={classes.mainChartHeaderLabel}>
                                        <Dot color="primary"/>
                                        <Typography className={classes.mainChartLegentElement}>
                                            Mobile
                                        </Typography>
                                    </div>
                                    <div className={classes.mainChartHeaderLabel}>
                                        <Dot color="primary"/>
                                        <Typography className={classes.mainChartLegentElement}>
                                            Desktop
                                        </Typography>
                                    </div>
                                </div>
                                <Select
                                    value={mainChartState}
                                    onChange={e => setMainChartState(e.target.value)}
                                    input={
                                        <OutlinedInput
                                            labelWidth={0}
                                            classes={{
                                                notchedOutline: classes.mainChartSelectRoot,
                                                input: classes.mainChartSelect,
                                            }}
                                        />
                                    }
                                    autoWidth
                                >
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                </Select>
                            </div>
                        }
                    >
                        <ResponsiveContainer width="100%" minWidth={500} height={350}>
                            <ComposedChart
                                margin={{top: 0, right: -15, left: -15, bottom: 0}}
                                data={mainChartData}
                            >
                                <YAxis
                                    ticks={[0, 2500, 5000, 7500]}
                                    tick={{fill: `${theme.palette.text.hint  }80`, fontSize: 14}}
                                    stroke={`${theme.palette.text.hint  }80`}
                                    tickLine={false}
                                />
                                <XAxis
                                    tickFormatter={i => i + 1}
                                    tick={{fill: `${theme.palette.text.hint  }80`, fontSize: 14}}
                                    stroke={`${theme.palette.text.hint  }80`}
                                    tickLine={false}
                                />
                                <Area
                                    type="natural"
                                    dataKey="desktop"
                                    fill={theme.palette.background.light}
                                    strokeWidth={0}
                                    activeDot={false}
                                />
                                <Line
                                    type="natural"
                                    dataKey="mobile"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={false}
                                />
                                <Line
                                    type="linear"
                                    dataKey="tablet"
                                    stroke={theme.palette.warning.main}
                                    strokeWidth={2}
                                    dot={{
                                        stroke: theme.palette.warning.dark,
                                        strokeWidth: 2,
                                        fill: theme.palette.warning.main,
                                    }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Widget>
                </Grid>


                {/* {mock.bigStat.map(stat => ( */}
                {/*    <Grid item md={4} sm={6} xs={12} key={stat.product}> */}
                {/*        <BigStat {...stat} /> */}
                {/*    </Grid> */}
                {/* ))} */}
            </Grid>
        </>
    );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    const array = new Array(length).fill();
    let lastValue;

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1);

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
            ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
        }

        lastValue = randomValue;

        return {value: randomValue};
    });
}

function getMainChartData() {
    const resultArray = [];
    const tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    const desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    const mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
        resultArray.push({
            tablet: tablet[i].value,
            desktop: desktop[i].value,
            mobile: mobile[i].value,
        });
    }

    return resultArray;
}
