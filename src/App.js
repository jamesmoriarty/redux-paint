import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Canvas from "./components/Canvas";
import UndoButton from "./components/UndoButton";
import RedoButton from "./components/RedoButton";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  canvas: {
    height: "70vh",
  },
}));

function App({ lines, dispatch }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Redux Paint
          </Typography>
          <UndoButton className={classes.menuButton}/>
          <RedoButton className={classes.menuButton}/>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Card className={classes.canvas} raised={true}>
            <Canvas />
          </Card>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lines: state.lines,
  future: state.future,
});

export default connect(mapStateToProps, null)(App);
