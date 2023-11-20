import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { useState } from 'react';
import React, { useEffect } from 'react';

import axios from 'axios';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
import thLocale from 'date-fns/locale/th';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideBar from './sidebar';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useCookies } from 'react-cookie';



export default function Datatable() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),

        Menu: MenuRoundedIcon,
    }



    const [data, setData] = useState([])
    const defaultMaterialTheme = createTheme()

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const [cookies, setCookies] = useCookies(['token'])


    const formatDate = (dateString) => {
        if (!dateString) return ''; // Return empty string if dateString is null or undefined
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : format(date, "d MMM yy HH:mm 'น.'", { locale: thLocale });
    };



    const [columns, setColumns] = useState([
        { title: 'กิจกรรม', field: 'name' },
        {
            title: 'วันเวลา',
            field: 'when',
            render: rowData => formatDate(rowData.when),
            editComponent: (props) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={thLocale}>
                    <KeyboardDateTimePicker
                        value={props.value ? props.value : new Date()} // Set value based on props.value
                        onChange={(date) => props.onChange(date)}
                        minDate={new Date()} // Disallow past dates
                    />
                </MuiPickersUtilsProvider>
            ),
        },

    ]);


    useEffect(() => {
        // Fetching data when the component mounts
        axios.get('http://localhost:5180/Activites',
            { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000 }
        )
            .then((response) => {
                // Setting fetched data to state
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'ECONNABORTED') {
                    setSnackbarMessage('Request timeout');
                } else {
                    console.log(error.response.data);

                    setSnackbarMessage(`This is an error alert -check it out : ${error.response.status}`);
                }
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    }, [cookies.token]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>

                <MaterialTable
                    icons={tableIcons}
                    title={<div style={{ display: 'flex', alignItems: 'center' }}>
                        <button id='hbg' onClick={SideBar()}
                            style={{ alignItems: 'center', cursor: 'pointer', marginRight: '20px' }}></button>
                        <h2 style={{ textAlign: 'center', marginLeft: '50px', marginTop: '30px' }}>To-Do List</h2>
                    </div>}
                    columns={columns}
                    data={data}
                    editable={{
                        //code here jAAAAAAAAAAAAAAAAAAAAAAAA
                        isEditable: rowData => rowData.name, // only name(a) rows would be editable
                        isEditHidden: rowData => rowData.name === 'x',
                        isDeletable: rowData => rowData.name, // only name(b) rows would be deletable,
                        isDeleteHidden: rowData => rowData.name === 'y',
                        onBulkUpdate: changes =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    /* setData([...data, newData]); */
                                    resolve();
                                }, 1000);
                            }),

                        onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log(`"cookies"${cookies.token}`)
                                    axios.post(
                                        'http://localhost:5180/Activites',
                                        {
                                            activityName: newData.name,
                                            when: newData.when
                                        },
                                        { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000 }
                                    ).then((response) => {
                                        newData.id = response.data.id;
                                        setData([...data, newData]);

                                        // Row added successfully
                                        setSnackbarMessage('This is an added successfully alert -check it out!');
                                        setSnackbarSeverity('success');
                                        setSnackbarOpen(true);

                                        resolve();
                                    }).catch((error) => {
                                        console.log(error.response.data);
                                        if (error.code === 'ECONNABORTED') {
                                            setSnackbarMessage('Request timeout');
                                        } else {
                                            setSnackbarMessage(`This is an error alert -check it out : ${error.response.status}`);
                                        }
                                        setSnackbarSeverity('error');
                                        setSnackbarOpen(true);

                                        console.log(error);

                                        reject();
                                    });
                                }, 1000);
                            }),


                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    axios.put(
                                        'http://localhost:5180/Activites/' + oldData.id,
                                        {
                                            activityName: newData.name,
                                            when: newData.when
                                        },
                                        { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000 }
                                    ).then((response) => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);

                                        // Update successfully
                                        setSnackbarMessage('This is an updated successfully alert -check it out!');
                                        setSnackbarSeverity('success');
                                        setSnackbarOpen(true);

                                        resolve(); // Move resolve() here
                                    }).catch((error) => {
                                      
                                        if (error.code === 'ECONNABORTED') {
                                            setSnackbarMessage('Request timeout');
                                        } else {
                                            setSnackbarMessage(`This is an error alert -check it out! : ${error.response.status}`);
                                        }
                                        setSnackbarSeverity('error');
                                        setSnackbarOpen(true);

                                        console.log(error);

                                        reject(); // Rejecting the promise in case of error
                                    });
                                }, 1000);
                            }),


                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    axios.delete(
                                        'http://localhost:5180/Activites/' + oldData.id,
                                        { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000 }
                                    ).then((response) => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);

                                        // Delete successfully
                                        setSnackbarMessage('This is an deleted successfully alert -check it out!');
                                        setSnackbarSeverity('success');
                                        setSnackbarOpen(true);
                                    }).catch((error) => {
                                        if (error.code === 'ECONNABORTED') {
                                            setSnackbarMessage('Request timeout');
                                        } else {
                                            setSnackbarMessage(`This is an error alert -check it out! : ${error.response.status}`);
                                        }
                                        setSnackbarSeverity('error');
                                        setSnackbarOpen(true);

                                        console.log(error);

                                    })
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </ThemeProvider>
        </div>
    )
}