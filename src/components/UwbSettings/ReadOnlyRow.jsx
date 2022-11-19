import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ReadOnlyRow = ({item, handleEditClick, handleDeleteClick}) => { 
    return ( 
      <tr key={item.id} className="bg-white border-b odd:bg-gray-100">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.name}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.owner}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.channel_num}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.pulse_rep_freq}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.premable_length_tx}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.tx_preamble_code}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.rx_preamble_code}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.sfd_mode}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.data_rate}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.phy_header_mode}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.preamble_chunk_size}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.sfd_timeout}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.sts_mode}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.sts_length}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {item.pdoa_mode}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <button onClick={(event) => handleEditClick(event, item)} className="mx-2" title="Bearbeiten">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button type="button" className="mx-2" onClick={()=> handleDeleteClick(item.id)} title="Löschen">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    )
}

export default ReadOnlyRow