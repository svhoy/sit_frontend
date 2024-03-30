/* eslint-disable operator-linebreak */
import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import StyleContex from "../../context/StyleContex"


export default function DistanceTable({ headers, data }) {
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
                        {data &&
                            data.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className={tableStyle.tr}
                                    >
                                        {Object.entries(item).map(([key, value]) => {
                                            return (
                                                <td key={key} className={tableStyle.td}>
                                                    {value}
                                                </td>
                                            )
                                        })
                                        }
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
    data: PropTypes.arrayOf(
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
