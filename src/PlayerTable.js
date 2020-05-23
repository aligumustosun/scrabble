import React, { Component } from "react";
import { Image, Label, Form } from "semantic-ui-react";

class PlayerTable extends Component {
  constructor(props) {
    super(props);
    const names = Object.keys(props.table);
    const totalPoints = Object.values(props.table);
    this.state = {
      totalPoints,
      names,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.table !== this.props.table) {
      console.log(this.props.table);
      const names = Object.keys(this.props.table);
      const totalPoints = Object.values(this.props.table);
      this.setState({ names, totalPoints })
    }
  }

  createContent = () => {
    const { names, totalPoints }= this.state;
    return (
      this.state.names ? 
        <><Form.Group>
          {names.map(name => 
            <Form.Field style={{ marginLeft: "1%" }}>
            <Label style={{ borderStyle: "none" }} basic size={"huge"}>
              {name}
            </Label>
          </Form.Field>)}
        </Form.Group>
              
        <Form.Group>
          {totalPoints.map(totalPoint =>
           <>
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
              {totalPoint}
            </Label>
          </Form.Field>
          </>)}
        </Form.Group>
        </>
      : null 
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
