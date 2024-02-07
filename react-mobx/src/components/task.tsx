import { useState } from "react";
import { TaskType } from "../bussiness/types";
import { FieldEdit } from "./field-edit";
import { EditIcon, TrashIcon } from "./icons";
import { observer } from "mobx-react-lite";
import { taskListStore } from "../bussiness/task-list-store";

type TaskProps = {
  task: TaskType;
}

const _Task = ({task}: TaskProps) => {
  const { toggleTaskDone, removeTask, updateTask } = taskListStore;
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

export const Task = observer(_Task);
