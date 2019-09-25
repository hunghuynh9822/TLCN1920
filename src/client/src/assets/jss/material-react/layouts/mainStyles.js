import {
    drawerWidth,
    transition,
    container
} from "../../material-react.js";

const appStyle = theme => ({
    '@global': {
        body: {
            padding: 0,
            margin: 0,
        },

    },
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    mainPanel: {
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch",
    },
    mainPanelOpen: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
    },
    content: {
        marginTop: "55px",
        minHeight: "calc(100vh - 120px)"
    },
    contentClose: {
        marginLeft: "65px",
        paddingLeft: "10px",
    },
    container: {
        marginTop: "55px",
        width:'100%',
        height:'100%',
    }
});

export default appStyle;