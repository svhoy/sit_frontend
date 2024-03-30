/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import useFetch from "../utils/useFetch"
import ReadOnlyRow from "./TableRows/ReadOnlyRow"
import EditableRow from "./TableRows/EditableRow"
import StyleContex from "../context/StyleContex"

export default function UwbSettingsTable() {
    const { containerStyle, headerStyle, tableStyle, buttonStyle, pageMenuStyle } = useContext(StyleContex)
    const [uwbSettingsList, setUwbSettingsList] = useState([])
    const [editUwbSettingsForm, setEditUwbSettingsForm] = useState({
        name: ""
    })
    const [editUwbSettingsId, setEditUwbSettingsId] = useState(null)
    const [baseURL] = useState("/api/settings/uwb/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    let rexPage = /\?page=\d{1,}/
    let api = useFetch()

    let getUwbSettingsList = async (url = baseURL) => {
        let { response, data } = await api(url)

        if (response.status === 200) {
            if (data.next) {
                let nextPage = data.next.match(rexPage)
                setNextURL(baseURL + nextPage)
            } else {
                setNextURL(null)
            }
            if (data.previous) {
                if (rexPage.test(data.previous)) {
                    let previousPage = data.previous.match(rexPage)
                    setPreviousURL(baseURL + previousPage)
                } else {
                    setPreviousURL(baseURL)
                }
            } else {
                setPreviousURL(null)
            }
            setUwbSettingsList(data.results)
        }
    }

    useEffect(() => {
        getUwbSettingsList()
    }, [])

    let nextPage = () => {
        setUwbSettingsList(nextURL)
    }

    let previousPage = () => {
        setUwbSettingsList(previousURL)
    }

    let sendUwbSettings = async (editedUwbSetting) => {
        let { response, data } = await api(
            `/api/settings/uwb/${editUwbSettingsForm.id}/`,
            "PUT",
            JSON.stringify(editedUwbSetting)
        )

        if (response.status === 200) {
            let newUwbSettingsList = [...uwbSettingsList]

            const index = uwbSettingsList.findIndex((editedUwbSetting) => {
                return editedUwbSetting.id === editUwbSettingsId
            })

            newUwbSettingsList[index] = data
            setUwbSettingsList(newUwbSettingsList)
            setEditUwbSettingsId(null)
        }
    }

    let deleteUwbSetting = async (settingId) => {
        let { response } = await api(`/api/settings/uwb/${settingId}/`, "DELETE")
        if (response.status === 204) {
            getUwbSettingsList()
        }
    }

    let handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        console.log("Test")
        const newFormData = { ...editUwbSettingsForm }
        newFormData[fieldName] = fieldValue

        setEditUwbSettingsForm(newFormData)
    }

    let handleEditFormSubmit = (event) => {
        event.preventDefault()

        const editedUwbSetting = {
            id: editUwbSettingsForm.id,
            name: editUwbSettingsForm.name,
            owner: editUwbSettingsForm.owner,
            channel_num: editUwbSettingsForm.channel_num,
            premable_length_tx: editUwbSettingsForm.premable_length_tx,
            preamble_chunk_size: editUwbSettingsForm.preamble_chunk_size,
            tx_preamble_code: editUwbSettingsForm.tx_preamble_code,
            rx_preamble_code: editUwbSettingsForm.rx_preamble_code,
            sfd_mode: editUwbSettingsForm.sfd_mode,
            data_rate: editUwbSettingsForm.data_rate,
            phy_header_mode: editUwbSettingsForm.phy_header_mode,
            phy_rate: editUwbSettingsForm.phy_rate,
            pulse_rep_freq: editUwbSettingsForm.pulse_rep_freq,
            sfd_timeout: editUwbSettingsForm.sfd_timeout,
            sts_mode: editUwbSettingsForm.sts_mode,
            sts_length: editUwbSettingsForm.sts_length,
            pdoa_mode: editUwbSettingsForm.pdoa_mode
        }
        sendUwbSettings(editedUwbSetting)
    }

    let handleEditClick = (event, item) => {
        event.preventDefault()
        setEditUwbSettingsId(item.id)

        const formValues = {
            id: item.id,
            name: item.name,
            owner: item.owner,
            channel_num: item.channel_num,
            premable_length_tx: item.premable_length_tx,
            preamble_chunk_size: item.preamble_chunk_size,
            tx_preamble_code: item.tx_preamble_code,
            rx_preamble_code: item.rx_preamble_code,
            sfd_mode: item.sfd_mode,
            data_rate: item.data_rate,
            phy_header_mode: item.phy_header_mode,
            phy_rate: item.phy_rate,
            pulse_rep_freq: item.pulse_rep_freq,
            sfd_timeout: item.sfd_timeout,
            sts_mode: item.sts_mode,
            sts_length: item.sts_length,
            pdoa_mode: item.pdoa_mode
        }

        setEditUwbSettingsForm(formValues)
    }

    let handleDeleteClick = (settingId) => {
        deleteUwbSetting(settingId)
    }

    let handleCancelClick = (event) => {
        event.preventDefault()
        setEditUwbSettingsId(null)
    }

    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>
                <h3 className={headerStyle.h3}>
                    UWB Device Settings
                </h3>
            </div>
            <div className={containerStyle.right}>
                <div className={tableStyle.container}>
                    <div className={tableStyle.overflow}>
                        <form onSubmit={handleEditFormSubmit}>
                            <table className={tableStyle.table}>
                                <thead className={tableStyle.head}>
                                    <tr>
                                        <th className={tableStyle.th}>
                                            Name
                                        </th>
                                        <th className={tableStyle.th}>
                                            Owner
                                        </th>
                                        <th className={tableStyle.th}>
                                            Channel Nummer
                                        </th>
                                        <th className={tableStyle.th}>
                                            Preamble Länge TX
                                        </th>
                                        <th className={tableStyle.th}>
                                            Preamble Chunk Size
                                        </th>
                                        <th className={tableStyle.th}>
                                            TX Preamble Code
                                        </th>
                                        <th className={tableStyle.th}>
                                            RX Preamble Code
                                        </th>
                                        <th className={tableStyle.th}>
                                            SFD Mode
                                        </th>
                                        <th className={tableStyle.th}>
                                            Data Rate
                                        </th>
                                        <th className={tableStyle.th}>
                                            PHY Header Mode
                                        </th>
                                        <th className={tableStyle.th}>
                                            Pulse Rep Frequenz
                                        </th>
                                        <th className={tableStyle.th}>
                                            SFD Timeout
                                        </th>
                                        <th className={tableStyle.th}>
                                            STS Mode
                                        </th>
                                        <th className={tableStyle.th}>
                                            STS Length
                                        </th>
                                        <th className={tableStyle.th}>
                                            PDoA Mode
                                        </th>
                                        <th
                                            aria-label="Buttons"
                                            className={tableStyle.th}
                                        />
                                    </tr>
                                </thead>
                                <tbody>
                                    {uwbSettingsList &&
                                        uwbSettingsList.map((item) => {
                                            return (
                                                // eslint-disable-next-line no-unused-expressions
                                                editUwbSettingsId === item.id ? (
                                                    <EditableRow
                                                        editUwbSettingsForm={editUwbSettingsForm}
                                                        handleEditFormChange={handleEditFormChange}
                                                        handleCancelClick={handleCancelClick}
                                                    />
                                                ) : (
                                                    <ReadOnlyRow
                                                        item={item}
                                                        handleEditClick={handleEditClick}
                                                        handleDeleteClick={handleDeleteClick}
                                                    />
                                                )
                                            )
                                        })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className={pageMenuStyle.container}>
                        {previousURL != null ? (
                            <button
                                type="button"
                                className={buttonStyle.activ}
                                onClick={previousPage}
                            >
                                Previous
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
                                disabled
                            >
                                Previous
                            </button>
                        )}
                        {nextURL != null ? (
                            <button
                                type="button"
                                className={buttonStyle.activ}
                                onClick={nextPage}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
                                disabled
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
