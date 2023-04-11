import React from 'react';

export default function ProcessJson(props) {
    // console.log("component");
    console.log(props.json);
    
    let rows = []


    const excelDateToJSDate = (excelDate) => {
      var date = new Date(Math.round((excelDate - (25569)) * 86400 * 1000));
      // var converted_date = date.toISOString().split('T')[0];
      var dd = date.getDate();
      var mm = date.getMonth() + 1;

      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var converted_date = dd + "/" + mm + "/" + yyyy;
      return converted_date;
    }

    function createData(sn, name, gender, dob) {
      return {
        name: { vale: name, disable: false },
        gender: { value: gender, disable: false },
        dob: { value: excelDateToJSDate(dob), disable: false },
      };
    }

    for (let i = 0; i < props.json.length; i++) {
      rows.push(
        createData(
          i + 1,
          props.json[i].name,
          props.json[i].gender,
          props.json[i].dob
        )
      );
    }
    
    const updateDatabase = (row) => {
      console.log(row);
    };

    return (
      <div>
        {rows.map((row, index) => (
          <div>
            {updateDatabase(row)}
          </div>
        ))}
      </div>
    );
}