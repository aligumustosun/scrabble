import React, { Component } from "react";
import { Image, Label, Form } from "semantic-ui-react";

class PlayerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPoints: [0, 1],
      names: ["Ali"],
    };
  }

  createContent = () => {
    return (
      <>
        <Form.Group>
          <Form.Field style={{ marginLeft: "1%" }}>
            <Label style={{ borderStyle: "none" }} basic size={"huge"}>
              {this.state.names[0]}
            </Label>
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <Image
              src={
                "https://www.shareicon.net/data/512x512/2016/06/27/787159_people_512x512.png"
              }
              size="tiny"
              circular
            />
          </Form.Field>
          <Form.Field style={{ placeSelf: "center" }}>
            <Label circular color={"blue"} size={"massive"}>
              {this.state.totalPoints[0]}
            </Label>
          </Form.Field>
        </Form.Group>
      </>
    );
  };

  render() {
    return (
      <div>
        <Form>{this.createContent()}</Form>
      </div>
    );
  }
}

export default PlayerTable;
