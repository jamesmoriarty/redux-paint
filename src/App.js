import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Canvas from "./components/Canvas";
import UndoButton from "./components/UndoButton";
import RedoButton from "./components/RedoButton";
import { OP_SET_TYPE } from "./redux/actionTypes";
import { OP_TYPE_RECT, OP_TYPE_GESTURE } from "./constants";

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
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
  },
  canvas: {
    height: "70vh",
  },
}));

function App({ history, type, dispatch }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Redux Paint
          </Typography>
          <Button
            variant="contained"
            color={type === OP_TYPE_GESTURE ? "secondary" : "default"}
            className={classes.menuButton}
            onClick={() => dispatch({type: OP_SET_TYPE, payload: { type: OP_TYPE_GESTURE }})}
          >
            Gesture
          </Button>
          <Button
            variant="contained"
            color={type === OP_TYPE_RECT ? "secondary" : "default"}
            className={classes.menuButton}
            onClick={() => dispatch({type: OP_SET_TYPE, payload: { type: OP_TYPE_RECT }})}
          >
            Rect
          </Button>
          <UndoButton className={classes.menuButton} />
          <RedoButton className={classes.menuButton} />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container className={classes.container}>
          <Card className={classes.canvas} raised={true}>
            <Canvas />
          </Card>
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(App);
