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
const staticHostIp = "25.67.169.153",
  staticHostPort = "3000";

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
      this.setState({ showBoard: true }),
    );
  };

  JoinGame = () => {
    const port = document.getElementById("portInput").value;
    const ip = document.getElementById("ipInput").value;
    this.setState({ playerEntered: true });
    socket = io(`http://${ip}:${port}`);
    socket.emit("newPlayer", this.state.name);
  };

  componentDidMount() {}
  render() {
    const { rows, dropdownSelected, host, playerEntered } = this.state;

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
                          ip={staticHostIp}
                          port={staticHostPort}
                          socket={socket}
                          name={this.state.name}
                          sizeX={parseInt(
                            document.getElementById("oyunAlaniXinput").value,
                          )}
                          sizeY={parseInt(
                            document.getElementById("oyunAlaniYinput").value,
                          )}
                          coefficientRatios={[
                            parseInt(
                              document.getElementById("ratioZero").value,
                            ),
                            parseInt(document.getElementById("ratioTwo").value),
                            parseInt(
                              document.getElementById("ratioThree").value,
                            ),
                          ]}
                        ></Board>
                        <PlayerTable/>
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
                            label={"Oyun Alanı X"}
                            placeholder="X"
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="oyunAlaniYinput"
                            label={"Oyun Alanı Y"}
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
                            label={"Kullanılamaz Bölge Sayısı"}
                            placeholder="Kullanılamaz Bölge"
                            width={15}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="ratioTwo"
                            label={"x2 Bölge Sayısı"}
                            placeholder="x2 Bölge Sayısı"
                            defaultValue={11}
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id="ratioThree"
                            label={"x3 Bölge Sayısı"}
                            defaultValue={11}
                            placeholder="x3 Bölge Sayısı"
                            width={14}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            id={"winCon"}
                            label={"Kazanma Puanı"}
                            placeholder="Kazanma Puanı"
                            width={14}
                          />
                        </Form.Field>
                      </Form.Group>

                      <Form.Field>
                        <Button onClick={() => this.OyunuKur()}>
                          Oyunu kur
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
                      label={"IP Adresi"}
                      placeholder="IP Adresi"
                      width={14}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      id={"portInput"}
                      label={"Port"}
                      placeholder="Port"
                      width={14}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={this.JoinGame}> Enter the game.</Button>
                  </Form.Field>
                </Form.Group>
              </Form>
            ) : (
              <>
                <Board
                  ip={staticHostIp}
                  port={staticHostPort}
                  host={host}
                  socket={socket}
                  name={this.state.name}
                ></Board>
                <PlayerTable/>
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
                  socket = io(`http://${staticHostIp}:${staticHostPort}`);
                  socket.emit("newPlayer", this.state.name);
                }
                this.setState({ dropdownSelected: true });
              }}
            >
              Oyuna başla
            </Button>
          </>
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
