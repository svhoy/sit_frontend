/* eslint-disable operator-linebreak */
import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import StyleContex from "../../context/StyleContex"

export default function DistanceTable({ headers, distanceData }) {
    const { tableStyle } = useContext(StyleContex)
    useEffect(() => {}, [])

    return (
        <div className={tableStyle.container}>
            <div className={tableStyle.overflow}>
                <table className={tableStyle.table}>
                    <thead className={tableStyle.head}>
                        {headers &&
                            headers.map((item) => {
                                return (
                                    <th
                                        key={item}
                                        className={tableStyle.th}
                                    >
                                        {item}
                                    </th>
                                )
                            })}
                    </thead>
                    <tbody>
                        {distanceData &&
                            distanceData.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className={tableStyle.tr}
                                    >
                                        <td className={tableStyle.td}>
                                            {item.sequence}
                                        </td>
                                        <td className={tableStyle.td}>
                                            {item.distance}
                                        </td>
                                        <td className={tableStyle.td}>
                                            {item.error_distance}
                                        </td>
                                        <td className={tableStyle.td}>
                                            {item.RecivedSignalStrengthIndex}
                                        </td>
                                        <td className={tableStyle.td}>
                                            {item.firstPathIndex}
                                        </td>
                                        <td className={tableStyle.td}>
                                            {item.nlos}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

DistanceTable.propTypes = {
    distanceData: PropTypes.arrayOf(
        PropTypes.shape({
            RecivedSignalStrengthIndex: PropTypes.number,
            distance: PropTypes.number,
            error_distance: PropTypes.number,
            firstPathIndex: PropTypes.number,
            id: PropTypes.number,
            nlos: PropTypes.number,
            sequence: PropTypes.number
        }).isRequired
    ).isRequired,
    headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}
