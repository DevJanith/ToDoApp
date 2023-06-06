import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export interface ToDoProps {
    done: boolean;
    id: string;
    title: string;
    tags: string
}

const renderTodoItem = ({ item }: { item: ToDoProps }) => {

    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
        updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
        deleteDoc(ref);
    };

    
    let tagsArray: any[] = []

    // Convert tags string to an array
    if (item.tags) {
        tagsArray = item.tags.split(',');
    }

    return (
        <TouchableOpacity
            style={[styles.todoItem, item.done && styles.todoItemDone]}
            onPress={() => toggleDone()}
        >
            {item.done ? (
                <Ionicons
                    name="checkmark-done-circle"
                    size={24}
                    color="green"
                    style={styles.icon}
                />
            ) : (
                <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="gray"
                    style={styles.icon}
                />
            )}
            <Text style={styles.todoTitle}>{item.title}</Text>
            <View style={styles.tagsContainer}>
                {tagsArray.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Ionicons name="pricetag" size={16} color="gray" style={styles.tagIcon} />
                        <Text style={styles.tagText}>{tag.trim()}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => deleteItem()}>
                <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export function List_V2() {
    const [todos, setTodos] = useState<ToDoProps[]>([]);
    const [todo, setTodo] = useState<string>("");
    const [tags, setTags] = useState<string>("")

    const addToDo = async () => {  
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
                done: false,
                title: todo,
                tags: tags
            })

            console.log('Document written with ID: ', docRef.id);

            setTodo(""); // Clearing the input field after adding a todo
            setTags(""); // Clearing the input field after adding a todo
            Keyboard.dismiss(); // Closing the keyboard
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }; 

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setTodos(todos);
            }
        });

        // // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add New ToDo"
                    onChangeText={(text: string) => {
                        setTodo(text);
                    }}
                    value={todo}
                />
            </View>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Add Todo Tags"
                    onChangeText={(text: string) => {
                        setTags(text);
                    }}
                    value={tags}
                />
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.addButton} onPress={addToDo}>
                    <Text style={styles.buttonText}>Add ToDo</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.todoList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: "blue",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center", // Add this line
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    todoList: {
        flexGrow: 1,
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    todoItemDone: {
        backgroundColor: "#f2f2f2",
    },
    todoTitle: {
        flex: 2,
        marginLeft: 10,
    },
    todoTags: {
        flex: 1,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 5,
        marginBottom: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
    },
    tagIcon: {
        marginRight: 2,
    },
    tagText: {
        fontSize: 12,
        color: "gray",
    },

});
