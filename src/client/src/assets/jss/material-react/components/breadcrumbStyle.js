import {
    whiteColor,
    hexToRgb
  } from "../../material-react.js";
const breadcrumbStyle = theme => ({
    root: {
        paddingLeft: "15px",
        fontSize: "medium",
    },
    homeCrumb: {
        fontSize: "medium",
        textDecoration: "none",
        color: whiteColor,
    },
    bodycrumb: {
        fontSize: "medium",
        textDecoration: "none",
        color: whiteColor,
    },
    lastCrumb: {
        fontSize: "medium",
        textDecoration: "none",
        color: whiteColor,
    },
    iconNext: {
        color: whiteColor,
    }
});
export default breadcrumbStyle;