import { useEffect, useState } from 'react';
import fetchAppointments from '../appointment-data-fetch';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../AppointmentStyle/iconify';
import Scrollbar from '../../AppointmentStyle/scrollbar'
import TableEmptyRows from '../table-emty-rows';
import TableNoData from '../table-no-data';
import AppointmentTableRow from '../appointment-table-row';
import AppointmentTableHead from '../appointment-table-head';
import AppointmentTableToolbar from '../appointment-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';



import * as React from 'react'; // This imports React
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('appointmentId');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);


    useEffect(() => {
        const getAppointments = async () => {
            try {
                const appointments = await fetchAppointments();
                setAppointments(appointments);
            } catch (error) {
                console.error(error);
            }
        };
        getAppointments();
    }, []);

    const refreshAppointmentsList = async () => {
        try {
            const appointments = await fetchAppointments();
            setAppointments(appointments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = appointments.map((n) => n.appointmentId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: appointments,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const handleDeleteSelected = () => {
        setOpenDeleteDialog(true); // Open the confirmation dialog
    };

    const confirmDeleteSelected = async () => {
        try {
            for (let id of selected) {
                await fetch(`http://localhost:8080/appointment/${id}`, { method: 'DELETE' });
            }
            // Refresh the appointments list after deletion
            const updatedAppointments = await fetchAppointments();
            setAppointments(updatedAppointments);
            setSelected([]); // Clear the selection
        } catch (error) {
            console.error('Error deleting appointments:', error);
        }
        setOpenDeleteDialog(false);
    };

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Appointments</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Appointment
                </Button>
            </Stack>

            <Card>
                <AppointmentTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    handleDeleteSelected={handleDeleteSelected}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <AppointmentTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={appointments.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'appointmentId', label: 'Appointment ID' },
                                    { id: 'patientName', label: 'Patient' },
                                    { id: 'doctorName', label: 'Doctor' },
                                    { id: 'appointmentDate', label: 'Appointment Date' },
                                    { id: 'appointmentTime', label: 'Appointment Time' },
                                    { id: 'status', label: 'Appointment Status' },
                                    { id: 'note', label: 'Appointment Note' },
                                    { id: 'hasPaid', label: 'Payment', align: 'center' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <AppointmentTableRow
                                            key={row.appointmentId}
                                            appointmentId={row.appointmentId}
                                            patientName={row.patientName}
                                            doctorName={row.doctorName}
                                            appointmentDate={row.appointmentDateTime}
                                            appointmentTime={row.appointmentDateTime}
                                            status={row.status}
                                            note={row.note}
                                            hasPaid={row.hasPaid}
                                            doctorId={row.doctorId}
                                            patientId={row.patientId}
                                            selected={selected.indexOf(row.appointmentId) !== -1}
                                            handleClick={(event) => handleClick(event, row.appointmentId)}
                                            refreshAppointments={refreshAppointmentsList}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, appointments.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Dialog
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm Deletion"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the selected appointments?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteSelected} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <TablePagination
                    page={page}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}