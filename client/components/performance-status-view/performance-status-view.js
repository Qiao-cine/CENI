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
import './performance-status-view.scss'
import openSocket from 'socket.io-client';
export default class PerformanceStatusView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          response: 10,
        };
        this.onDeleteClicked = this.onDeleteClicked.bind(this)
        //connectSocket((response) => this.setState({value:response
  //}));
      //  this.updateResponse = this.updateResponse.bind(this)
    }
componentDidMount() {
  const socket = openSocket('http://localhost:3001');
  socket.emit('trigger event', {start:'hello'} );

  //socket.on('news', response => cb(response));
  socket.on('news', function (data) {
   console.log(data);
   data => this.setState({ response: data })
 })

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
                        <div className="chart-area">
                            {data.type && data.type === 'Time-Range' ?
                                <Line
                                    data={chartExample2.data}
                                    options={chartExample2.options}
                                />
                                :
                                <Doughnut data={gaugeData} />
                            }
                        </div>
                    </CardBody>
                </Card>

            </div>

        )
    }
}
