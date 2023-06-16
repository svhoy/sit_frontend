import React, { useEffect } from "react"
import {
    CartesianGrid,
    Label,
    Legend,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis
} from "recharts"
import PropTypes from "prop-types"

export default function ScatterChartTest({ distanceData, testDistance, yaxisDomain }) {
    useEffect(() => {}, [distanceData])

    return (
        <ScatterChart
            width={730}
            height={250}
            margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 10
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="x"
                type="number"
                name="distance"
                unit="m"
            >
                <Label
                    value="Distance [m]"
                    offset={0}
                    position="insideBottom"
                />
            </XAxis>
            <YAxis
                dataKey="y"
                type="number"
                name="error"
                unit="m"
                domain={yaxisDomain}
            >
                <Label
                    value="Error [m]"
                    offset={0}
                    position="insideLeft"
                    angle={-90}
                />
            </YAxis>
            <ZAxis
                dataKey="dataPoints"
                type="number"
                name="Data Point"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend
                verticalAlign="top"
                height={36}
            />
            <Scatter
                name="Messung"
                data={distanceData}
                fill="#FF3030"
            />
            <Scatter
                name="Device A"
                data={[{ x: 0, y: 0 }]}
                fill="#8884d8"
            />
            <Scatter
                name="Device B"
                data={[{ x: testDistance, y: 0 }]}
                fill="#191970"
            />
        </ScatterChart>
    )
}

ScatterChartTest.propTypes = {
    distanceData: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            z: PropTypes.number
        })
    ),
    testDistance: PropTypes.number,
    yaxisDomain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
}

ScatterChartTest.defaultProps = {
    distanceData: PropTypes.arrayOf(
        PropTypes.shape({
            x: null,
            y: null,
            z: null
        })
    ),
    testDistance: null,
    yaxisDomain: [0, "auto"]
}
