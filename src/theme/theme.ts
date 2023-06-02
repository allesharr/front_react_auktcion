import { createTheme } from "@material-ui/core";
import { indigo, lightBlue, purple, pink, teal, cyan } from "@material-ui/core/colors";


export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: indigo[400],
      // main: pink[400]
    },
    secondary: {
      main: lightBlue[400]
    }
  },
  // mixins:{
  //   tabbedDataGrid: {

  //   }
  // }
});



export const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      paper: "#1A202C",
    },
    primary: {
      main: '#9c27b0'
    },
    // text: {
    //   primary: "#fff",
    // },
  },
});

// primary: {
//   main: teal[400],
// },
// secondary: {
//   main: cyan[400]
// }