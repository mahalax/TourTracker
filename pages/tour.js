import React, { useState, useEffect } from 'react'
import TourEntryForm from '../components/Pages/TourEntry/AddTourEntryForm'
import PageHeader from "../components/PageHeader"
import BuildIcon from '@material-ui/icons/Build';
import { Paper, makeStyles, Grid, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../components/controls/useTable';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { deleteTourEntry, updateGuideStatusTourEntry, ViewTourEntry } from '../store/actions/tourEntry';
import Controls from '../components/controls/Controls';
import { CallMissedSharp, FormatAlignCenter, Search } from "@material-ui/icons";
import Popup from '../components/Popup';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from "@material-ui/icons/Delete";
import { editTourEntry, createTourEntry } from '../store/actions/tourEntry';

import moment from 'moment';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import ConfirmDialog from '../components/controls/ConfirmDialog';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react'
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import useStyles from '../styles/styles';
import EditTourEntryForm from '../components/Pages/TourEntry/EditTourEntryForm';
import AddTourEntryForm from '../components/Pages/TourEntry/AddTourEntryForm';

const headCells = [
    { id: 'location', label: 'Location' },
    { id: 'guide', label: 'Guide' },
    { id: 'costOfTour', label: 'Cost of Tour' },
    { id: 'dateOfTour', label: 'dateOfTour' },
    {id: 'guide_status',label : 'guide_status'},
   
    { id: 'Actions', label: 'Actions', disableSorting: true }
]


export default function TourEntry() {


    const records = (useSelector((state) => state.tourentries))
    const { data: session } = useSession()
    const [status, setStatus] = useState(false)
    const router = useRouter()

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [currentId, setCurrentId] = useState(0);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [SearchDate, setSearchDate] = useState(null);
    const [refreshflag,setRefreshFlag] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn)

    const handleSearch = (date) => {
        setSearchDate(date)
        //let target = new date(date);
        //console.log(dateFormat(date,"yyyy-mm-dd")
        //console.log(dateFormat(records[0].expenseDate,"yyyy-mm-dd")
        console.log('backend date:' + moment(new Date(records[0].dateOfTour)).format("DD-MM-YYYY"))
        console.log('search date : ' + moment(date).format("DD-MM-YYYY"))
        setFilterFn({
            fn: items => {
                if (!date)
                    return items;
                else {

                    return items.filter(x => (moment(new Date(x.dateOfTour)).format("DD-MM-YYYY")) === moment(date).format("DD-MM-YYYY"))

                }
            }
        })
    }

    useEffect(() => {
        async function fetch_session() {
            const session = await getSession()
            if (!session) {
                setStatus(false)
                router.push(`${baseURL}`,3);
            }
            if (session) {
                setStatus(true)
                dispatch(ViewTourEntry(session?.user?.accessToken));
            }
        }
        fetch_session()

    }, [ dispatch,refreshflag]);


    const addOrEdit = (values) => {
        console.log("currentId : ", currentId)
        const token = session?.user?.accessToken
        if (currentId === 0)
            dispatch(createTourEntry(values, router, token))
        else
            dispatch(editTourEntry(currentId, values, router, token))

        setRecordForEdit(null)
        setCurrentId(0)
        setOpenPopup(false)
        setRefreshFlag(!refreshflag)

    }

    const openInPopUp = (item) => {
        setRecordForEdit(item)
        setCurrentId(item._id)
        setOpenPopup(true)

    }

    const onDelete = id => {
        const token = session?.user?.accessToken
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteTourEntry(id, token))
        setRefreshFlag(!refreshflag)
    }

    const handleAcceptClick = id => {
        const token = session?.user?.accessToken
        const formData = {
            status: "Accepted"
        }
        dispatch(updateGuideStatusTourEntry(id, formData,token))
        setRefreshFlag(!refreshflag)
    }

    const handleRejectClick = id => {
        const token = session?.user?.accessToken
        const formData = {
            status: "Rejected"
        }
        dispatch(updateGuideStatusTourEntry(id, formData,token))
        setRefreshFlag(!refreshflag)
    }

    return (
        <>
            <PageHeader
                title="Tour Entry"
                subTitle="Add or Remove Tours"
                icon={<BuildIcon fontSize="large" className={classes.iconColor}/>}
            />

           

                <Toolbar>
                    <Grid item xs={8} sm={6} style={{ textAlign: 'left', marginTop: '10px' }}>
                      
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container>
                                <Grid item xs={12} >
                                    <KeyboardDatePicker                                    
                                        className={classes.root2}
                                        margin="normal"
                                        name="dateOfTour"
                                        id="SearchtourDate"
                                        label="Tour Date"
                                        format="dd-MM-yyyy"
                                        value={SearchDate}
                                        onChange={handleSearch}

                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    {session?.user?.role == "admin" && 
                    <Grid item xs={4} sm={6} style={{ textAlign: 'right', marginTop: '10px' }}>
                        <Controls.Button
                            text="New"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setRecordForEdit(null); setOpenPopup(true) }}
                        />
                    </Grid>
}
                </Toolbar>
                <Paper className="tablecontainer">

                <TblContainer>
                    <TblHead />
                    {console.log(records)}

                    <TableBody>
                        {

                            recordsAfterPagingAndSorting().map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>{item.guide}</TableCell>
                                    <TableCell>{item.costOfTour}</TableCell>
                                    <TableCell className={classes.cell_width}>{moment(new Date(item.dateOfTour)).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell>{item.guide_status}</TableCell>
                                    {session?.user?.role == "admin" && <TableCell>
                                        <li className='actiontablecell'>
                                        <Controls.ActionButton >
                                            <EditOutlinedIcon fontSize="small" className={classes.primary}
                                                onClick={() => openInPopUp(item)} />

                                        </Controls.ActionButton>
                                        <Controls.ActionButton

                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }}>
                                            <DeleteIcon fontSize="small" className={classes.secondary} />
                                        </Controls.ActionButton>
                                        </li>
                                    </TableCell>
}
{session?.user?.role == "guide" && <TableCell>
                                        <li className='actiontablecell'>
                                        <Controls.ActionButton  onClick={()=>handleAcceptClick(item._id)} >
                                           <button>Accept</button>

                                        </Controls.ActionButton>
                                        <Controls.ActionButton
onClick={()=>handleRejectClick(item._id)}
                                            >
                                           <button>Reject</button>
                                        </Controls.ActionButton>
                                        </li>
                                    </TableCell>
}

                                </TableRow>
                            )

                            )

                        }


                    </TableBody>

                </TblContainer>
                <TblPagination />
                </Paper>
                {/*<BasicTable/>*/}
           
            <Popup id='popup'
                title={recordForEdit ? "Edit Tour" : "Add Tours"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                width={recordForEdit ? "xs" : "lg"}
            >
                {console.log('recordforedit befor popup')}
                {recordForEdit ? <EditTourEntryForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} currentId={currentId} /> : <AddTourEntryForm addOrEdit={addOrEdit}/>}
            </Popup>
            <ToastContainer />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}