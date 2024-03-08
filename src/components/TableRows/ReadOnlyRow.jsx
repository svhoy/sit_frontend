import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
    useEffect(() => {}, [item])
    return (
        <tr
            key={item.id}
            className="border-b odd:bg-gray-100 dark:odd:bg-neutral-700"
        >
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.owner}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.channel_num}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.pulse_rep_freq}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.premable_length_tx}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.tx_preamble_code}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.rx_preamble_code}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.sfd_mode}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.data_rate}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.phy_header_mode}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                {item.preamble_chunk_size}
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.sfd_timeout}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.sts_mode}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.sts_length}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.pdoa_mode}</td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                <button
                    onClick={(event) => {
                        return handleEditClick(event, item)
                    }}
                    className="mx-2"
                    title="Bearbeiten"
                    type="button"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                    type="button"
                    className="mx-2"
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
