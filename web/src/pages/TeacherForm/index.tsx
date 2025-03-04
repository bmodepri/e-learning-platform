import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';



function TeacherForm() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setScheduleItems] = useState( [
        { week_day: 0, from: '', to: '' },
    ]);


    function addNewScheduleItem () {

        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    
    };

    function setScheduleItemValue (position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass (e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then((response) => {
            alert('Cadastro realizado com sucesso');
            history.push('/')
        }).catch(error => {
            alert(`Erro no cadastro: ${error}}`)
        });

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
        
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que voce quer dar aulas!" 
            description="O primeiro passo é preencher esse formulário de inscricao"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados</legend>

                    <Input 
                        name="name" 
                        label="Nome Completo" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}} 
                    />
                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar}
                        onChange={(e) => {setAvatar(e.target.value)}} 
                    />
                    <Input 
                        name="whatsapp" 
                        label="whatsapp"
                        value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}} 
                    />
                    <Textarea 
                        name="bio" 
                        label="bio"
                        value={bio}
                        onChange={(e) => {setBio(e.target.value)}} 
                    />

                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>

                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Ciencias', label: 'Ciencias'},
                            {value: 'Educacao Física', label: 'Educacao Física'},
                            {value: 'Potugues', label: 'Potugues'},
                            {value: 'Química', label: 'Química'},
                        ]} />

                    <Input 
                        name="cost" 
                        label="Custo da sua Hora por aula"
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}}    
                    />

                </fieldset>

                <fieldset>
                    <legend>Horarios disponíveis
                     <button type="button" onClick={addNewScheduleItem}>+ Novo Horario</button>
                    </legend>
                        {scheduleItems.map(( scheduleItem, index )=> {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda'},
                                            {value: '2', label: 'Terca'},
                                            {value: '3', label: 'Quarta'},
                                            {value: '4', label: 'Quinta'},
                                            {value: '5', label: 'Sexta'},
                                            {value: '6', label: 'Sabado'}
                                    ]} 
                                    />   
                                    <Input  
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input  
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados.
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>
                </form>
            </main>

        </div>
    )
}

export default TeacherForm;