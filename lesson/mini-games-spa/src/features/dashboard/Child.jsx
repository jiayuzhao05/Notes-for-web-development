import React from "react";

class Child extends React.Component {
  render() {
    console.log("child render again");
    return <div>{this.props.name}</div>;
  }
}

export default Child;
