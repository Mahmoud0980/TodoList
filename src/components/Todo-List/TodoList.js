import Todo from "../Todo/Todo"
import "./TodoList.css"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { TodoContext } from "../contexts/context";
import { useContext } from "react";
import { Flare } from "@mui/icons-material";
export default function TodoList() {
    const [displayedTodoType, setDisplayedTodoType] = useState("all");
    const { todo, setTodo } = useContext(TodoContext);
    const [titleInput, setTitleInput] = useState("");
    const isCompleted = todo.filter((t) => {
        return t.isCompleted;
    })
    const isNonCompleted = todo.filter((t) => {
        return !t.isCompleted;
    })
    let todoToRender = todo;
    if (displayedTodoType == "completed") {
        todoToRender = isCompleted
    } else if (displayedTodoType == "non-completed") {
        todoToRender = isNonCompleted
    } else {
        todoToRender = todo
    }
    function changeDisplayType(e) {
        setDisplayedTodoType(e.target.value);
    }

    const todos = todoToRender.map((todo) => {
        return (
            <Todo key={todo.id} todoList={todo} />
        )
    })

    function handleAddtitle() {
        if (titleInput == "") {
            alert("error")
        }
        else {
            const newTodo = {
                id: uuidv4(),
                title: titleInput,
                body: "",
                isCompleted: false
            }
            const newUpdatedTodo = [...todo, newTodo];
            localStorage.setItem("todos", JSON.stringify(newUpdatedTodo));
            setTodo(newUpdatedTodo);
            setTitleInput("");
        }
    }
    useEffect(() => {
        const storageTodo = JSON.parse(localStorage.getItem("todos"));
        setTodo(storageTodo);
    }, [])
    return (

        <div className="todo-lists" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <div className="todo-lists-title">
                مهامي
                <hr />
            </div>
            <div className="todo-lists-content">
                <ToggleButtonGroup
                    color="primary"
                    value={displayedTodoType}
                    exclusive
                    onChange={changeDisplayType}
                    aria-label="Platform"
                    style={{ direction: "ltr", display: "flex", justifyContent: "center" }}
                >

                    <ToggleButton value="completed">المنجزة</ToggleButton>
                    <ToggleButton value="non-completed">الغير منجزة </ToggleButton>
                    <ToggleButton value="all">الكل</ToggleButton>
                </ToggleButtonGroup>
                {/*Show Todo */}
                {todos}

            </div>
            <div className="todo-lists-action">
                <input type="text" className="txt-add" placeholder="عنوان المهمة" value={titleInput} onChange={(e) => { setTitleInput(e.target.value) }} />
                <button className="btn-add" onClick={() => { handleAddtitle(); }}>اضافة</button>
            </div>

        </div>

    )
}
