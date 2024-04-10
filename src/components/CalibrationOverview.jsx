/* eslint-disable operator-linebreak */
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import StyleContex from "../context/StyleContex"
import CalibrationTable from "./Tables/CalibrationTable"

export default function CalibrationOverview() {
    const [calibrationID, setCalibrationID] = useState(0)
    const { containerStyle, headerStyle, buttonStyle } = useContext(StyleContex)

    const handleSelectID = (id) => {
        setCalibrationID(id)
    }
    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>

                <h3 className={headerStyle.h3}>
                    Devices
                </h3>
                <div className={containerStyle.leftComponent}>
                    <Link to="/calibration/start">
                        <button
                            type="button"
                            className={buttonStyle.activ}
                        >
                            Start Calibration
                        </button>
                    </Link>
                </div>
                <div className={containerStyle.leftComponent}>
                    {calibrationID > 0 ? (
                        <Link to={`/calibration/copie/${calibrationID}`}>
                            <button
                                type="button"
                                className={buttonStyle.activ}
                            >
                                Copie Calibration
                            </button>
                        </Link>


                    ) : (
                        <div>
                            <button
                                type="button"
                                className={buttonStyle.inactiv}
                                inactiv
                            >
                                Copie Calibration
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={containerStyle.right}>
                <CalibrationTable handleSelectID={handleSelectID} />
            </div>
        </div >
    )
}