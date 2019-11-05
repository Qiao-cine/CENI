import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,

} from 'reactstrap';

//import React from 'react';


import {
    chartExample2,
} from "./charts-data";
import { Line, Doughnut } from "react-chartjs-2";
import FontAwesome from 'react-fontawesome'
//import { connectSocket } from './socketio';
import './performance-status-view-new.scss'

import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);
//import socket from '../../socketio'
import openSocket from 'socket.io-client';

export default class PerformanceStatusNewView extends React.Component {
constructor(props) {
  super(props);
  this.state = {

  //state = {
      line1: {
        x: [ ],
        y: [ ],
        name: 'Line 1'
      },
      line2: {
        x: [],
        y: [],
        name: 'Line 2'
      },
      layout: {
        datarevision: 0,
        autosize: true,


      },
      revision: 0,
      response:0,
      reponse2:0,
      useResizeHandler: true,
      index:0,
    };



        /*super(props);
        this.state = {
          response: 10,
        };*/
        this.onDeleteClicked = this.onDeleteClicked.bind(this)
        //connectSocket((response) => this.setState({value:response
  //}));
      //  this.updateResponse = this.updateResponse.bind(this)
    }
componentDidMount() {
    this.setupWebSocket();
    setInterval(this.increaseGraphic, 1000);
 //  const socket = openSocket('http://localhost:3001');
 //  socket.emit('trigger event', {start:'hello'} );
 //
 //  socket.on('news', function (data) {
 //   console.log(data);
 //   data => this.setState({ response: data })
 // })

}
setupWebSocket = () => {
  const socket = openSocket('http://localhost:3001',{forceNew: true});
  socket.emit('trigger event', {start:'hello'} );
  console.log('data id:')
  const data = this.props.data
  console.log(String(data._id));
  // var socketMessage
  // socketMessage=socketOn(String(data._id),data)
  // this.setState({
  //             response:socketMessage
  //          }) ;
  // console.log('debug1: state response')
  // console.log(this.state.response);

  socket.on(String(data._id),  (data) => {
            this.setState({
                response:data
            }) ;

            console.log("message from index:");
            console.log(data);
          //  console.log(data.valueof());
           console.log(this.state.response);
        });

        socket.on(String(1),  (data) => {
                  this.setState({
                      response2:data
                  }) ;
                    console.log("message from index+1:");
                  console.log(data);
                //  console.log(data.valueof());
              //   console.log(this.state.response);
              });
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
        line2.y.push(this.state.response2);
        if (line2.x.length >= 10) {
          line2.x.shift();
          line2.y.shift();
        }
        this.setState({ revision: this.state.revision + 1 });
        layout.datarevision = this.state.revision + 1;
      }

//  updateResponse(data){
      // no underscore dongle

      // set new state only inside.
      // do whatever you want to do over here.
    // this.setState({response:data});}
    onDeleteClicked() {
        this.props.onDeleteData(this.props.data)
    }

    render() {
        const { response } = this.state;
        const gaugeData = {
            labels: [
                'Red',
                'blue'
            ],
            datasets: [{
                data: [300, response],//realtime data
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
        const { data } = this.props

        const name = data ? data.networkElement + "-" + data.location + "-" + data.port : ''

        return (
            <div>
                <Card className="card-chart">
                    <CardHeader>
                        <h6 className="card-title">{name}</h6>

                        <div className="header-end">
                            <Button className="btn-simple btn btn-xs btn-info">
                                <FontAwesome name="edit" className="icon" />
                            </Button>{' '}

                            <Button className="btn-simple btn btn-xs btn-danger" onClick={this.onDeleteClicked}>
                                <FontAwesome name="trash-o" className="icon" />
                            </Button>
                        </div>

                    </CardHeader>
                    <CardBody>
                    <div>
                      <Plot
                        data={[
                          this.state.line1,
                          this.state.line2,
                        ]}
                        layout={this.state.layout}
                        revision={this.state.revision}
                        graphDiv="graph"
                        useResizeHandler={this.state.useResizeHandler}
                      />
                    </div>
                    </CardBody>
                </Card>

            </div>

        )
    }
}
