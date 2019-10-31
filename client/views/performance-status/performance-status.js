import React, { Component } from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";

import './performance-status.scss'

import { isEmpty } from 'lodash'
import PerformanceStatusForm from '../../components/performance-status-form/performance-status-form'
import PerformanceStatusView from '../../components/performance-status-view/performance-status-view'
import { NES, GRAPH_TYPES } from '../../constants/performance-status'
import httpClient from '../../httpClient'
import request from 'request'
import Swal from 'sweetalert2'
//import Plot from 'react-plotly.js';


/*
function subscribeToServer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToServer', 1000);
  console.log('emit subscribeToServer')
}*/
class PerformanceStatus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      chartData: []
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalDataChange = this.handleModalDataChange.bind(this)
    this.onDeleteData = this.onDeleteData.bind(this)


  }


  componentDidMount() {
    httpClient.getAllData().then(performanceStatus => {
      if (performanceStatus && performanceStatus.success) {
        this.setState({ chartData: performanceStatus.data })
      }
    })



  //  console.log('emit subscribeToServer:', this.getData)
  }



  toggleModal(evt, modalData) {
    const isModalOpen = !this.state.isModalOpen

    if (isEmpty(modalData)) {
      modalData = {
        networkElement: NES[0].value,
        networkElementSelection: NES[0],
        type: GRAPH_TYPES[0].value,
        graphTypeSelection: GRAPH_TYPES[0]
      }
    }
    this.setState({ isModalOpen, modalData })
  }

  handleSubmit() {
    console.log(this.state.modalData)
    // console.log(process.env)

    // console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED)

    // const formData = {
    //   "queryType" : "SQL",
    //   "query" : " select * from  dfs.`/tmp/35575e87-8893-41fd-9d9c-e65ece5ff33c` limit 10"
    // };

    // request.post(
    //   {
    //     url: 'https://10.181.39.1:8443/gateway/default/drill/query.json',
    //     form: formData
    //   },
    //   function (err, httpResponse, body) {
    //     console.log(err, body);
    //   }
    // );
    httpClient.addData(this.state.modalData).then(res => {
      if (res && res.success) {
        const chartData = this.state.chartData
        chartData.push(res.data)
        console.log(chartData)
        this.setState({ chartData })
        this.toggleModal()
      }
    })
  }

  getDate(moment) {
    return moment && moment.toDate ? moment.toDate() : ''
  }


  handleModalDataChange(key, option, isDate) {
    const modalData = this.state.modalData

    modalData[key] = !isDate ? option.value : this.getDate(option)
    modalData[`${key}Selection`] = option


    this.setState({ modalData })
  }

  onDeleteData(data) {
    httpClient.deleteData(data._id).then(res => {
      if (res && res.success) {
        const chartData = this.state.chartData

        chartData.find((o, i) => {
          if (o._id === data._id) {
            chartData.splice(i, 1)
            return true
          }
          return false
        })

        this.setState({ chartData })
        Swal('Done', 'Chart removed successfully', 'success')

      } else {
        Swal('Oops', res.error, 'error')
      }
    })
  }

  render() {
    return (
      <div className='performance-status content'>
        <div className='header-content'>
          <h2 className="header-content-text">Performance Status</h2>

          <Button color="primary" className="header-content-button" onClick={e => this.toggleModal(e)}>Add Gddddraph</Button>

        </div>

        <Row>
          {this.state.chartData.map((data, key) => {
            return (
              <Col lg="4" key={key} className="chartData">
                <PerformanceStatusView data={data} onDeleteData={this.onDeleteData} />
              </Col>
            )
          })}
        </Row>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Entry</ModalHeader>
          <ModalBody>
            <PerformanceStatusForm data={this.state.modalData} onChange={this.handleModalDataChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>{' '}
            <Button color="primary" type="submit" onClick={e => this.handleSubmit(e)}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default PerformanceStatus;
