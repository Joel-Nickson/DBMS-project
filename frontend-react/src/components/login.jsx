import { useEffect, useState } from 'react';
import '../styles/login.css';
import axios from 'axios';

export function Login(props) {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('Patient');

    const changeName = (event) => { setName(event.target.value); };
    const changeMail = (event) => { setMail(event.target.value); };
    const changePass = (event) => { setPass(event.target.value); };
    const changeUser = (event) => { setUser(event.target.value); console.log(event.target.value); };

    const transferValue = (event) => {
        event.preventDefault();
        const val = {
            name: name,
            mail: mail,
            pass: pass,
            userType: user.slice(0, 3)
        };
        console.log(val, user);
        axios.post('http://localhost:8000/p', val)
            .then(() => console.log('user Created'))
            .catch(err => {
                console.error(err);
            });
        // clearState();
    };

    // const clearState = () => {
    //     setName('');
    //     setMail('');
    //     setPass('');
    // };

    console.log(name, mail, pass, user);
    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className="login-form">
                    <input type="text" placeholder="username" onChange={changeName} />
                    <input type="email" placeholder="user@example.com" onChange={changeMail} />
                    <input type="password" placeholder="password" onChange={changePass} />

                    <div className="row cf">
                        <div className="six col">
                            <input type="radio" name="r" value="Patient" id="r1" checked onClick={(event) => changeUser(event)} />
                            <label htmlFor="r1">
                                <h4>Patient</h4>
                            </label>
                        </div>
                        <div className="six col">
                            <input type="radio" name="r" value="Doctor" id="r2" onClick={(event) => changeUser(event)} /><label htmlFor="r2">
                                <h4>Doctor</h4>
                            </label>
                        </div>
                    </div>
                    <button onClick={transferValue}>login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a></p>
                </form>
            </div>
        </div>
    )
}
