import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Icon,
  Label,
  Menu,
  Table,
  Input,
  Button,
  Grid,
  GridColumn,
  Form,
  Dropdown,
} from "semantic-ui-react";
import io from "socket.io-client";
import Board from "./Board";
import PlayerTable from "./PlayerTable";

let socket;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBoard: false,
      host: true,
      name: "",
      playerEntered: false,
      dropdownSelected: false,
    };
  }

  OyunuKur = () => {
    this.setState({ showBoard: false }, () =>
      this.setState({ showBoard: true })
    );
    socket.emit("setWinCon", document.getElementById("winCon").value);
  };

  JoinGame = () => {
    const port = document.getElementById("portInput").value;
    const ip = document.getElementById("ipInput").value;
    this.setState({ playerEntered: true });
    socket = io(`http://${ip}:${port}`);
    socket.emit("newPlayer", this.state.name);
    this.setState({ ip, port });
  };

  componentDidMount() {}
  render() {
    const {
      rows,
      dropdownSelected,
      host,
      playerEntered,
      serverIp,
      ip,
      port,
    } = this.state;

    return (
      <>
        {dropdownSelected ? (
          <div>
            {host ? (
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    {this.state.showBoard ? (
                      <>
                        <Board
                          host={host}
                          ip={serverIp}
                          port={3000}
                          socket={socket}
                          name={this.state.name}
                          winCon={parseInt(
                            document.getElementById("winCon".value)
                          )}
                          sizeX={parseInt(
                            document.getElementById("oyunAlaniXinput").value
                          )}
                          sizeY={parseInt(
                            document.getElementById("oyunAlaniYinput").value
                          )}
                          coefficientRatios={[
                            parseInt(
                              document.getElementById("ratioZero").value
                            ),
                            parseInt(document.getElementById("ratioTwo").value),
                            parseInt(
                              document.getElementById("ratioThree").value
                            ),
                          ]}
                        ></Board>
                      </>
                    ) : null}
                  </Grid.Column>
                  <Grid.Column>
                    <Form>
                      <Form.Group unstackable widths={2}>
                        <Form.Field>
                          <Form.Input
                            id="oyunAlaniXinput"
                            defaultValue={11}
                            label={"Board Horizontal Size"}
                            placeholder="X"
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="oyunAlaniYinput"
                            label={"Board Vertical Size"}
                            defaultValue={11}
                            placeholder="Y"
                            width={14}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group unstackable widths={4}>
                        <Form.Field>
                          <Form.Input
                            id="ratioZero"
                            defaultValue={11}
                            label={"Unusable Area"}
                            placeholder="Unusable Area"
                            width={15}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="ratioTwo"
                            label={"x2 Area"}
                            placeholder="x2 Area"
                            defaultValue={11}
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="ratioThree"
                            label={"x3 Area"}
                            defaultValue={11}
                            placeholder="x3 Area"
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id={"winCon"}
                            label={"Win Condition"}
                            placeholder="Win Condition"
                            width={14}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <Button onClick={() => this.OyunuKur()}>
                          Set Board
                        </Button>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : !playerEntered ? (
              <Form>
                <Form.Group unstackable widths={2}>
                  <Form.Field>
                    <Form.Input
                      id={"ipInput"}
                      defaultValue={"25.68.159.146"}
                      label={"IP Adresi"}
                      placeholder="IP Adresi"
                      width={14}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      id={"portInput"}
                      defaultValue={"3000"}
                      label={"Port"}
                      placeholder="Port"
                      width={14}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={() => this.JoinGame()}>
                      {" "}
                      Enter the game.
                    </Button>
                  </Form.Field>
                </Form.Group>
              </Form>
            ) : (
              <>
                <Board
                  ip={ip}
                  port={port}
                  host={host}
                  socket={socket}
                  name={this.state.name}
                ></Board>
              </>
            )}
          </div>
        ) : (
          <>
            <Input
              placeholder="Enter your name"
              onChange={(e, { value }) => this.setState({ name: value })}
            ></Input>
            <Dropdown
              defaultValue={true}
              options={[
                { key: "host", text: "Host", value: true },
                { key: "player", text: "Player", value: false },
              ]}
              onChange={(e, { value }) => {
                this.setState({ host: value });
              }}
            />
            <Button
              onClick={() => {
                if (this.state.host) {
                  socket = io(
                    `http://${document.getElementById("ServerIp").value}:3000`
                  );
                  socket.emit("newPlayer", this.state.name);
                }
                this.setState({ dropdownSelected: true });
              }}
            >
              Start Game
            </Button>
            {this.state.host ? (
              <Input
                id={"ServerIp"}
                placeholder="Server IP Adresi"
                onChange={(e, { value }) => this.setState({ serverIp: value })}
              ></Input>
            ) : null}
          </>
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
