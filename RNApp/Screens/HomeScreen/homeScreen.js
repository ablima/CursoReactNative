import React from 'react';
import {View, Image} from 'react-native';

import ImageCard from './../../Components/ImageCard/imageCard';
import RoundCard from './../../Components/RoundCard/roundCard';

import Swiper from 'react-native-swiper';
import ScrollContainer from './../../Components/ScrollContainer/scrollContainer';

import Image1 from './../../Assets/images/bloodborne.jpg';
import Image2 from './../../Assets/images/sekiro.jpg';
import Image3 from './../../Assets/images/darkSouls.jpeg';

class HomeScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            users: []
        }

        this.getUsers = this.getUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                users: responseJson.data
            });
        })
        .catch(error => {
            console.log('error get users - ' + error);
        })
    }

    renderUsers() {
        return this.state.users.map(user => {
            let avatar = {uri: user.avatar};            
            let username = user.first_name + ' ' + user.last_name;

            return (
                <ImageCard image={avatar} text={username} />
            );
        })
    }

    renderImages(images){
        return images.map(image => (
            <Image source={image} style={{width: "100%", height: "100%"}} />
        ));
    }

    render() {

        let acaiImg = {uri:'https://static-images.ifood.com.br/image/upload/f_auto,t_low/discoveries/19C1-acai.jpg'};
        let pasteisImg = {uri:'https://static-images.ifood.com.br/image/upload/f_auto,t_low/discoveries/19C1-pasteis.jpg'};
        let pudimImg = {uri:'https://static-images.ifood.com.br/image/upload/f_auto,t_low/discoveries/19C1-doces-e-bolos.jpg'};

        let data = [Image1, Image2, Image3];

        return (
            <View>
                <Swiper autoplay={true} showsPagination={false} style={{height: 200}}>
                    {this.renderImages(data)}
                </Swiper>

                <ScrollContainer horizontal={true} title="Comidas">
                    <ImageCard text="Açaí" image={acaiImg} />
                    <ImageCard text="Pasteis" image={pasteisImg} />
                    <ImageCard text="Pudim" image={pudimImg} />
                    <ImageCard text="Açaí" image={acaiImg} />
                    <ImageCard text="Pasteis" image={pasteisImg} />
                </ScrollContainer>

                <ScrollContainer horizontal={true} title="Jogos">
                    <RoundCard text="Olá" image={Image1} />
                    <RoundCard text="Olá 1" image={Image2} />
                    <RoundCard text="Olá 2" image={Image3} />
                    <RoundCard text="Olá 3" image={Image1} />
                </ScrollContainer>

                <ScrollContainer title="Usuários">
                    {this.renderUsers()}
                </ScrollContainer>
            </View>
        );
    }

}

export default HomeScreen;