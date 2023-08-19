import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MainContext } from "../../provider/ContextProvider";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./dataPage.css";
import AccordionCollapse from "../../components/Collapsible/AccordionCollapse";

interface localObject {
  email: string;
  name: string;
  phoneNo: string;
}

interface JSONDataInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface deptPropInterface {
  department: string;
  sub_departments: string[];
}

const DataPage = () => {
  // states
  const [postData, setPostData] = useState<JSONDataInterface[]>([]);
  const [deptState, setDeptState] = useState<deptPropInterface[]>([]);

  // context API
  const contextInfo = useContext(MainContext);
  const open = contextInfo?.open;
  const setOpen = contextInfo?.setOpen;

  // localStorage data
  const localData: localObject = JSON.parse(
    localStorage.getItem("userDetails") || "{}"
  );
  const email = localData.email;
  const name = localData.name;
  const phoneNo = localData.phoneNo;

  // check if data is inserted or not by the user
  useEffect(() => {
    if ((!name || !email || !phoneNo) && open !== undefined) {
      setOpen !== undefined && setOpen(true);
    }
  }, [open]);

  // API fetch
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
      });
  }, []);

  // Fetching department data
  useEffect(() => {
    fetch("/DepartmentData.json")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return setDeptState(data);
      });
  }, []);

  // React DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
    },
    {
      field: "body",
      headerName: "Description",
      type: "number",
      width: 500,
      editable: true,
    },
  ];

  return (
    <>
      {open === true && <Navigate to="/" replace={true} />}
      {open === false && (
        <div className="dataMainBox">
          <div className="dataGridBox">
            <h2>Data Grid</h2>
            <Box sx={{ height: 400, width: "80%" }}>
              <DataGrid
                rows={postData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
          <div className="dataAccordionBox">
            <h2>Department Data</h2>
            {deptState.map((el, indx) => (
              <AccordionCollapse
                department={el?.department}
                sub_departments={el?.sub_departments}
                key={indx}
              ></AccordionCollapse>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DataPage;
