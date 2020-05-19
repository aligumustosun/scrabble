import React, { Component } from "react";
import { Form, Button, Input, Dropdown, Label } from "semantic-ui-react";

class PlayGame extends Component {
  state = {
    vertical: true,
    wordToCheck: "a",
    totalPoints: 0,
  };

  checkWord = () => {
    const { wordToCheck, vertical } = this.state;
    let points = this.state.totalPoints;
    const { checkWord } = this.props;
    checkWord(vertical, wordToCheck).then((response) => {
      points += response;
      this.setState({ totalPoints: points });
    });
  };

  render() {
    return (
      <div>
        <Form style={{marginLeft:'2vh'}}>
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
            <Button onClick={() => this.checkWord()}> Check word.</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default PlayGame;
