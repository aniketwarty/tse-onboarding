import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

type UserTagProps = {
  user?: User;
  className?: string;
};

export function UserTag({ className, user }: UserTagProps) {
  return (
    <div className={className}>
      {user ? (
        <div className={`${styles.userTag}`}>
          <img className={styles.proflePicture} src="/userDefault.svg" />
          <span>{user.name}</span>
        </div>
      ) : (
        <span>Not assigned</span>
      )}
    </div>
  );
}
