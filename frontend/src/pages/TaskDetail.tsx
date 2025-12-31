import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);

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

  const assigneeImageSrc = task?.assignee?.profilePictureUrl ?? "/profile1.png";

  return (
    <Page>
      <title>Task Detail | TSE Todos</title>
      <div className={styles.body}>
        <p>
          <Link to="/">Back to home</Link>
        </p>
        <div className={styles.taskNameRow}>
          <span className={styles.taskTitle}>{task?.title ?? "This task doesn't exist!"}</span>
          <div className={styles.stretch} />
          {task && <Button kind="primary" label="Edit Task" />}
        </div>
        {task && <p>{task.description}</p>}
        {task && (
          <p>
            <strong>Assignee</strong>
            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            {task.assignee && (
              <img
                className={styles.profilePicture}
                src={task.assignee.profilePictureUrl ?? "/profile1.png"}
              />
            )}
            {task.assignee?.name ?? "Not assigned"}
          </p>
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
    </Page>
  );
}
