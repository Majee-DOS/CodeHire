import React, { useState } from "react";
import { postJobs } from "../api.service";
//add post functionality with search buttons
import './SearchForm.css';

function BooleanInputs({ values, onAdd, onChange, onDelete }) {
    return (
        <>
            <button className="searchFormButton" onClick={onAdd}>Add</button>
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

    // const handleSearchAnd = () => {
    //     //console.log(valAdd);
    //     //console.log(`"${valAdd[0]}" AND "${valAdd[1]}"`);
    //     let searchAndOnly = "";
    //     for (let i = 0; i < valAnd.length; i++) {
    //         searchAndOnly += `"${valAnd[i]}" AND `;
    //     }
    //     console.log(searchAnd);
    //     //return searchAnd;
    //     setSearchAnd(searchAndOnly);
    // };

    // const handleSearchAnd = () => {
    //     const mergedArr = [].concat(...valAnd);
    //     const searchAndOnly = mergedArr.map((data) => `"${data}" AND `).join("");
    //     console.log("temporary mapped variable searchAndOnly = " + searchAndOnly);
    //     setSearchAnd(searchAndOnly);
    //     console.log("useState variable searchAnd = " , searchAnd);
    //     console.log("JSON Stringify useState variable searchAnd = " + JSON.stringify(searchAnd));

    //     let newSearchAnd = {
    //         searchString: searchAndOnly
    //     }
    //     console.log("new Object variable newSearchAnd.searchString = " + newSearchAnd.searchString);
    //     console.log("JSON Stringify newSearchAnd Object that will be passed to POST request = " + JSON.stringify(newSearchAnd));
    //     postJobs(newSearchAnd);
    // }

    const handleSearchAnd = () => {
        const mergedArr = [].concat(...valAnd);
        const searchAndOnly = mergedArr.map((data) => `"${data}" AND `).join("");
        let newSearchAnd = {
            searchString: searchAndOnly
        }
        postJobs(newSearchAnd);
    }

    // const handleQuickSearch = () => {
    //     const newQuickSearch = {
    //         searchString: quickVal
    //     }
    //     postJobs(newQuickSearch);
    // }

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


    // const handleSearchOr = () => {
    //     //console.log(valAdd);
    //     //console.log(`"${valAdd[0]}" AND "${valAdd[1]}"`);
    //     let searchOrOnly = "";
    //     for (let i = 0; i < valOr.length; i++) {
    //         searchOrOnly += `"${valOr[i]}" OR `;
    //     }
    //     console.log(searchOr);
    //     //return searchAnd;
    //     setSearchOr(searchOrOnly);
    // };

    const handleSearchOr = () => {
        const mergedArr = [].concat(...valOr);
        const searchOrOnly = mergedArr.map((data) => `"${data}" OR `).join("");
        let newSearchOr = {
            searchString: searchOrOnly
        }
        postJobs(newSearchOr);
    }


    const handleSearchAll = () => {
        const mergedArr = [].concat(...valAnd);
        const mergedArr2 = [].concat(...valOr);
        const searchAll = mergedArr.map((data) => `"${data}" AND `).join("") + mergedArr2.map((data) => `"${data}" OR `).join("");
        let newSearchAll = {
            searchString: searchAll
        }
        postJobs(newSearchAll);
    }

    return (
        // <div className="searchFormDiv">
        //     <div>
        //         <h1>AND Boolean</h1>
        //         <BooleanInputs
        //             values={valAnd}
        //             onAdd={handleAddAnd}
        //             onChange={handleChangeAnd}
        //             onDelete={handleDeleteAnd}
        //         />
        //         <button onClick={handleSearchAnd}>Search Only <strong>AND</strong> operations</button>
        //     </div>
        //     <div>
        //         <h1>OR Boolean</h1>
        //         <BooleanInputs
        //             values={valOr}
        //             onAdd={handleAddOr}
        //             onChange={handleChangeOr}
        //             onDelete={handleDeleteOr}
        //         />
        //         <button onClick={handleSearchOr}>Search Only <strong>OR</strong> operations</button>
        //     </div>
        //     <button onClick={handleSearchAll}>Search Both operations</button>
        // </div>
        <div className="searchFormContainer">
            <div className="searchFormSection">
                <h1 className="searchFormHeader">AND Boolean</h1>
                <BooleanInputs
                    values={valAnd}
                    onAdd={handleAddAnd}
                    onChange={handleChangeAnd}
                    onDelete={handleDeleteAnd}
                />
                <button className="searchFormButton" onClick={handleSearchAnd}>
                    Search Only AND Operations
                </button>
            </div>
            <div className="searchFormSection">
                <h1 className="searchFormHeader">OR Boolean</h1>
                <BooleanInputs
                    values={valOr}
                    onAdd={handleAddOr}
                    onChange={handleChangeOr}
                    onDelete={handleDeleteOr}
                />
                <button className="searchFormButton" onClick={handleSearchOr}>
                    Search Only OR Operations
                </button>
            </div>
            <div className="searchFormSection">
                <button className="searchFormButton" onClick={handleSearchAll}>
                    Search Both Operations
                </button>
            </div>
        </div>
    );
}

export default SearchForm;
