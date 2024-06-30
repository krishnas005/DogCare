"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GlobalContext } from '@/context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import {
    Box, Button, IconButton, Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
    TextField, Grid, Collapse, Paper
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const HealthRecords = ({ petId }) => {
    const { register, handleSubmit, reset } = useForm();
    const [healthRecords, setHealthRecords] = useState([]);
    const [healthAlerts, setHealthAlerts] = useState([]);
    const [showHealthForm, setShowHealthForm] = useState(false);
    const [showAlertForm, setShowAlertForm] = useState(false);
    const { user } = useContext(GlobalContext);

    useEffect(() => {
        fetchHealthData();
    }, []);

    const fetchHealthData = async () => {
        try {
            const response = await axios.get(`/api/pet-health?id=${petId}`);
            setHealthRecords(response.data.healthRecords);
        } catch (error) {
            console.error('Failed to fetch health records', error);
        }

        try {
            const response = await axios.get(`/api/pet-health-alert?id=${petId}`);
            setHealthAlerts(response.data.healthAlerts);
        } catch (error) {
            console.error('Failed to fetch health alerts', error);
        }
    };

    const onSubmitHealthRecord = async (data) => {
        try {
            const response = await axios.put(`/api/pet-health?id=${petId}`, data);

            if (response.status === 200) {
                toast.success('Health record added/updated successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
                reset(); // Reset form after submission
            } else {
                toast.error('Failed to update health record.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update health record');
            }
        } catch (error) {
            toast.error('An error occurred while updating health record.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update health record', error);
        }
    };

    const onSubmitHealthAlert = async (data) => {
        try {
            const response = await axios.put(`/api/pet-health-alert?id=${petId}`, data);

            if (response.status === 200) {
                toast.success('Health alert added/updated successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
                reset(); // Reset form after submission
            } else {
                toast.error('Failed to update health alert.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update health alert');
            }
        } catch (error) {
            toast.error('An error occurred while updating health alert.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update health alert', error);
        }
    };

    const deleteHealthRecord = async (id) => {
        try {
            const response = await axios.delete(`/api/pet-health?id=${petId}&recordId=${id}`);
            if (response.status === 200) {
                toast.success('Health record deleted successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
            } else {
                toast.error('Failed to delete health record.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to delete health record');
            }
        } catch (error) {
            toast.error('An error occurred while deleting health record.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to delete health record', error);
        }
    };

    const deleteHealthAlert = async (id) => {
        try {
            const response = await axios.delete(`/api/pet-health-alert?id=${petId}&alertId=${id}`);
            if (response.status === 200) {
                toast.success('Health alert deleted successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
            } else {
                toast.error('Failed to delete health alert.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to delete health alert');
            }
        } catch (error) {
            toast.error('An error occurred while deleting health alert.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to delete health alert', error);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 4, boxShadow: 3 }}>
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Health Records
            </Typography>

            <Button
                variant="contained"
                color="primary"
                endIcon={showHealthForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setShowHealthForm(!showHealthForm)}
                sx={{ mb: 2 }}
            >
                {showHealthForm ? 'Hide Health Form' : 'Show Health Form'}
            </Button>

            <Collapse in={showHealthForm}>
                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                    <form onSubmit={handleSubmit(onSubmitHealthRecord)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Type"
                                    fullWidth
                                    {...register('type')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('date')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    {...register('description')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Vet"
                                    fullWidth
                                    {...register('vet')}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Add/Update Health Record
                        </Button>
                    </form>
                </Paper>
            </Collapse>

            <Button
                variant="contained"
                color="primary"
                endIcon={showAlertForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setShowAlertForm(!showAlertForm)}
                sx={{ mb: 2 }}
            >
                {showAlertForm ? 'Hide Alert Form' : 'Show Alert Form'}
            </Button>

            <Collapse in={showAlertForm}>
                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                    <form onSubmit={handleSubmit(onSubmitHealthAlert)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Type"
                                    fullWidth
                                    {...register('alertType')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('alertDate')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    {...register('alertDescription')}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Add/Update Health Alert
                        </Button>
                    </form>
                </Paper>
            </Collapse>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Existing Health Records
                </Typography>
                {healthRecords.length > 0 ? (
                    <List>
                        {healthRecords.map(record => (
                            <ListItem key={record._id} divider>
                                <ListItemText
                                    primary={record.type}
                                    secondary={
                                        <>
                                            <Typography variant="body2">{dayjs(record.date).format('MMMM D, YYYY')}</Typography>
                                            <Typography variant="body2">{record.description}</Typography>
                                            <Typography variant="body2">Vet: {record.vet}</Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="error" onClick={() => deleteHealthRecord(record._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2">No health records found.</Typography>
                )}
            </Box>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Existing Health Alerts
                </Typography>
                {healthAlerts.length > 0 ? (
                    <List>
                        {healthAlerts.map(alert => (
                            <ListItem key={alert._id} divider>
                                <ListItemText
                                    primary={alert.type}
                                    secondary={
                                        <>
                                            <Typography variant="body2">{dayjs(alert.date).format('MMMM D, YYYY')}</Typography>
                                            <Typography variant="body2">{alert.description}</Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="error" onClick={() => deleteHealthAlert(alert._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2">No health alerts found.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default HealthRecords;
