import React from "react";

const FindCountry = ({value, onChange}) => (
    <div>
        {console.log('Find')}
        find countries <input value={value} onChange={onChange}/>
    </div>
)

export default FindCountry
