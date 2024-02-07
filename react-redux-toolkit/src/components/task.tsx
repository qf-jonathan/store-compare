import { useState } from "react";
import { TaskType } from "../bussiness/types";
import { FieldEdit } from "./field-edit";
import { EditIcon, TrashIcon } from "./icons";
import { useDispatch } from "react-redux";
import {
  removeTask, toggleTaskDone, updateTask
} from "../bussiness/task-list-reducer";

type TaskProps = {
  task: TaskType;
}

export const Task = ({task}: TaskProps) => {
  const dispatch = useDispatch();
  const [ editMode, setEditMode ] = useState(false);

  const handleUpdateTask = (description: string) => {
    dispatch(updateTask({uuid: task.uuid, description}));
    setEditMode(false);
  };

  return (
    <li className={task.isDone ? 'done': ''}>
      {editMode ? (
        <FieldEdit
          value={task.description}
          onSave={handleUpdateTask}
          onCancel={() => setEditMode(false)}
        />
      ): (
        <span
          onClick={() => dispatch(toggleTaskDone(task.uuid))}
        >
          {task.description}
        </span>
      )}
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="success"
          aria-label="edit"
        >
          <EditIcon />
        </button>
      )}
      <button
        onClick={() => dispatch(removeTask(task.uuid))}
        className="alert"
        aria-label="remove"
      >
        <TrashIcon />
      </button>
    </li>
  );
};
