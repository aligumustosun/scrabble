import React, { Component } from "react";
import { Form, Button, Input, Dropdown } from "semantic-ui-react";

class PlayGame extends Component {
  state = {
    vertical:true,
    wordToCheck:'a'
};



  checkWord = () => {
   const { wordToCheck, vertical } = this.state;
   const { checkWord } = this.props;
   console.log(checkWord(vertical, wordToCheck));
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field required>
            <Dropdown options={
              [
                {
                  key: 'Vertical',
                  text: 'Vertical',
                  value: true,
                },
                {
                  key: 'Horizontal',
                  text: 'Horizontal',
                  value: false,
                }
              ]
            }
            onChange={(e, {value}) => this.setState({ vertical: value})}
            defaultValue={true}
            >
            </Dropdown>
            <Input
            placeholder="check word"
            onChange={(e, {value:wordToCheck}) => this.setState({ wordToCheck })} ></Input>
            <Button onClick={() => this.checkWord()}> Check word.</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default PlayGame;
