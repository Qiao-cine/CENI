export const NES = [
    { label: 'DTN', value: 'DTN' },
    { label: '8700', value: '8700' }
]
export const DIRECTIONS = [
    { label: 'Rx', value: 'Rx' },
    { label: 'Tx', value: 'Tx' }
]
export const GRAPH_TYPES = [
    { label: 'Real-Time', value: 'Real-Time' },
    { label: 'Time-Range', value: 'Time-Range' }
]


//DTN
export const DTN_LOCATIONS = [{ label: 'Ottawa', value: 'Ottawa' }, { label: 'Hanover', value: 'Hanover' }]
export const DTN_PORTS = [{ label: '2039', value: '2039' }, { label: '2040', value: '2040' }]

//8700
export const EIGHTY_SEVEN_HUNDRED_LOCATIONS = [
    { label: 'Ottawa', value: 'Ottawa' },
    { label: 'Hanover', value: 'Hanover' },
    { label: 'Chicago', value: 'Chicago' }
]
export const EIGHTY_SEVEN_HUNDRED_PORTS = [
    { label: '4/1', value: '4/1' },
    { label: '4/2', value: '4/2' },
    { label: '2/5', value: '2/5' },
    { label: '2/6', value: '2/6' }
]

export const performanceStatusNewTree = {
    'DTN': {
        locations: DTN_LOCATIONS,
        ports: DTN_PORTS,
        directions: DIRECTIONS
    },
    '8700': {
        locations: EIGHTY_SEVEN_HUNDRED_LOCATIONS,
        ports: EIGHTY_SEVEN_HUNDRED_PORTS,
        directions: DIRECTIONS
    }
}
