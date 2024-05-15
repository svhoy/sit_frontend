import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import StyleContex from "../../context/StyleContex"

const EditableRow = ({ editUwbSettingsForm, handleEditFormChange, handleCancelClick }) => {
    const { tableStyle, formStyle } = useContext(StyleContex)
    return (
        <tr
            key={editUwbSettingsForm.id}
            className={tableStyle.tr}
        >
            <td className={tableStyle.td}>
                <input
                    type="text"
                    required="required"
                    placeholder="Settings Name"
                    name="name"
                    value={editUwbSettingsForm.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className={tableStyle.td}>
                {editUwbSettingsForm.owner}
            </td>
            <td className={tableStyle.td}>
                <select
                    name="channel_num"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.channel_num}
                >
                    <option value="5">5</option>
                    <option value="9">9</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="premable_length_tx"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.premable_length_tx}
                >
                    <option value="DWT_PLEN_72">DWT_PLEN_72</option>
                    <option value="DWT_PLEN_64">DWT_PLEN_64</option>
                    <option value="DWT_PLEN_128">DWT_PLEN_128</option>
                    <option value="DWT_PLEN_256">DWT_PLEN_256</option>
                    <option value="DWT_PLEN_512">DWT_PLEN_512</option>
                    <option value="DWT_PLEN_1024">DWT_PLEN_1024</option>
                    <option value="DWT_PLEN_1536">DWT_PLEN_1536</option>
                    <option value="DWT_PLEN_2048">DWT_PLEN_2048</option>
                    <option value="DWT_PLEN_4096">DWT_PLEN_4096</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="preamble_chunk_size"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.preamble_chunk_size}
                >
                    <option value="DWT_PAC8">DWT_PAC8</option>
                    <option value="DWT_PAC16">DWT_PAC16</option>
                    <option value="DWT_PAC32">DWT_PAC32</option>
                    <option value="DWT_PAC64">DWT_PAC64</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <input
                    type="number"
                    required="required"
                    placeholder="TX Preabmle Code"
                    name="tx_preamble_code"
                    value={editUwbSettingsForm.tx_preamble_code}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className={tableStyle.td}>
                <input
                    type="number"
                    required="required"
                    placeholder="RX Preabmle Code"
                    name="rx_preamble_code"
                    value={editUwbSettingsForm.rx_preamble_code}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className={tableStyle.td}>
                <select
                    name="sfd_mode"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.sfd_mode}
                >
                    <option value="DWT_SFD_IEEE_4A">DWT_SFD_IEEE_4A</option>
                    <option value="DWT_SFD_DW_8">DWT_SFD_DW_8</option>
                    <option value="DWT_SFD_DW_16">DWT_SFD_DW_16</option>
                    <option value="DWT_SFD_IEEE_4Z">DWT_SFD_IEEE_4Z</option>
                    <option value="DWT_SFD_LEN8">DWT_SFD_LEN8</option>
                    <option value="DWT_SFD_LEN16">DWT_SFD_LEN16</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="data_rate"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.data_rate}
                >
                    <option value="DWT_BR_850K">DWT_BR_850K</option>
                    <option value="DWT_BR_6M8">DWT_BR_6M8</option>
                    <option value="DWT_BR_NODATA">DWT_BR_NODATA</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="phy_header_mode"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.phy_header_mode}
                >
                    <option value="DWT_PHRMODE_STD">DWT_PHRMODE_STD</option>
                    <option value="DWT_PHRMODE_EXT">DWT_PHRMODE_EXT</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="pulse_rep_freq"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.pulse_rep_freq}
                >
                    <option value="DWT_PRF_16M">DWT_PRF_16M</option>
                    <option value="DWT_PRF_64M">DWT_PRF_64M</option>
                    <option value="DWT_PRF_SCP">DWT_PRF_SCP</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <input
                    type="number"
                    required="required"
                    placeholder="SFD Timeout"
                    name="sfd_timeout"
                    value={editUwbSettingsForm.sfd_timeout}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className={tableStyle.td}>
                <select
                    name="sts_mode"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.sts_mode}
                >
                    <option value="DWT_STS_MODE_OFF">DWT_STS_MODE_OFF</option>
                    <option value="DWT_STS_MODE_1">DWT_STS_MODE_1</option>
                    <option value="DWT_STS_MODE_2">DWT_STS_MODE_2</option>
                    <option value="DWT_STS_MODE_ND">DWT_STS_MODE_ND</option>
                    <option value="DWT_STS_MODE_SDC">DWT_STS_MODE_SDC</option>
                    <option value="DWT_STS_MODE_MASK">DWT_STS_MODE_MASK</option>
                    <option value="DWT_STS_MODE_MASK_NO_SDC">DWT_STS_MODE_MASK_NO_SDC</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="sts_length"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.sts_length}
                >
                    <option value="DWT_STS_LEN_32">DWT_STS_LEN_32</option>
                    <option value="DWT_STS_LEN_64">DWT_STS_LEN_64</option>
                    <option value="DWT_STS_LEN_128">DWT_STS_LEN_128</option>
                    <option value="DWT_STS_LEN_256">DWT_STS_LEN_256</option>
                    <option value="DWT_STS_LEN_512">DWT_STS_LEN_512</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <select
                    name="pdoa_mode"
                    onChange={handleEditFormChange}
                    value={editUwbSettingsForm.pdoa_mode}
                >
                    <option value="DWT_PDOA_M0">DWT_PDOA_M0</option>
                    <option value="DWT_PDOA_M1">DWT_PDOA_M1</option>
                    <option value="DWT_PDOA_M3">DWT_PDOA_M3</option>
                </select>
            </td>
            <td className={tableStyle.td}>
                <button
                    type="submit"
                    className="mx-2"
                    title="Speichern"
                >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <button
                    type="button"
                    className="mx-2"
                    onClick={handleCancelClick}
                    title="Abbrechen"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </td>
        </tr>
    )
}

export default EditableRow

EditableRow.propTypes = {
    editUwbSettingsForm: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    handleEditFormChange: PropTypes.func.isRequired,
    handleCancelClick: PropTypes.func.isRequired
}
