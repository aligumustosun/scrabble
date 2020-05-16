import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";

class JoinGame extends Component {
  state = {};
  oyunaKatıl = () => {
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
