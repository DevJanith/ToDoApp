import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export interface ToDoProps {
    done: boolean;
    id: string;
    title: string;
    tags: string
}

export function List_V1() {
    const [todos, setTodos] = useState<ToDoProps[]>([]);
    const [todo, setTodo] = useState<string>("");
    const [tags, setTags] = useState<string>("")

    const addToDo = async () => {
        try {
            const item: ToDoProps = {
                done: false,
                id: Math.random().toString(),
                title: todo,
                tags: tags
            };

            setTodos((prev) => {
                return [...prev, item];
            });
            setTodo(""); // Clearing the input field after adding a todo
            setTags(""); // Clearing the input field after adding a todo
            Keyboard.dismiss(); // Closing the keyboard
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDone = (id: string) => {
        setTodos((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, done: !item.done };
                }
                return item;
            })
        );
    };

    const deleteItem = (id: string) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    };

    const renderTodoItem = ({ item }: { item: ToDoProps }) => {
        // Convert tags string to an array
        const tagsArray = item.tags.split(',');

        return (
            <TouchableOpacity
                style={[styles.todoItem, item.done && styles.todoItemDone]}
                onPress={() => toggleDone(item.id)}
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
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };



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
