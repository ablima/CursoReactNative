import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

import styles from './formScreen.styles';

class FormScreen extends React.Component {

    constructor(props){
        super(props);

        this.User = t.struct({
            username: t.String,
            password: t.String,
            birthDate: t.Date,
            email: t.String,
            cpf: t.Number,
            terms: t.Boolean,
            gender: t.enums({
                'MALE': 'Masculino',
                'FEMALE': 'Feminino'
            })
        });

        this.options = {
            fields: {
                username: {
                    placeholder: "Nome do usuário"
                },
                password: {
                    error: "Password inválido"
                },
                birthDate: {
                    config: {
                        format: (date) => {

                            /*
                                Date

                                date.getDate()
                                date.getMonth() (0-11)
                                date.getFullYear()

                                date.getSeconds()
                                date.getMinutes()
                                date.getHours()
                            */

                            return date.toLocaleDateString();
                        },
                    },
                    mode: "date"
                }
            }
        }

        this.state = {
            options: this.options,
            value: {
                username: "default",
                gender: "MALE"
            }
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let values = this._form.getValue();
        console.info(values);
/*
        console.log
        console.info
        console.error
*/
        if(values){
            fetch('https://reqres.in/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": values.username,
                    "job": values.email
                }
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log('Resposta do POST');
                console.info(responseJson);

                //Lógica de Sucesso
            })
            .catch(error => {
                console.error(error);

                //Lógica do erro
            })
        }
    }

    onFormChange(values) {
        let error = false;

        let reTest = /(teste)/;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(values.username && !re.test(values.username)){
            error = true;
        }

        let options = t.update(this.state.options, {
            fields: {
                username: {
                    hasError: {'$set': error}
                }
            }
        });

        this.setState({
            options: options,
            value: values
        });
    }

    render() {

        console.info("FORM");
        console.info(this.props.user);

        return (
            <View>
                <Form ref={r => this._form = r}
                      options={this.state.options}
                      value={this.state.value}
                      onChange={this.onFormChange}
                      type={this.User} />

                <TouchableOpacity onPress={this.handleSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

export default FormScreen;