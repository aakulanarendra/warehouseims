import React from 'react';
import {TagsSelect} from "react-select-material-ui";
import {post} from "../../../utils/client";
import {Button} from "../../../components/Wrappers";
import * as Constants from "../../../utils/constants";

const updateUrl = Constants.ROLE_PAGES;


export default function RolePermissions(props) {


    const {options, id,values,setValues} = props;


    // useEffect(() => {
    //     let values = pages.map(suggestion => ({key: suggestion.id, value: suggestion.id, label: suggestion.label}));
    //     setOptions(values);
    // }, []);

    const handleChange = (values) => {
        setValues(values)
    };

    const handleUpdate = (event) => {
        const req = values.map(id => options.filter(value => value.value ===id)[0]);
        const input  = req.map(page => ({id:page.value,label:page.label}))
        post(`${updateUrl  }/${  id}`, input, (data) => {
        }, function (response) {

        })
    };

    return (
        <div>
            <TagsSelect
                label="Pages"
                options={options}
                values={values}
                onChange={handleChange}
                SelectProps={{
                    msgNoOptionsAvailable: "All Pages are selected",
                    msgNoOptionsMatchFilter: "No page matches the filter"
                }}
            />

            <Button color="primary"
                    size="small"
                    className="px-2"
                    variant="contained"
                    onClick={handleUpdate}
            >
                Update Permission
            </Button>
        </div>
    );
}