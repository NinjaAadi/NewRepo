import React, { useState } from "react";
import UserRegistration from "./UserRegistration/UserRegistration";
import Header from "./Header/Header";
import UserData from "./AddUser/UserData"
import HandleExcel from "./HandleExcel/UploadExcel";
import DownloadTemplate from "./DownloadTemplate";

export default function Admin() {
  const [page, setPage] = useState(0);

  let container = null;

  const updatePage = (pageno) => {
    console.log(pageno);
    setPage(pageno);
  };

  if (!page) {
    container = (
      <>
        <Header />
        <UserRegistration getData={(pageno) => updatePage(pageno)} />
      </>
    );
  }
  else if(page === 1) container = (
    <>
      <Header/>
      <UserData />
    </>
  );
  // else if(page==2) container = <DownloadTemplate/>
  else if (page === 3) 
      container = <HandleExcel />;

  return <div>{container}</div>;
}
