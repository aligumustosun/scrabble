import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Icon, Label, Menu, Table} from 'semantic-ui-react'

class square {
    constructor(coefficient, x,y) {
        this.coefficient = coefficient;
        this.usedBefore = false;
        this.empty = true;
        this.letter = '_';
        this.x = x;
        this.y = y;
    }
    render(props, nbspTrue){
        let returnValue;
        switch(this.coefficient) {
            case 0:
                returnValue = <div {...props}>{this.letter }</div>;
            case 1:
                returnValue = <div {...props}>{this.letter}</div>;
            case 2:
                returnValue = <div {...props}>{this.letter}</div>;
            case 3:
                returnValue = <div {...props}>{this.letter}</div>;
            default:
                returnValue = <div {...props}>{this.letter}</div>;                                                           
        }
        return <>{returnValue} {nbspTrue ? <br/>:null}</>    
    }
}
 
class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: null
        }
    }

    shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
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
        const { sizeX, sizeY } = this.props;
        const rows = [];
        for(let i=0; i<sizeX; i++) {
            const row = [];
            for(let k=0; k<sizeY; k++) {
                row.push(new square(0, i, k));
            }
            rows.push(row);
        }
        console.log(rows);

        const coefficientRatios = this.props;
        const valuesToEnter = []
        for(let i=0; i<Math.floor(sizeX*sizeY*ratios[0]/100); i++) {
            valuesToEnter.push(1);
        }
        for(let i=0; i<Math.floor(sizeX*sizeY*ratios[1]/100); i++) {
            valuesToEnter.push(2);
        }
        for(let i=0; i<Math.floor(sizeX*sizeY*ratios[2]/100); i++) {
            valuesToEnter.push(3);
        }
        let newRows = this.fillValues(rows, valuesToEnter)
        this.setState({ rows:newRows })
    };


    componentDidMount() {
        this.initializeRows();
    }

    
    generateProps = (square, i,rowLength) => {
        let backgroundColor = 'white';
        switch(square.coefficient) {
            case 0:
                backgroundColor='white';
                break;
            case 1:
                backgroundColor="black";
                break;
            case 2:
                backgroundColor="yellow";
                break;
            case 3:
                backgroundColor="green";
                break;
        }
        return {
            style:{marginBottom:'4px', marginTop:'0px', 
            marginRight:'10px', marginLeft:'5px',
            float: 'left',
            backgroundColor,
            },
            onClick: (e) => {console.log(e)}}
    }

    putFirstWord = word => {
        const { sizeX, sizeY } = this.props;
        const vertical = Math.random() >= 0.5
        if(vertical) {
            const x = Math.floor(Math.random()*sizeX);
            const y = Math.floor(Math.random() * (sizeY * word.length))    
            const startPoint = {x,y};
        }
        for(let i=0; i<word.length; i++) {
            word.charAt(i)
        }
    }

    generateRow = (row) => {
        return row.map((square,i) =>
         <Table.Cell>
            {square.render(this.generateProps(square,i,row.length),
             (i == row.length-1))}
         </Table.Cell>)       
    }

    render() {
    const { rows } = this.state;
    
        return (
            <>
              <Table>
                <Table.Body>
                { rows ? rows.map((row) => 
                    <Table.Row>
                    {this.generateRow(row)}
                    </Table.Row>
                    ) : null}
                </Table.Body>
                </Table> 
            </>
        )
    }
}

ReactDOM.render(<Board sizeX={16} sizeY={16} coefficientRatios={[11,5,2]}/>, document.getElementById('root'));