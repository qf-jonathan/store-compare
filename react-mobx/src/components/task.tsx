import { useState } from "react";
import { FieldEdit } from "./field-edit";
import { EditIcon, TrashIcon } from "./icons";
import { observer } from "mobx-react-lite";
import { Task as TaskItem } from "../bussiness/task-list-store";

type TaskProps = {
  task: TaskItem;
};

const _Task = ({task}: TaskProps) => {
  const { toggleIsDone, remove, setDescription } = task;
  const [ editMode, setEditMode ] = useState(false);

  const handleUpdateTask = (description: string) => {
    setDescription(description);
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

export const Task = observer(_Task);
