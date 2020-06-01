import React from 'react';
import {TagsSelect} from "react-select-material-ui";
import {post} from "../../../utils/client";
import {Button} from "../../../components/Wrappers";
import * as Constants from "../../../utils/constants";

const updateUrl = Constants.ROLE_USERS;


export default function RoleUser(props) {
    const {options, id,values,setValues} = props;


    // useEffect(() => {
    //     let values = pages.map(suggestion => ({key: suggestion.id, value: suggestion.id, label: suggestion.label}));
    //     setOptions(values);
    // }, []);

    const handleChange = (values) => {
        setValues(values)
    };

    const handleUpdate = (event) => {
        post(`${updateUrl  }/${  id}`, values, (data) => {
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
                    msgNoOptionsAvailable: "All Users are selected",
                    msgNoOptionsMatchFilter: "No User matches the filter"
                }}
            />

            <Button color="primary"
                    size="small"
                    className="px-2"
                    variant="contained"
                    onClick={handleUpdate}
            >
                Update User
            </Button>
        </div>
    );
}