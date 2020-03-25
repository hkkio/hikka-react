import React from "react";
import { connect } from "react-redux";
import { ReleasesActionCreators } from "../../../state/action";
import Component from "./component";

export const mapStateToProps = ({releases}) => {
  return {releases};
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getRelease: (payload) =>
      dispatch(ReleasesActionCreators.getRelease(payload)),
  };
}

const Release = () => {
  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
  return <ConnectedComponent />;
};

export { Release };