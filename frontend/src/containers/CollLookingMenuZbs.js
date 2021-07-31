import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CabinetMovie from "./CabinetMovies";
import {Grid} from "@material-ui/core";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
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

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        backgroundColor: 'rgba(255,255,255,0.65)',
        width: '100%',
    },
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{
                borderRadius: '5px 5px 0 0',
        }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Дивлюсь" {...a11yProps(0)} />
                    <Tab label="Завершив" {...a11yProps(1)} />
                    <Tab label="Заплановано" {...a11yProps(2)} />
                    <Tab label="Закинув" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid style={{marginTop: '15px'}} container spacing={3}>
                        {props.user.map(user => (
                            user.watching.map(playlist => (
                                <CabinetMovie post={playlist}/>
                            ))))}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid style={{marginTop: '15px'}} container spacing={3}>
                        {props.user.map(user => (
                            user.completed.map(playlist => (
                                <CabinetMovie post={playlist}/>
                            ))))}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Grid style={{marginTop: '15px'}} container spacing={3}>
                        {props.user.map(user => (
                            user.planning.map(playlist => (
                                <CabinetMovie post={playlist}/>
                            ))))}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Grid style={{marginTop: '15px'}} container spacing={3}>
                        {props.user.map(user => (
                            user.dropped.map(playlist => (
                                <CabinetMovie post={playlist}/>
                            ))))}
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}