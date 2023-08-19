import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./accordionCollapse.css";

interface deptPropInterface {
  department: string;
  sub_departments: string[];
}

export default function AccordionCollapse(props: deptPropInterface) {
  const department = props.department;
  const sub_departments = props.sub_departments;
  //   console.log(department, sub_departments);

  const [checked, setChecked] = React.useState([true, false, false]);
  const [checkedSecondary, setCheckedSecondary] = React.useState([true, false]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (sub_departments.length === 3)
      setChecked([
        event.target.checked,
        event.target.checked,
        event.target.checked,
      ]);
    else setCheckedSecondary([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (sub_departments.length === 3)
      setChecked([event.target.checked, checked[1], checked[2]]);
    else setCheckedSecondary([event.target.checked, checkedSecondary[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (sub_departments.length === 3)
      setChecked([checked[0], event.target.checked, checked[2]]);
    else setCheckedSecondary([checkedSecondary[0], event.target.checked]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {sub_departments[0] && sub_departments.length === 3 ? (
        <FormControlLabel
          label={sub_departments[0]}
          control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
        />
      ) : (
        <FormControlLabel
          label={sub_departments[0]}
          control={
            <Checkbox checked={checkedSecondary[0]} onChange={handleChange2} />
          }
        />
      )}

      {sub_departments[1] && sub_departments.length === 3 ? (
        <FormControlLabel
          label={sub_departments[1]}
          control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
        />
      ) : (
        <FormControlLabel
          label={sub_departments[1]}
          control={
            <Checkbox checked={checkedSecondary[1]} onChange={handleChange3} />
          }
        />
      )}

      {sub_departments[2] && (
        <FormControlLabel
          label={sub_departments[2]}
          control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
        />
      )}
    </Box>
  );

  return (
    <div>
      <Accordion style={{ width: "300px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {sub_departments.length === 3 ? (
              <FormControlLabel
                label={`${department}`}
                control={
                  <Checkbox
                    checked={checked[0] && checked[1] && checked[2]}
                    indeterminate={
                      checked[0] !== checked[1] ||
                      checked[0] !== checked[2] ||
                      checked[1] !== checked[2]
                    }
                    onChange={handleChange}
                  />
                }
              />
            ) : (
              <FormControlLabel
                label={`${department}`}
                control={
                  <Checkbox
                    checked={checkedSecondary[0] && checkedSecondary[1]}
                    indeterminate={checkedSecondary[0] !== checkedSecondary[1]}
                    onChange={handleChange}
                  />
                }
              />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"div"}>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
