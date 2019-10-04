import color from 'color';
const adminDashboardStyle = theme => ({
    container: {
        maxWidth: '1280px',
    },
    gridroot:{
        margin:0,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});
export default adminDashboardStyle;