import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'

function Favorites() {

    const [favorites, setFavorites] = useState([])

    useFocusEffect(() => {
        loadFavorites()
    })

    function loadFavorites() {
        AsyncStorage
            .getItem('favorites')
            .then((response) => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response)

                    setFavorites(favoritedTeachers)
                }
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <PageHeader title="Meus proffys favoritos" />

                <ScrollView
                    style={styles.teacherList}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16
                    }}
                >
                    {favorites.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
                    })}
                </ScrollView>

            </View>
        </View>
    )
}

export default Favorites