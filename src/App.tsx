import React from "react";
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
import RectIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ColorIcon from "@material-ui/icons/Palette";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Canvas from "./containers/Canvas";
import ColorPicker from "./containers/ColorPicker";
import { OP_TYPES } from "./types";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolButtonGroup: {
    marginRight: theme.spacing(1),
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

function App({
  history,
  future,
  type,
  color,
  onGesture,
  onRect,
  onUndo,
  onRedo,
}: any) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography className={classes.title}></Typography>
          <ButtonGroup className={classes.toolButtonGroup}>
            <ColorPicker>
              <Button variant="contained">
                <ColorIcon style={{ color: color }} />
              </Button>
            </ColorPicker>
          </ButtonGroup>
          <ButtonGroup className={classes.toolButtonGroup}>
            <Button
              variant="contained"
              color={
                type === OP_TYPES.OP_TYPE_GESTURE ? "secondary" : "default"
              }
              onClick={onGesture}
            >
              <GestureIcon />
            </Button>
            <Button
              variant="contained"
              color={type === OP_TYPES.OP_TYPE_RECT ? "secondary" : "default"}
              onClick={onRect}
            >
              <RectIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup className={classes.toolButtonGroup}>
            <Button
              variant="contained"
              disabled={history.length === 0}
              onClick={onUndo}
            >
              <UndoIcon />
            </Button>
            <Button
              variant="contained"
              disabled={future.length === 0}
              onClick={onRedo}
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

export default App;
