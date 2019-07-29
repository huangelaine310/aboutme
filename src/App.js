import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import Splash from "./Splash.js";
import Bubbles from "./Bubbles.js";
import ProjectSect from "./ProjectSect.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ff4400"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

function App() {
  let bubbleData = [
    { id: 0, name: "About me", value: 100, type: "link" },
    { id: 1, name: "Projects", value: 100, type: "link" },
    { id: 2, name: "Travel", value: 90, type: "link" },
    { id: 3, name: "Recipes", value: 80, type: "link" },
    { id: 4, name: "sisyphus", value: 80, type: "img" }
  ];
  return (
    <ThemeProvider theme={theme}>
      <Splash />
      <div id="charts">
        <Bubbles
          data={bubbleData}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
      <ProjectSect />
    </ThemeProvider>
  );
}

export default App;
