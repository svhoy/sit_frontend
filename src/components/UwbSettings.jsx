import React, { useState, useEffect } from 'react'
import useFetch from '../utils/useFetch';
import ReadOnlyRow from './UwbSettings/ReadOnlyRow';
import EditableRow from './UwbSettings/EditableRow';


export default function UwbSettings() {
  const [uwbSettingsList, setUwbSettingsList] = useState([])
  const [editUwbSettingsForm, setEditUwbSettingsForm] = useState( {
    name: "",
  })
  const [editUwbSettingsId, setEditUwbSettingsId] = useState(null)
  const [baseURL] = useState('/api/settings/uwb/')
  const [nextURL, setNextURL] = useState(null)
  const [previousURL, setPreviousURL] = useState(null)
  var rexPage = new RegExp('\\?page\=\\d{1,}')


  let api = useFetch()

  useEffect(() => {
    getUwbSettingsList();
  }, []);

  let getUwbSettingsList = async(url = baseURL) => {
    let {response, data} = await api(url)

    if (response.status === 200) {
      if(data.next) {
          let nextPage = data.next.match(rexPage)
          setNextURL(baseURL + nextPage)
      } else {
          setNextURL(null)
      }
      if(data.previous) {
          if(rexPage.test(data.previous)) {
              let previousPage = data.previous.match(rexPage)
              setPreviousURL(baseURL + previousPage)

          } else {
              setPreviousURL(baseURL)
          }
      } else {
          setPreviousURL(null)
      }
      setdistanceMeasurementsList(data.results)
    }
  }

  let nextPage = () => {
    getDistanceMeasurements(nextURL)
  }

  let previousPage = () => {
    getDistanceMeasurements(previousURL)
  }

  let sendUwbSettings = async(editedUwbSetting) => {
    console.log(editUwbSettingsForm)
    let {response, data} = await api('/api/settings/uwb/' + editUwbSettingsForm.id + '/', 'PUT', JSON.stringify(editedUwbSetting))

    if (response.status === 200) {
      let newUwbSettingsList = [...uwbSettingsList]

      const index = uwbSettingsList.findIndex((editedUwbSetting) => editedUwbSetting.id === editUwbSettingsId);

      newUwbSettingsList[index] = data
      setUwbSettingsList(newUwbSettingsList)
      setEditUwbSettingsId(null)
    }

  }

  let deleteUwbSetting = async(settingId) => {
    let {response, data} = await api('/api/settings/uwb/' + settingId + '/', 'DELETE')
    console.log(response.status)

    if (response.status === 204) {
      getUwbSettingsList()
    }
  }

  let handleEditFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value; 
    console.log("Test")
    const newFormData = { ...editUwbSettingsForm}
    newFormData[fieldName] = fieldValue

    setEditUwbSettingsForm(newFormData)
  }

  let handleEditFormSubmit = (event) => {
    event.preventDefault()

    const editedUwbSetting = {
      'id': editUwbSettingsForm.id,
      'name': editUwbSettingsForm.name,
      'owner': editUwbSettingsForm.owner,
      'channel_num': editUwbSettingsForm.channel_num,
      'premable_length_tx': editUwbSettingsForm.premable_length_tx,
      'preamble_chunk_size': editUwbSettingsForm.preamble_chunk_size,
      'tx_preamble_code': editUwbSettingsForm.tx_preamble_code,
      'rx_preamble_code': editUwbSettingsForm.rx_preamble_code,
      'sfd_mode': editUwbSettingsForm.sfd_mode,
      'data_rate': editUwbSettingsForm.data_rate,
      'phy_header_mode': editUwbSettingsForm.phy_header_mode,
      'phy_rate': editUwbSettingsForm.phy_rate,
      'pulse_rep_freq': editUwbSettingsForm.pulse_rep_freq,
      'sfd_timeout': editUwbSettingsForm.sfd_timeout, 
      'sts_mode': editUwbSettingsForm.sts_mode,
      'sts_length': editUwbSettingsForm.sts_length,
      'pdoa_mode': editUwbSettingsForm.pdoa_mode

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
    <>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table-auto max-w-full ">
          <thead className="bg-white border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Owner
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Channel Nummer
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Preamble Länge TX
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Preamble Chunk Size
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                TX Preamble Code
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                RX Preamble Code
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SFD Mode
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Data Rate
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PHY Header Mode
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Pulse Rep Frequenz
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SFD Timeout
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                STS Mode
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                STS Length
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                PDoA Mode
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              </th>
            </tr>
          </thead>
          <tbody>
            {uwbSettingsList && uwbSettingsList.map((item) => (
              <>
                  { editUwbSettingsId === item.id ? (
                    <EditableRow 
                      editUwbSettingsForm={editUwbSettingsForm}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    /> 
                  ):( 
                    <ReadOnlyRow 
                      item={item} 
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
              </>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
}
