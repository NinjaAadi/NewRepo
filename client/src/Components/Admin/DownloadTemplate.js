import React from 'react'
import { saveAs } from "file-saver"

export default function DownloadTemplate() {
    const saveFile = () => {
      saveAs(
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "templateExcel.pdf"
      );
    };
  return (
  <div>

  </div>
  );
}
