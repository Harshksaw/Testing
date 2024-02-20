// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';

import axios from 'axios';
function Currency() {
 

    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
 

    useEffect(() => {
        Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);
 

    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])
 

    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }
 

    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
 
    return (
        <div className="App bg-gradient-to-r from-green-300 to-yellow-300 min-h-screen text-white mt-30 ml-40 rounded-md mr-40">
        <div className="heading text-center py-5">
            <h1 className="text-4xl font-bold">Currency converter</h1>
        </div>
        <div className="container mx-auto p-5">
            <div className="left mb-5">
                <h3 className="text-xl font-semibold mb-2">Amount</h3>
                <input type="text"
                    className="w-full p-2 rounded border border-white"
                    placeholder="Enter the amount"
                    onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="middle mb-5">
                <h3 className="text-xl font-semibold mb-2">From</h3>
                <Dropdown options={options}
                    onChange={(e) => { setFrom(e.value) }}
                    value={from} placeholder="From" />
            </div>
            <div className="switch mb-5 flex justify-center">
                <HiSwitchHorizontal size="30px"
                    onClick={() => { flip() }} />
            </div>
            <div className="right mb-5">
                <h3 className="text-xl font-semibold mb-2">To</h3>
                <Dropdown options={options}
                    onChange={(e) => { setTo(e.value) }}
                    value={to} placeholder="To" />
            </div>
        </div>
        <div className="result text-center py-5">
            <button className="px-4 py-2 rounded bg-white text-blue-500 font-semibold" onClick={() => { convert() }}>Convert</button>
            <h2 className="text-2xl font-semibold mt-5">Converted Amount:</h2>
            <p className="mt-2">{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
        </div>
    </div>
    );
}
 

export default Currency
