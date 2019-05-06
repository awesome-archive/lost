import React from "react";
import UserName from "./fields/Username";
import Email from "./fields/Email";
import FirstName from "./fields/FirstName";
import Groups from "./fields/Groups";
import LastName from "./fields/LastName";
import Password from "./fields/Password";
import ConfirmPassword from './fields/ConfirmPassword'
import Roles from "./fields/Roles";


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
      <Email
        value={user.email}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            email: value
          });
        }}
      />
      <Password
        value={user.new_password}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            password: value
          });
        }}
      />
      <ConfirmPassword
        value={user.new_password}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            password: value
          });
        }}
      />
      <Groups
        usergroups={usergroups}
        allgroups={allgroups}
        onChange={newGroups => {
          updateUser({
            ...user,
            groups: newGroups
          });
        }}
      />
      <Roles />
      <h2>optional</h2>
      <FirstName
        value={user.first_name}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            first_name: value
          });
        }}
      />
      <LastName
        value={user.last_name}
        onChange={e => {
          const value = e.target.value;
          updateUser({
            ...user,
            last_name: value
          });
        }}
      />


    </>
  );
};
