import React, { useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import StyleContex from "../../context/StyleContex"

const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
    const { tableStyle } = useContext(StyleContex)
    useEffect(() => {}, [item])
    return (
        <tr
            key={item.id}
            className={tableStyle.tr}
        >
            <td className={tableStyle.td}>{item.name}</td>
            <td className={tableStyle.td}>{item.owner}</td>
            <td className={tableStyle.td}>{item.channel_num}</td>
            <td className={tableStyle.td}>
                {item.pulse_rep_freq}
            </td>
            <td className={tableStyle.td}>
                {item.premable_length_tx}
            </td>
            <td className={tableStyle.td}>
                {item.tx_preamble_code}
            </td>
            <td className={tableStyle.td}>
                {item.rx_preamble_code}
            </td>
            <td className={tableStyle.td}>{item.sfd_mode}</td>
            <td className={tableStyle.td}>{item.data_rate}</td>
            <td className={tableStyle.td}>
                {item.phy_header_mode}
            </td>
            <td className={tableStyle.td}>
                {item.preamble_chunk_size}
            </td>
            <td className={tableStyle.td}>{item.sfd_timeout}</td>
            <td className={tableStyle.td}>{item.sts_mode}</td>
            <td className={tableStyle.td}>{item.sts_length}</td>
            <td className={tableStyle.td}>{item.pdoa_mode}</td>
            <td className={tableStyle.td}>
                <button
                    onClick={(event) => {
                        return handleEditClick(event, item)
                    }}
                    className={tableStyle.editButton}
                    title="Bearbeiten"
                    type="button"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                    type="button"
                    className={tableStyle.editButton}
                    onClick={() => {
                        return handleDeleteClick(item.id)
                    }}
                    title="Löschen"
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow

ReadOnlyRow.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        owner: PropTypes.string.isRequired,
        channel_num: PropTypes.number.isRequired,
        pulse_rep_freq: PropTypes.string.isRequired,
        premable_length_tx: PropTypes.string.isRequired,
        rx_preamble_code: PropTypes.number.isRequired,
        tx_preamble_code: PropTypes.number.isRequired,
        sfd_mode: PropTypes.string.isRequired,
        data_rate: PropTypes.string.isRequired,
        phy_header_mode: PropTypes.string.isRequired,
        preamble_chunk_size: PropTypes.string.isRequired,
        sfd_timeout: PropTypes.number.isRequired,
        sts_mode: PropTypes.string.isRequired,
        sts_length: PropTypes.string.isRequired,
        pdoa_mode: PropTypes.string.isRequired
    }).isRequired,
    handleEditClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
}
