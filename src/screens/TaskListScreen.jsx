import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setTasks } from '../redux/tasksSlice';
import { getAllTasks, initDatabase } from '../database/database';

const TaskListScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.tasks);

    useEffect(() => {
        const loadTasks = async () => {
            await initDatabase();
            const tasksFromDB = await getAllTasks();
            dispatch(setTasks(tasksFromDB));
        };
        loadTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.taskItem}
            onPress={() => navigation.navigate('TaskForm', { task: item })}
        >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>{item.updatedAt}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No tasks yet. Add one!</Text>}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('TaskForm')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    taskItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDate: {
        fontSize: 14,
        color: '#666',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        fontSize: 24,
        color: 'white',
    },
});

export default TaskListScreen;