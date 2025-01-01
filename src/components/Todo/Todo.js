import "./Todo.css"
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TodoContext } from "../contexts/context";
import { useContext, useState } from "react";
import { Filter } from "@mui/icons-material";
export default function Todo({ todoList }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [updatedTodos, setupdatedTodos] = useState({ title: todoList.title, body: todoList.body });

    const { todo, setTodo } = useContext(TodoContext);
    function handleCheckClick() {
        const updateTodo = todo.map((t) => {
            if (t.id == todoList.id) {
                if (t.isCompleted == true) {
                    t.isCompleted = false;
                } else { t.isCompleted = true }
            }
            return t
        })
        localStorage.setItem("todos", JSON.stringify(updateTodo));
        setTodo(updateTodo);
    }
    function handleShowDialog() {
        setShowDeleteDialog(true)
    }
    function handleShowEditDialog() {
        setShowEditDialog(true)
    }
    function handleCloseEditDialog() {
        setShowEditDialog(false)
    }
    function handleCloseDialog() {
        setShowDeleteDialog(false)
    }
    function handleDeleteConfirm() {
        const updateTodo = todo.filter((t) => {
            // if (t.id == todoList.id) {
            //     return false;
            // }
            // else {
            //     return true;
            // }
            return t.id != todoList.id
        })
        localStorage.setItem("todos", JSON.stringify(updateTodo));
        setTodo(updateTodo);
    }
    function handleEditConfirm() {
        const updateTodos = todo.map((t) => {
            if (t.id == todoList.id) {
                return { ...t, title: updatedTodos.title, body: updatedTodos.body }
            } else {
                return t;
            }

        });

        setTodo(updateTodos);
        localStorage.setItem("todos", JSON.stringify(updateTodos));
        setShowEditDialog(false);
    }
    return (
        <>
            {/*Show Delete Dialog */}
            <Dialog
                style={{ direction: "rtl" }}
                open={showDeleteDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    حذف المهمة
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        هل انت متأكد من حذف المهمة
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>إلغاء</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
            {/*Show Delete Dialog */}
            {/*Show Edit Dialog*/}
            <Dialog
                style={{ direction: "rtl" }}
                open={showEditDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    تعديل المهمة
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Detail"
                        label="عنوان المهمة"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTodos.title}
                        onChange={(e) => {
                            setupdatedTodos({ ...updatedTodos, title: e.target.value })
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Detail"
                        label="تفاصيل المهمة"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTodos.body}
                        onChange={(e) => {
                            setupdatedTodos({ ...updatedTodos, body: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>إلغاء</Button>
                    <Button onClick={handleEditConfirm} autoFocus>
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>

            {/*Show Edit Dialog*/}
            <div className="todo-container">
                <div className="todo-content">
                    <h3>{updatedTodos.title}</h3>
                    <p>{updatedTodos.body}</p>
                </div>
                <div className="todo-action">
                    <button className={todoList.isCompleted ? "btn-completed" : "btn-done"} onClick={() => { handleCheckClick() }}>
                        <CheckIcon />
                    </button>
                    <button className="btn-edit" onClick={handleShowEditDialog}>
                        <EditIcon />
                    </button>
                    <button className="btn-delete" onClick={handleShowDialog}>
                        <DeleteIcon />
                    </button>
                </div>

            </div >
        </>
    )
}
