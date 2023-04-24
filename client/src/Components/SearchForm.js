// import React, { useState } from "react";
// function SearchForm() {
//     const [valAdd, setValAdd] = useState([]);
//     const [valOr, setValOr] = useState([]);

//     const handleAdd = () => {
//         const addInput = [...valAdd, []]
//         setValAdd(addInput)
//     }
//     const handleChange = (onChangeValue, i) => {
//         const inputdata = [...valAdd]
//         inputdata[i] = onChangeValue.target.value;
//         setValAdd(inputdata)
//     }
//     const handleDelete = (i) => {
//         const deletInput = [...valAdd]
//         deletInput.splice(i, 1)
//         setValAdd(deletInput)
//     }

//     const handleAddOr = () => {
//         const addInput = [...valOr, []]
//         setValOr(addInput)
//     }
//     const handleChangeOr = (onChangeValue, i) => {
//         const inputdata = [...valOr]
//         inputdata[i] = onChangeValue.target.value;
//         setValOr(inputdata)
//     }
//     const handleDeleteOr = (i) => {
//         const deletInput = [...valOr]
//         deletInput.splice(i, 1)
//         setValOr(deletInput)
//     }

//     const handleSearch = () => {
//         console.log(valAdd)
//         console.log(`"` + valAdd[0] + `"` + ` "` + valAdd[1] + `"`)
//     }

//     return (
//         <div>
//             <div>
//                 <h1>AND Boolean</h1>
//                 <button onClick={() => handleAdd()}>Add</button>
//                 {valAdd.map((data, i) => {

//                     return (
//                         <div>
//                             <input value={data} onChange={e => handleChange(e, i)} />
//                             <button onClick={() => handleDelete(i)}>x</button>
//                         </div>
//                     )
//                 })}
//                 <button onClick={handleSearch}>Search Only <strong>AND</strong> operations</button>
//             </div>
//             <div>
//                 <h1>OR Boolean</h1>
//                 <button onClick={() => handleAddOr()}>Add</button>
//                 {valOr.map((data, i) => {

//                     return (
//                         <div>
//                             <input value={data} onChange={e => handleChangeOr(e, i)} />
//                             <button onClick={() => handleDeleteOr(i)}>x</button>
//                         </div>
//                     )
//                 })}
//                 <button onClick={handleSearch}>Search Only <strong>OR</strong> operations</button>
//             </div>
//             <button>Search <strong>Both</strong> operations</button>
//         </div>
//     )
// }
// export default SearchForm;


import React, { useState } from "react";

function BooleanInputs({ values, onAdd, onChange, onDelete }) {
    return (
        <>
            <button onClick={onAdd}>Add</button>
            {values.map((data, i) => (
                <div key={i}>
                    <input value={data} onChange={(e) => onChange(e, i)} />
                    <button onClick={() => onDelete(i)}>x</button>
                </div>
            ))}
        </>
    );
}

function SearchForm() {
    const [valAnd, setValAnd] = useState([]);
    const [searchAnd, setSearchAnd] = useState("");
    const [valOr, setValOr] = useState([]);
    const [searchOr, setSearchOr] = useState("");

    const handleAddAnd = () => {
        const addInput = [...valAnd, []];
        setValAnd(addInput);
    };
    const handleChangeAnd = (onChangeValue, i) => {
        const inputdata = [...valAnd];
        inputdata[i] = onChangeValue.target.value;
        setValAnd(inputdata);
    };
    const handleDeleteAnd = (i) => {
        const deletInput = [...valAnd];
        deletInput.splice(i, 1);
        setValAnd(deletInput);
    };

    const handleSearchAnd = () => {
        //console.log(valAdd);
        //console.log(`"${valAdd[0]}" AND "${valAdd[1]}"`);
        let searchAndOnly = "";
        for (let i = 0; i < valAnd.length; i++) {
            searchAndOnly += `"${valAnd[i]}" AND `;
        }
        console.log(searchAnd);
        //return searchAnd;
        setSearchAnd(searchAndOnly);
    };

    const handleAddOr = () => {
        const addInput = [...valOr, []];
        setValOr(addInput);
    };
    const handleChangeOr = (onChangeValue, i) => {
        const inputdata = [...valOr];
        inputdata[i] = onChangeValue.target.value;
        setValOr(inputdata);
    };
    const handleDeleteOr = (i) => {
        const deletInput = [...valOr];
        deletInput.splice(i, 1);
        setValOr(deletInput);
    };

    //   const handleSearchOr = () => {
    //     console.log(valOr);
    //     console.log(`"${valOr[0]}" "${valOr[1]}"`);
    //   }


    const handleSearchOr = () => {
        //console.log(valAdd);
        //console.log(`"${valAdd[0]}" AND "${valAdd[1]}"`);
        let searchOrOnly = "";
        for (let i = 0; i < valOr.length; i++) {
            searchOrOnly += `"${valOr[i]}" OR `;
        }
        console.log(searchOr);
        //return searchAnd;
        setSearchOr(searchOrOnly);
    };

    const handleSearchAll = () => {
        console.log(searchAnd + searchOr);
    }

    return (
        <div>
            <div>
                <h1>AND Boolean</h1>
                <BooleanInputs
                    values={valAnd}
                    onAdd={handleAddAnd}
                    onChange={handleChangeAnd}
                    onDelete={handleDeleteAnd}
                />
                <button onClick={handleSearchAnd}>Search Only <strong>AND</strong> operations</button>
            </div>
            <div>
                <h1>OR Boolean</h1>
                <BooleanInputs
                    values={valOr}
                    onAdd={handleAddOr}
                    onChange={handleChangeOr}
                    onDelete={handleDeleteOr}
                />
                <button onClick={handleSearchOr}>Search Only <strong>OR</strong> operations</button>
            </div>
            <button onClick={handleSearchAll}>Search Both operations</button>
        </div>
    );
}

export default SearchForm;
