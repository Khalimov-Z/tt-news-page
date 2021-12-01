import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { reducer } from "./ducks/reducer";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(reducer, applyMiddleware(logger));
