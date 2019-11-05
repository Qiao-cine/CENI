import React from 'react';
import {
    Row,
    Col,
    FormGroup
} from 'reactstrap';

import Select from 'react-select'

import { NES, performanceStatusNewTree, GRAPH_TYPES } from '../../constants/performance-status-new'

import Datetime from 'react-datetime'

export default class PerformanceStatusNewForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, option, isDate) {
        console.log(key)
        console.log(option)

        console.log(this.props.data)
        this.props.onChange(key, option, isDate);
    }

    render() {
        const { data } = this.props
        const networkElementValue = data.networkElementSelection.value

        return (
            <div>
                <Row>
                    <Col className="pr-md-1" md="8">
                        <FormGroup>
                            <label>Network Element: </label>
                            <Select
                                className='react-select primary'
                                classNamePrefix="react-select"
                                name="networkElement"
                                value={data.networkElementSelection}
                                options={NES}
                                onChange={e => this.handleChange('networkElement', e)}
                                isSearchable
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="pr-md-1" md="8">
                        <FormGroup>
                            <label>Location: </label>
                            <Select
                                className='react-select primary'
                                classNamePrefix="react-select"
                                name="location"
                                value={data.locationSelection}
                                options={performanceStatusNewTree[networkElementValue].locations}
                                onChange={e => this.handleChange('location', e)}
                                isSearchable
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="pr-md-1" md="8">
                        <FormGroup>
                            <label>Port: </label>
                            <Select
                                className='react-select primary'
                                classNamePrefix="react-select"
                                name="port"
                                value={data.portSelection}
                                options={performanceStatusNewTree[networkElementValue].ports}
                                onChange={e => this.handleChange('port', e)}
                                isSearchable
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="pr-md-1" md="8">
                        <FormGroup>
                            <label>Direction: </label>
                            <Select
                                className='react-select primary'
                                classNamePrefix="react-select"
                                name="direction"
                                value={data.directionSelection}
                                options={performanceStatusNewTree[networkElementValue].directions}
                                onChange={e => this.handleChange('direction', e)}
                                isSearchable
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="pr-md-1" md="8">
                        <FormGroup>
                            <label>Graph type: </label>
                            <Select
                                className='react-select primary'
                                classNamePrefix="react-select"
                                name="type"
                                value={data.graphTypeSelection}
                                options={GRAPH_TYPES}
                                onChange={e => this.handleChange('type', e)}
                                isSearchable
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                {data.type && data.type === 'Time-Range' ?
                    <Row>
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <label>From:</label>
                                <Datetime
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    value={data.fromDate}
                                    onChange={date => this.handleChange('fromDate', date, true)}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <label>To:</label>
                                <Datetime
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    value={data.toDate}
                                    onChange={date => this.handleChange('toDate', date, true)}
                                />
                            </FormGroup>
                        </Col>
                    </Row> : ''
                }

            </div>
        )
    }
}
