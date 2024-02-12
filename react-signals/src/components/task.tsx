import { useState } from "react";
import { FieldEdit } from "./field-edit";
import { EditIcon, TrashIcon } from "./icons";
import { Task as TaskItem } from "../bussiness/task-list-store";

type TaskProps = {
  task: TaskItem;
}

export const Task = ({task}: TaskProps) => {
  const { setDescription, toggleIsDone, remove } = task;
  const [ editMode, setEditMode ] = useState(false);

  const handleUpdateTask = (description: string) => {
    setDescription(description);
    setEditMode(false);
  };

  return (
    <li className={task.isDone.value ? 'done': ''}>
      {editMode ? (
        <FieldEdit
          value={task.description.value}
          onSave={handleUpdateTask}
          onCancel={() => setEditMode(false)}
        />
      ): (
        <span
          onClick={() => toggleIsDone()}
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
        onClick={() => remove()}
        className="alert"
        aria-label="remove"
      >
        <TrashIcon />
      </button>
    </li>
  );
};
