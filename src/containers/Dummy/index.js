import React, { useState } from "react";

import DraftNegotiation from "../../components/Modal/DraftNegotiation"

const Dummy = (props) => {
    const [popUp, setPopUp] = useState(true);
    const negotiationData = [
        [
            {
                item: "Pemilik/PT",
                rentalPrice: "Rp 20.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            },
            {
                item: "PT. CIMB Niaga",
                rentalPrice: "Rp 16.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            }
        ],
        [
            {
                item: "Pemilik/PT",
                rentalPrice: "Rp 20.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            },
            {
                item: "PT. CIMB Niaga",
                rentalPrice: "Rp 16.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            }
        ],
        [
            {
                item: "Pemilik/PT",
                rentalPrice: "Rp 20.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            },
            {
                item: "PT. CIMB Niaga",
                rentalPrice: "Rp 16.000.000",
                securityDeposit: "Rp 5.000.000",
                electricity: "Rp 2.000.000",
                antennaAreaVsat: "Rp 1.000.000",
                landNeonSign: "Rp 1.000.000"
            }
        ]
    ]

    return (
        <div className="rootContainer">
            <DraftNegotiation
                visible={popUp}
                referenceNumber={"No. /SRT/ATM-BG/VIII/2020"}
                dateAndPlace={"Tangerang, 18 Agustus 2020"}
                userName={"[Username]"}
                subjectLetter={"Negosiasi Harga Sewa Lokasi Ruanga ATM"}
                letterNumber={"[02918291]"}
                letterDate={"[18 Agustus 2020]"}
                location={"[Lokasi]"}
                data={negotiationData}
                leasePeriod={"[5 tahun]"}
                wide={"[4]"}
                clickCancel={setPopUp}
                clickSend={setPopUp}
            />
        </div>
    )
}

export default Dummy

