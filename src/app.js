import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class square {
    constructor(coefficient, x,y) {
        this.coefficient = coefficient;
        this.usedBefore = false;
        this.empty = true;
        this.letter = '_';
        this.x = x;
        this.y = y;
    }
    render(props){
        switch(this.coefficient) {
            case 0:
                return <p {...props}>{this.coefficient}</p>;
            case 1:
                return <p {...props}>{this.coefficient}</p>;
            case 2:
                return <p {...props}>{this.coefficient}</p>;
            case 3:
                return <p {...props}>{this.coefficient}</p>;
            default:
                return <p {...props}>{this.coefficient}</p>;                                                           
        }    
    }
}
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: null
        }
    }


    fillValue = (rows,value,count) => {
        for(let i=0; i<count; i++) {
            const randX = Math.floor(Math.random() * rows[0].length);
            const randY = Math.floor(Math.random() * rows.length);
            if(rows[randX][randY].empty) {
                rows[randX][randY].coefficient = value;
            }
            else {
                rows = this.fillValue(rows, value, count)
            }
        }
        return rows;
    }

    initializeRows = () => {
        const size = 20;
        const rows = [];
        for(let i=0; i<size; i++) {
            const row = [];
            for(let k=0; k<size; k++) {
                row.push(new square(i%4+2));
            }
            rows.push(row);
        }
        const newRows = this.fillValue(rows, 1, 10)
        this.setState({ rows:newRows })
    };


    componentDidMount() {
        this.initializeRows();
    }

    
    render() {
    const { rows } = this.state;
    
        return (
            <div>
                { rows ? rows.map((row) => row.map((square,i) => square.render(
                    {style:{marginBottom:'0px', marginTop:'0px',
                float:  (i == row.length-1) ? 'initial': 'left' }}
                 ))) : null }   
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));