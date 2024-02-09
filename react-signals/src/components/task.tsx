import { useState } from "react";
import { TaskType } from "../bussiness/types";
import { FieldEdit } from "./field-edit";
import { EditIcon, TrashIcon } from "./icons";
import {
  toggleTaskDone, updateTask, removeTask
} from "../bussiness/task-list-store";

type TaskProps = {
  task: TaskType;
}

export const Task = ({task}: TaskProps) => {
  const [ editMode, setEditMode ] = useState(false);

  const handleUpdateTask = (description: string) => {
    updateTask(task.uuid, description);
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
          onClick={() => toggleTaskDone(task.uuid)}
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
        onClick={() => removeTask(task.uuid)}
        className="alert"
        aria-label="remove"
      >
        <TrashIcon />
      </button>
    </li>
  );
};
