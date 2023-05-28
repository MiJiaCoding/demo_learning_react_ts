import React, { useEffect, useState } from "react";

import SearchPanel from "./SearchPanel";
import List from "./List";
// import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";

// const apiUrl = process.env.REACT_APP_API_URL;
// console.log(apiUrl);
// console.log(process.env)
// console.log('process.env.NODE_ENV',process.env.NODE_ENV)

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 1000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    //   fetch(
    //     `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    //     // ` http://localhost:3001/projects?${qs.stringify(
    //     //   cleanObject(debouncedParam)
    //     // )}`
    //   ).then(async (response) => {
    //     if (response.ok) {
    //       setList(await response.json());
    //     }
    //   });
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
    // fetch(
    //   `${apiUrl}/users`
    //   // ` http://localhost:3001/users}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectList;
