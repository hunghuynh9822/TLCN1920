import {
    drawerWidth,
    drawerWidthClose,
    transition,
    container
} from "../../material-react.js";

const appStyle = theme => ({
    '@global': {
        body: {
            height: '100%',
            padding: 0,
            margin: 0,
        },

    },
    wrapper: {
        position: "relative",
        top: "0"
        // height: "100vh"
    },
    mainPanel: {
        // overflow: "hidden",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch",
        backgroundColor: "white",
    },
    mainPanelOpen: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
    },
    content: {
        paddingTop: '75px',
        backgroundColor: '#f4f6f8'
        // marginTop: "54px",
        // height: "calc(100vh - 60px)",
        // height: "100vh"
    },
    contentClose: {
        marginLeft: `${drawerWidthClose}px`,
    },
    container: {
        width: '100%',
        height: "calc(100vh - 80px)",
    }
});

export default appStyle;