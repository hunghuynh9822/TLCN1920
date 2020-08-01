import color from 'color';
const adminHumanManagementStyle = theme => ({
    root: {
        padding: '10px 15px 0px 15px',
        width: '100%',
        // minHeight: 'calc(100vh - 110px)',
        minHeight: '100%',
        // backgroundColor: '#f2f2f2'
    },
    area: {
        marginBottom: '10px',
    },
    bar: {
        height: '50px',
        '&:hover': {
            background: color('#e6e6e6')
                .hex()
        },
        padding: '12px 0px 12px 15px',
        margin: '15px 0px 15px 0px',
    },
    container: {
        display: 'flex',
        /* or inline-flex */
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});
export default adminHumanManagementStyle;