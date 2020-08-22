import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

function Register () {

    const [fieldType, setFieldType] = useState('password');

    function changeFieldType() {
        if( fieldType === 'password') {
            setFieldType('text');
        } else {
            setFieldType('password');
        }
    }

    return (  
            <main>
                <form className="register-form">
                    <div className="back-to-login">
                        <Link to="/">
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                    </div>
                    <fieldset>
                        <p>Cadastro</p>
                        <h2>Preencha os dados abaixo <br/> para comecar.</h2>
                        <div className="input-container">
                                 <Input 
                                    name="name"
                                    label=""
                                    placeholder="Nome"
                                    required
                                />  
                                 <Input 
                                    name="surname"
                                    label=""
                                    placeholder="Sobrenome"
                                    required
                                /> 
                                <Input 
                                    name="mail"
                                    label=""
                                    placeholder="E-mail"
                                    required
                                />                                 
                                <Input 
                                    className="password-input"
                                    name="password"
                                    label=""
                                    placeholder="Senha"
                                    type={fieldType}
                                    required
                                />
                                <div onClick={changeFieldType}>
                                    {
                                        fieldType === 'password'
                                        ?
                                        <Visibility 
                                            fontSize="large"      
                                        />
                                        :
                                        <VisibilityOff
                                            fontSize="large"
                                        />
                                    }
                                </div>
                        </div>

                        <button type="submit">
                            Concluir Cadastro
                        </button>

                    </fieldset>
                </form>
            </main>
      
 )
}

export default Register;