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
                return <div {...props}>{this.coefficient}</div>;
            case 1:
                return <div {...props}>{this.coefficient}</div>;
            case 2:
                return <div {...props}>{this.coefficient}</div>;
            case 3:
                return <div {...props}>{this.coefficient}</div>;
            default:
                return <div {...props}>{this.coefficient}</div>;                                                           
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

    shuffle(array) {
        let counter = array.length;
    
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    
        return array;
    }

    fillValues = (prevRows,values) => {
        const rows = prevRows;
        
        const emptySquares = [];
        rows.forEach(row => row.forEach(square => {
            if(square.empty) {
                emptySquares.push(square)
            }
        }))
        this.shuffle(emptySquares).slice(0,values.length).forEach((square,index) =>{  
            rows[square.x][square.y].coefficient = values[index];
            rows[square.x][square.y].empty = false;
        })
        return rows;

    }

    initializeRows = () => {
        const size = 10;
        const rows = [];
        for(let i=0; i<size; i++) {
            const row = [];
            for(let k=0; k<size; k++) {
                row.push(new square(0, i, k));
            }
            rows.push(row);
        }
        const valuesToEnter = []
        for(let i=0; i<Math.floor(size*size/11); i++) {
            valuesToEnter.push(1);
        }
        let newRows = this.fillValues(rows, valuesToEnter)
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
                    {style:{marginBottom:'4px', marginTop:'0px', marginRight:'10px', marginLeft:'5px',
                float:  (i == row.length-1) ? 'initial': 'left' }}
                 ))) : null }   
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));