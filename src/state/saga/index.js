import { all, fork } from "redux-saga/effects";

import applicationSagas from "./application";
import animeSagas from "./anime";
import descriptorsSagas from "./descriptors";

export default function* root() {
  yield all([fork(applicationSagas)]);
  yield all([fork(animeSagas)]);
  yield all([fork(descriptorsSagas)]);
}
