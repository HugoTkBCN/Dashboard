import { AppBar, CssBaseline, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import React from "react";
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LogoutGoogle from '../components/LogoutGoogle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RedditIcon from '@material-ui/icons/Reddit';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const drawerWidth = 240;

const styles = (theme) => ({
    title: {
      flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

  class BaseLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: null,
            },
            open: false
        };
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (loggedInUser && token) {
            const foundUser = JSON.parse(loggedInUser);
            this.setState({
                user: foundUser.user
            })
        } else {
            window.location.href = "/login";
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    };
    
    handleDrawerClose = () => {
        this.setState({
            open: false
        });
    };

    render () {
        const { classes, children, theme } = this.props;
        const { open, user } = this.state;
        return(
            <div>
                <CssBaseline/>
                <AppBar 
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="open_drawer" 
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Services
                        </Typography>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => {window.location.href = "/"}}>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/weatherServices"}}>
                            <ListItemIcon><WbSunnyIcon/></ListItemIcon>
                            <ListItemText primary="Weather" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/covidServices"}}>
                            <ListItemIcon><LocalHospitalIcon/></ListItemIcon>
                            <ListItemText primary="Covid" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/exchangeServices"}}>
                            <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                            <ListItemText primary="Exchange rates" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/steamServices"}}>
                            <ListItemIcon><SportsEsportsIcon/></ListItemIcon>
                            <ListItemText primary="Steam" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/redditServices"}}>
                            <ListItemIcon><RedditIcon/></ListItemIcon>
                            <ListItemText primary="Reddit" />
                        </ListItem>
                        <ListItem button onClick={() => {window.location.href = "/pornhubServices"}}>
                            <ListItemIcon><SentimentVerySatisfiedIcon/></ListItemIcon>
                            <ListItemText primary="Pornhub" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={this.logout}>
                                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                    <LogoutGoogle />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BaseLayout);