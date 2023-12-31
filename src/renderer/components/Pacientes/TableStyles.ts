// import { styled } from "@mui/system";

/* const TableStyles = makeStyles(() =>
  createStyles({
    headerRow: {
      height: "35px",
      borderBottom: "1px solid #d7d7d7",
      borderTop: "1px solid #d7d7d7",
      paddingLeft: "10px",
      paddingRight: "10px",
      display: "flex",
    },
    secondRow: {
      display: "flex",
      marginLeft: "auto",
      whiteSpace: "nowrap",
    },
    btn: {
      border: "1px solid #ccc",
      backgroundColor: "#f4f4f4",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      textTransform: "unset",
      "&:hover": {
        backgroundColor: "rgba(158,158,158,0.2)",
      },
    },
    btnConfig: {
      border: "1px solid #ccc",
      backgroundColor: "white",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      textTransform: "unset",
      "&:hover": {
        backgroundColor: "rgba(158,158,158,0.2)",
      },
    },
    btnDialog: {
      backgroundColor: "white",
      color: "#312e2e",
      minWidth: "initial",
      height: "10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      float: "right",
    },
    btnExpand: {
      border: "1px solid #ccc",
      backgroundColor: "#f4f4f4",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      textTransform: "unset",
      marginLeft: "auto",
      "&:hover": {
        backgroundColor: "white",
      },
    },
    btnSelected: {
      backgroundColor: "#c7c7c7",
    },
    btnBlue: {
      border: "1px solid #ccc",
      backgroundColor: "#4372ca",
      color: "white",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      textTransform: "unset",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: "#4372ca",
        color: "#fff",
      },
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed",
    },
    tableHeader: {
      border: "solid #d7d7d7",
      borderWidth: "2px 0 1px 0",
      background: "white",
      color: "black",
      fontWeight: "bold",
      textAlign: "left",
      height: "28px",
      paddingLeft: "8px",
      position: "sticky",
      top: "0",
      margin: "0 0 0 0",
    },
    tableElementOdd: {
      backgroundColor: "white",
      borderBottom: "1px solid #d7d7d7",
      paddingLeft: "8px",
      height: "30px",
      "&:hover": {
        backgroundColor: "#90C2E7",
      },
      "&>*": {
        paddingLeft: "8px",
      },
    },
    tableElementEven: {
      backgroundColor: "#FCF7F8",
      borderBottom: "1px solid #d7d7d7",
      paddingLeft: "8px",
      height: "30px",
      "&:hover": {
        backgroundColor: "#90C2E7",
      },
      "&>*": {
        paddingLeft: "8px",
      },
    },
    input: {
      height: "30px",
      minHeight: "30px",
      border: "1px solid #ccc",
      borderRadius: "0",
      backgroundColor: "white",
      fontSize: "13px",
      fontWeight: "normal",
      lineHeight: "30px",
      boxSizing: "border-box",
      padding: "0px 10px",
      zIndex: 1,
      width: "185px",
      marginTop: "3px",
      marginBottom: "3px",
    },
    vertical: {
      border: "none",
      borderLeft: "1px solid #d7d7d7",
      height: "100%",
      width: "1px",
      margin: "0px 9px",
    },
    separator: {
      paddingLeft: "10%",
    },
  }),
);
 */
const TableStyles = (theme: undefined) => ({
  headerRow: {
    height: '35px',
    borderBottom: '1px solid #d7d7d7',
    borderTop: '1px solid #d7d7d7',
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
  },
  secondRow: {
    display: 'flex',
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  btn: {
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    color: '#312e2e',
    minWidth: 'initial',
    height: '30px',
    borderRadius: '0',
    padding: '0px 10px',
    minHeight: 'initial',
    lineHeight: 'initial',
    marginTop: '3px',
    marginBottom: '3px',
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: 'rgba(158,158,158,0.2)',
    },
  },
  btnConfig: {
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: '#312e2e',
    minWidth: 'initial',
    height: '30px',
    borderRadius: '0',
    padding: '0px 10px',
    minHeight: 'initial',
    lineHeight: 'initial',
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '10px',
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: 'rgba(158,158,158,0.2)',
    },
  },
  btnDialog: {
    backgroundColor: 'white',
    color: '#312e2e',
    minWidth: 'initial',
    height: '10px',
    minHeight: 'initial',
    lineHeight: 'initial',
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '10px',
    float: 'right',
  },
  btnExpand: {
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    color: '#312e2e',
    minWidth: 'initial',
    height: '30px',
    borderRadius: '0',
    padding: '0px 10px',
    minHeight: 'initial',
    lineHeight: 'initial',
    marginTop: '3px',
    marginBottom: '3px',
    textTransform: 'unset',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  btnSelected: {
    backgroundColor: '#c7c7c7',
  },
  btnBlue: {
    border: '1px solid #ccc',
    backgroundColor: '#4372ca',
    color: 'white',
    minWidth: 'initial',
    height: '30px',
    borderRadius: '0',
    padding: '0px 10px',
    minHeight: 'initial',
    lineHeight: 'initial',
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '10px',
    textTransform: 'unset',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#4372ca',
      color: '#fff',
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  tableHeader: {
    border: 'solid #d7d7d7',
    borderWidth: '2px 0 1px 0',
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    height: '28px',
    paddingLeft: '8px',
    position: 'sticky',
    top: '0',
    margin: '0 0 0 0',
  },
  tableElementOdd: {
    backgroundColor: 'white',
    borderBottom: '1px solid #d7d7d7',
    paddingLeft: '8px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#90C2E7',
    },
    '&>*': {
      paddingLeft: '8px',
    },
  },
  tableElementEven: {
    backgroundColor: '#FCF7F8',
    borderBottom: '1px solid #d7d7d7',
    paddingLeft: '8px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#90C2E7',
    },
    '&>*': {
      paddingLeft: '8px',
    },
  },
  input: {
    height: '30px',
    minHeight: '30px',
    border: '1px solid #ccc',
    borderRadius: '0',
    backgroundColor: 'white',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: '30px',
    boxSizing: 'border-box',
    padding: '0px 10px',
    zIndex: 1,
    width: '185px',
    marginTop: '3px',
    marginBottom: '3px',
  },
  vertical: {
    border: 'none',
    borderLeft: '1px solid #d7d7d7',
    height: '100%',
    width: '1px',
    margin: '0px 9px',
  },
  separator: {
    paddingLeft: '10%',
  },
});

export default TableStyles;
