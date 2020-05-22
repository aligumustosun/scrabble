import React, { Component } from "react";
import { Form, Button, Input, Dropdown, Label } from "semantic-ui-react";
import io from "socket.io-client";

let socket;
class PlayGame extends Component {
  constructor(props) {
    super(props);

    socket = props.socket;
    this.state = {
      vertical: true,
      wordToCheck: "a",
      totalPoints: 0,
      turn: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.myClientList !== undefined) {
      console.log({ prevProps, props: this.props });
      if (
        prevProps.clientCounter !== this.props.clientCounter &&
        this.props.myClientList[this.props.clientCounter] == this.props.name
      ) {
        this.setState({ turn: true });
        console.log("if deyim");
      } else if (
        this.props.myClientList[this.props.clientCounter] !== this.props.name
      ) {
        this.setState({ turn: false });
      }
    }
  }

  checkWord = () => {
    const { wordToCheck, vertical } = this.state;
    let points = this.state.totalPoints;
    const { checkWord } = this.props;
    checkWord(vertical, wordToCheck).then(({ point, rows }) => {
      points += point;
      socket.emit("changeRows", rows);
      this.setState({ totalPoints: points });
    });
    this.setState({ turn: false });
  };

  render() {
    const { turn } = this.state;
    return (
      <div>
        <Form style={{ marginLeft: "2vh" }}>
          <Form.Group widths={2}>
            <Form.Field>
              <Dropdown
                options={[
                  {
                    key: "Vertical",
                    text: "Vertical",
                    value: true,
                  },
                  {
                    key: "Horizontal",
                    text: "Horizontal",
                    value: false,
                  },
                ]}
                onChange={(e, { value }) => this.setState({ vertical: value })}
                defaultValue={true}
              ></Dropdown>
            </Form.Field>
            <Form.Field width={3}>
              <Label basic size={"big"}>
                Total Points
              </Label>
            </Form.Field>
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Field required>
              <Form.Input
                placeholder="check word"
                width={14}
                onChange={(e, { value: wordToCheck }) =>
                  this.setState({ wordToCheck })
                }
              ></Form.Input>
            </Form.Field>
            <Form.Field>
              <Label color={"blue"} size={"huge"}>
                {this.state.totalPoints}
              </Label>
            </Form.Field>
          </Form.Group>
          <Form.Group unstackable widths={1}>
            {turn ? (
              <Button onClick={() => this.checkWord()}> Check word.</Button>
            ) : (
              <p>It's not your turn yet.</p>
            )}
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default PlayGame;
