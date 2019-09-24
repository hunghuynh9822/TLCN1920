import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  drawerWidth
} from "../../material-react";
const headerStyle = (theme) => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    // paddingTop: "10px",
    zIndex: "1029",
    color: grayColor[7],
    border: "0",
    borderRadius: "0 !important",
    padding: "0 !important",
    transition: "all 150ms ease 0s",
    minHeight: "54px",
    display: "block"
  },
  background: {
    position: "absolute",
    zIndex: "-1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      // background: blackColor,
      // opacity: ".8"
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    padding: '0px',
    marginLeft: '9px',
    marginRight: '19px',
    float: 'left',
  },
  menuButtonHidden: {
    display: 'none',
  },
  hidden: {
    display: "inline !important",
  },
  container: {
    ...container,
    minHeight: "54px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  }
});

export default headerStyle;