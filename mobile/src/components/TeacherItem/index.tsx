import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemsProps{
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemsProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleTogleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

            if (favorites) {
                favoritesArray = JSON.parse(favorites)
            }


        if(isFavorited) {
            
            const favoriteIndex = favoritesArray.findIndex((teacherItem : Teacher) => {
                return teacherItem.id = teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        }else {

            favoritesArray.push(teacher);

            setIsFavorited(true);
            
        }

        await AsyncStorage.setItem('favorite', JSON.stringify(favoritesArray));
        
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                /> 
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preco/hora {'   '} 
                    <Text style={styles.priceVAlue}>R$ {teacher.cost}</Text>
                </Text>
            </View>

            <View style={styles.buttonsContainer}>

                <RectButton 
                    onPress={handleTogleFavorite}
                    style={[
                        styles.favoriteButton, 
                        isFavorited ? styles.favorited : {},

                        ]}
                >
                    {isFavorited 
                        ? <Image source={unfavoriteIcon}/> 
                        : <Image source={heartOutlineIcon}/> 
                    }
                    
                </RectButton>

                <RectButton 
                    style={styles.contactButton}
                    onPress={handleLinkToWhatsapp}
                    >
                    <Image source={whatsappIcon}/>
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>

            </View>

        </View>
    )
}

export default TeacherItem;