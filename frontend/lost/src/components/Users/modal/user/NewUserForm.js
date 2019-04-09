import React from "react";
import EditUserForm from "./EditUserForm";
import UserName from "./fields/Username";
export default ({ updateUser, user, allgroups, usergroups }) => {
  return (
    <>
      <UserName
        value={user.user_name}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            user_name: value
          });
        }}
      />
      <EditUserForm
        updateUser={updateUser}
        user={user}
        allgroups={allgroups}
        usergroups={usergroups}
      />
    </>
  );
};
