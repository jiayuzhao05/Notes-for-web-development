import React from "react";

class Child2 extends React.PureComponent {
  render() {
    console.log("child2 render again");
    return <div>{this.props.name}</div>;
  }
}

export default Child2;

//{children}->app->router->url变化