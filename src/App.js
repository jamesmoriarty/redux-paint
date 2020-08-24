import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import GestureIcon from "@material-ui/icons/Gesture";
import LineIcon from "@material-ui/icons/Remove";
import RectIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ColorIcon from "@material-ui/icons/Palette";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import { OP_TYPE_RECT, OP_TYPE_GESTURE } from "./constants";
import { opSetType, redo, undo } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolButtonGroup: {
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

function App({ history, future, type, dispatch, strokeStyle }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Redux Paint
          </Typography>
          <ButtonGroup className={classes.toolButtonGroup}>
            <ColorPicker>
              <Button variant="contained">
                <ColorIcon style={{ color: strokeStyle }} />
              </Button>
            </ColorPicker>
          </ButtonGroup>
          <ButtonGroup className={classes.toolButtonGroup}>
            <Button
              variant="contained"
              color={type === OP_TYPE_GESTURE ? "secondary" : "default"}
              onClick={() => dispatch(opSetType(OP_TYPE_GESTURE))}
            >
              <GestureIcon />
            </Button>
            <Button variant="contained" disabled={true}>
              <LineIcon />
            </Button>
            <Button
              variant="contained"
              color={type === OP_TYPE_RECT ? "secondary" : "default"}
              onClick={() => dispatch(opSetType(OP_TYPE_RECT))}
            >
              <RectIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup className={classes.toolButtonGroup}>
            <Button
              variant="contained"
              disabled={history.length === 0}
              onClick={() => {
                dispatch(undo());
              }}
            >
              <UndoIcon />
            </Button>
            <Button
              variant="contained"
              disabled={future.length === 0}
              onClick={() => {
                dispatch(redo());
              }}
            >
              <RedoIcon />
            </Button>
          </ButtonGroup>
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
