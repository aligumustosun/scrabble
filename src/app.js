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
} from "semantic-ui-react";
import JoinGame from "./JoinGame.js";
import PlayGame from "./PlayGame.js";
import Board from "./Board";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBoard: false,
      player:true,
    };
  }



  OyunuKur = () => {
    this.setState({ showBoard: false }, () =>
      this.setState({ showBoard: true })
    );
  };
  componentDidMount() {}
  render() {
    const { rows } = this.state;

    return (
      <>
        <div>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                {this.state.showBoard ? (
                  <Board
                    sizeX={parseInt(
                      document.getElementById("oyunAlaniXinput").value
                    )}
                    sizeY={parseInt(
                      document.getElementById("oyunAlaniYinput").value
                    )}
                    coefficientRatios={[
                      parseInt(document.getElementById("ratioZero").value),
                      parseInt(document.getElementById("ratioTwo").value),
                      parseInt(document.getElementById("ratioThree").value),
                    ]}
                  ></Board>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                {/*<JoinGame />*/}
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
                        label={"Kazanma Puanı"}
                        placeholder="Kazanma Puanı"
                        width={14}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group unstackable widths={2}>
                    <Form.Field>
                      <Form.Input
                        label={"IP Adresi"}
                        placeholder="IP Adresi"
                        width={14}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label={"Port"}
                        placeholder="Port"
                        width={14}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <Button onClick={() => this.OyunuKur()}>Oyunu Kur</Button>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
