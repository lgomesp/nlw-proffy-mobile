import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {

    const [isfiltersVisible, setIsfiltersVisible] = useState(false)

    const [favorites, setFavorites] = useState<number[]>([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])

    function loadFavorites() {
        AsyncStorage
            .getItem('favorites')
            .then((response) => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response)

                    const favoritedTeacherIDs = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id
                    })

                    setFavorites(favoritedTeacherIDs)
                }
            })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFiltersVisible() {
        setIsfiltersVisible(!isfiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setIsfiltersVisible(false)

        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="white" />
                    </BorderlessButton>
                )}
            >
                {isfiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholderTextColor="#c1bccc"
                            style={styles.input}
                            placeholder='Qual a matéria?'
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeekday(text)}
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder='Qual o dia?'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder='Qual horário?'
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default TeacherList