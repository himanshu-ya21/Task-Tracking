import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../redux/hooks';
import { addTask, updateTask, deleteTask } from '../redux/tasksSlice';
import { insertTask, updateTask as updateTaskDB, deleteTask as deleteTaskDB } from '../database/database';

const TaskFormScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useAppDispatch();
    const task = route.params?.task;

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    const handleSave = async () => {
        if (title.trim() === '') {
            Alert.alert('Error', 'Title is required');
            return;
        }

        const now = new Date().toISOString();
        const newTask = {
            id: task?.id || Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            updatedAt: now,
        };

        try {
            if (task) {
                await updateTaskDB(newTask);
                dispatch(updateTask(newTask));
            } else {
                await insertTask(newTask);
                dispatch(addTask(newTask));
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save task');
        }
    };

    const handleDelete = async () => {
        if (!task) return;

        Alert.alert('Delete Task', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteTaskDB(task.id);
                        dispatch(deleteTask(task.id));
                        navigation.goBack();
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete task');
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Task Description (optional)"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            {task && (
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TaskFormScreen;