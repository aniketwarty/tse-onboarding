import { Dialog } from "@tritonse/tse-constellation";
import { useState } from "react";
import { Link } from "react-router";
import { type Task, updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked, assignee: task.assignee?._id })
      .then((response) => {
        if (response.success) {
          setTask(response.data);
        } else {
          setErrorModalMessage(response.error);
        }
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={styles.taskContainer}>
        <div className={`${styles.textContainer} ${task.isChecked && styles.checked}`}>
          <Link className={styles.link} to={`/task/${task._id}`}>
            <span className={styles.title}>{task.title}</span>
          </Link>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
        <UserTag user={task.assignee} className={styles.userTag} />
      </div>
      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        content={<p className={styles.errorModalText}>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
    </div>
  );
}
