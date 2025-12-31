import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const taskId = params.id;

  useEffect(() => {
    async function fetchTask() {
      if (!taskId) return;
      const fetchedTask = await getTask(taskId);

      if (fetchedTask.success) {
        setTask(fetchedTask.data);
      } else {
        console.error(fetchedTask.error);
      }
    }
    fetchTask().catch(console.error);
  }, [taskId]);

  return (
    <Page>
      <title>Task Detail | TSE Todos</title>
      {!isEditing ? (
        <div className={styles.body}>
          <p>
            <Link to="/">Back to home</Link>
          </p>
          <div className={styles.taskNameRow}>
            <span className={styles.taskTitle}>{task?.title ?? "This task doesn't exist!"}</span>
            <div className={styles.stretch} />
            {task && <Button kind="primary" label="Edit Task" onClick={() => setIsEditing(true)} />}
          </div>
          {task && <p>{task.description}</p>}
          {task && (
            <div className={styles.assigneeRow}>
              <strong>Assignee</strong>
              {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              <UserTag user={task.assignee} />
            </div>
          )}
          {task && (
            <p>
              <strong>Status</strong>
              {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              {task.isChecked ? "Done" : "Not done"}
            </p>
          )}
          {task && (
            <p>
              <strong>Date created</strong>
              {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              {new Intl.DateTimeFormat("en-us", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(task.dateCreated)}
            </p>
          )}
        </div>
      ) : (
        <div className={styles.body}>
          <p>
            <Link to="/">Back to home</Link>
          </p>
          <TaskForm mode="edit" task={task ?? undefined} />
        </div>
      )}
    </Page>
  );
}
