import React, { Component } from "react";
import { Form, Button, Input, Dropdown, Label } from "semantic-ui-react";
import axios from "axios";
import PlayerTable from "./PlayerTable";

let socket;
class PlayGame extends Component {
  constructor(props) {
    super(props);

    socket = props.socket;

    socket.on("newPointTable", table => {
      console.log('newPoints came');
      this.setState({ table });
    })

    this.state = {
      vertical: true,
      wordToCheck: "a",
      totalPoints: 0,
      turn: props.turn,
      table: {},
      name: props.name
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.turn !== this.props.turn) {
      this.setState({ turn: this.props.turn })
    }
  }

  checkWord = () => {
    const { wordToCheck, vertical, table } = this.state;
    const { ip } = this.props;
    let points = this.state.totalPoints;
    const { checkWord } = this.props;
    axios
      .get(`http://${ip}:3000/checkWord?word=${wordToCheck}`)
      .then(({ data: included }) => {
        console.log(included)
        checkWord(vertical, wordToCheck, included).then(({ point, rows, name }) => {
          points += (typeof point=='number') ? point : 0;
          socket.emit("changeRows", rows);
          socket.emit("changePointTable", {name,points});
          this.setState({ totalPoints: points });
        });
        this.setState({ turn: false });
      });
  };

  render() {
    const { turn, table, name } = this.state;
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
          <PlayerTable table={table} name={name}/>
        </Form>
      </div>
    );
  }
}

export default PlayGame;
