import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import io from "socket.io-client";

const socket = io("http://25.67.169.153:3000");

class JoinGame extends Component {
  state = {};
  oyunaKatıl = () => {
    socket.emit("newClient", document.getElementById("nameInput").value);
    this.setState({ nickName: document.getElementById("nameInput").value });
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Field required>
            <label>Nick Name</label>
            <input id="nameInput" placeholder="Nick Name" />
          </Form.Field>
          <Button type="submit" onClick={this.oyunaKatıl}>
            Oyuna Katıl
          </Button>
        </Form>
      </div>
    );
  }
}

export default JoinGame;
