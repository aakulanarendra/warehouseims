import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';



let suggestions = [
    { label: 'Test1', value:'C901951'},
    { label: 'Test2',value:'C901952' }
].map(suggestion => ({
    value: suggestion.value,
    label: suggestion.label,
}));

function  getSuggestionInput(inputSuggestions){
    return inputSuggestions.map(suggestion => ({
        value: suggestion.customerId,
        label: `${suggestion.firstName  } ${suggestion.lastName}`,
    }));
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(
    suggestion,
    { query, isHighlighted }
) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
                ))}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            height: 250,
            flexGrow: 1,
        },
        container: {
            position: 'relative',
        },
        suggestionsContainerOpen: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        suggestion: {
            display: 'block',
        },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
        },
        divider: {
            height: theme.spacing(2),
        },
    }),
);

let value ='';

export default function IntegrationAutosuggest(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        single: '',
        popper: '',
        value:''
    });

    // const [value,setValue] = React.useState('');
    const {inputSuggestions,setSelectCustomer} = props;


    const getSuggestionValue = (suggestion) => {
        setState({value:suggestion.value});
        value = suggestion.value;
        return suggestion.label;
    }


    const [stateSuggestions, setSuggestions] = React.useState([]);


    React.useEffect(() => {
        suggestions = getSuggestionInput(inputSuggestions);
    });

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const  handleChange = name => (event, { newValue }) => {
        setSelectCustomer({customerName:newValue,customerId:value});
        setState({
            [name]: newValue,
        });
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Customer',
                    placeholder: 'select customer',
                    value: state.single,
                    onChange: handleChange('single'),
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        </div>
    );
}
