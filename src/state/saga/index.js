import { all, fork } from "redux-saga/effects";

import applicationSagas from "./application";
import animeSagas from "./anime";

export default function* root() {
  yield all([fork(applicationSagas)]);
  yield all([fork(animeSagas)]);
}
