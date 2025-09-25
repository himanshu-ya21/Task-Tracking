import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbPromise = SQLite.openDatabase({ name: 'tasks.db', location: 'default' });

let db = null;

const initDB = async () => {
    if (!db) {
        try {
            db = await dbPromise;
        } catch (error) {
            console.error('Error opening database:', error);
        }
    }
    return db;
};

export const initDatabase = async () => {
    try {
        const database = await initDB();
        await database.transaction(async (tx) => {
            await tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT, updatedAt TEXT);'
            );
        });
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export const insertTask = async (task) => {
    try {
        const database = await initDB();
        await database.transaction(async (tx) => {
            await tx.executeSql(
                'INSERT INTO tasks (id, title, description, updatedAt) VALUES (?, ?, ?, ?);',
                [task.id, task.title, task.description || '', task.updatedAt]
            );
        });
    } catch (error) {
        console.error('Error inserting task:', error);
    }
};

export const updateTask = async (task) => {
    try {
        const database = await initDB();
        await database.transaction(async (tx) => {
            await tx.executeSql(
                'UPDATE tasks SET title = ?, description = ?, updatedAt = ? WHERE id = ?;',
                [task.title, task.description || '', task.updatedAt, task.id]
            );
        });
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const deleteTask = async (id) => {
    try {
        const database = await initDB();
        await database.transaction(async (tx) => {
            await tx.executeSql('DELETE FROM tasks WHERE id = ?;', [id]);
        });
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const getAllTasks = async () => {
    try {
        const database = await initDB();
        const tasks = [];
        await database.transaction(async (tx) => {
            const [results] = await tx.executeSql('SELECT * FROM tasks ORDER BY updatedAt DESC;');
            for (let i = 0; i < results.rows.length; i++) {
                const item = results.rows.item(i);
                tasks.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    updatedAt: item.updatedAt,
                });
            }
        });
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        return [];
    }
};