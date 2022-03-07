import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/select.css";

export function Select() {
    const [data, setData] = useState([]);
    let rows = []
    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(response => setData(response.data))
    }, []);

    console.log(data);
    // let data = fetch('http://localhost:8000/')
    //     .then(() => console.log('read data'))
    //     .catch(err => {
    //         console.error(err);
    //     });
    // console.log(data);
    // show data from database
    return (
        <div>
            <h1>Select</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>User Type</th>
                        <th>Password Hash</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((element) => {
                            return (
                                <tr className="row">
                                    <td className="col">{element[0]}</td>
                                    <td className="col">{element[1]}</td>
                                    <td className="col">{element[2]}</td>
                                    <td className="col">{element[3]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {/* {data} */}
        </div>
    )
}
