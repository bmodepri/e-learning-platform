import React, { useState } from 'react';
import Input from '../../components/Input';
import PurpleHeart from '../../assets/images/icons/purple-heart.svg';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './styles.css';

function Login () {

    const [password, setPassword] = useState('password');

    function handlePasswordField() {
        if( password === 'password') {
            setPassword('text');
        } else {
            setPassword('password');
        }
    }

    return (  
            <main>
                <form className="login-form">
                    <fieldset>
                        <p>Fazer Login</p>
                        <div className="input-container">
                                <Input 
                                    name="mail"
                                    label=""
                                    placeholder="E-mail"
                                    required
                                />                                
                                <Input 
                                    name="password"
                                    label=""
                                    placeholder="Senha"
                                    type={password}
                                    required
                                />
                                <div onClick={handlePasswordField}>
                                    {
                                        password === 'password'
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
                    </fieldset>
                        
                        <div className="options">
                            <input
                                name="rememberme"
                                type="checkbox"
                                checked={true}
                                value="Lembrar-me"
                                
                                // onChange={this.handleInputChange} 
                            />
                            <label htmlFor="rememberme">Lembrar-me</label>
                            <a href="/">Esqueci minha senha</a>
                        </div>

                        <button type="submit">
                            Entrar
                        </button>

                        

                        <div className="login-form-footer">
                            <div>
                                <p>Nao tem conta?</p>
                                <a href="/">Cadastre-se</a>
                            </div>
                            <div>
                                <label htmlFor="img">É de graca</label>
                                <img src={PurpleHeart} alt="purple-heart"/>
                            </div>
                        </div>
                        
                </form>
            </main>
      
 )
}

export default Login;