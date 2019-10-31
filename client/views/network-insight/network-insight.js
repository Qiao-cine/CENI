import React, { Component } from 'react';

import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

import openSocket from 'socket.io-client';

//import Plotg from './Plotgraph'



class networkInsight extends Component {
/*
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('here')

  }*/
  state = {
      line1: {
        x: [1,2,3],
        y: [1, 2, 3],
        name: 'Line 1'
      },
      line2: {
        x: [1, 2, 3],
        y: [-3, -2, -1],
        name: 'Line 2'
      },
      layout: {
        datarevision: 0,
      },
      revision: 0,
      response:0,
    }

    componentDidMount() {
      this.setupWebSocket();
      setInterval(this.increaseGraphic, 1000);
    }


setupWebSocket = () => {
  const socket = openSocket('http://localhost:3001');
  socket.emit('trigger event', {start:'hello'} );

  socket.on('news',  (data) => {
            this.setState({
                response:data
            }) ;
            console.log(data);
          //  console.log(data.valueof());
           console.log(this.state.response);
        });
  //data => this.setState({ response: data }))
 //  function (data) {
 //   console.log(data);
 //  // data=>this.handleData
 //   //data=>this.setState({ response: data })

 // })

  }
    rand = () => parseInt(Math.random() * 10 + this.state.revision, 10);
    increaseGraphic = () => {
      const { line1, line2, layout } = this.state;
      var time =new Date();
      //line1.x.push(time);
      //line1.y.push(7);
      line1.x.push(this.state.revision);
      line1.y.push(this.state.response);
      if (line1.x.length >= 10) {
        line1.x.shift();
        line1.y.shift();
      }
      line2.x.push(this.state.revision);
      line2.y.push(this.rand());
      if (line2.x.length >= 10) {
        line2.x.shift();
        line2.y.shift();
      }
      this.setState({ revision: this.state.revision + 1 });
      layout.datarevision = this.state.revision + 1;
    }
  //  this.state.line1,
  //  this.state.line2,
    render() {
      return (<div>
        <Plot
          data={[
            this.state.line1,
            
          ]}
          layout={this.state.layout}
          revision={this.state.revision}
          graphDiv="graph"
        />
      </div>);
    }
/*
  render() {
      return (
       <div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
      />
      </div>

      );
    }*/

}
export default networkInsight;
