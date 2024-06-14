"use client";
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GlobalContext } from '@/context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    IconButton,
    Typography,
    Paper,
    Grid,
    TextField,
    Collapse,
    Avatar,
    CircularProgress,
    Container,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import HealthRecords from '@/components/HealthRecords';

const ProfilePage = () => {
    const { user, pet } = useContext(GlobalContext);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    if (!user || !pet) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
                <CircularProgress />
            </Box>
        );
    }

    const { name, email, city, state, country, phone, _id: userId } = user;
    const { _id: petId, name: petName, breed, age, gender, image } = pet[0];

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setValue('name', name);
        setValue('email', email);
        setValue('city', city);
        setValue('state', state);
        setValue('country', country);
        setValue('phone', phone);
        setValue('petName', petName);
        setValue('breed', breed);
        setValue('age', age);
        setValue('gender', gender);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.put('/api/users/updateUser', data);

            if (response.status === 200) {
                setIsEditing(false);
                toast.success('Profile updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error('Failed to update profile.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update user and pet details');
            }
        } catch (error) {
            toast.error('An error occurred while updating the profile.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update user and pet details', error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    User Profile
                </Typography>
                <Box display="flex" alignItems="center" mb={4}>
                    <Avatar src={image || "/dogPic.jpg"} alt={petName} sx={{ width: 56, height: 56, mr: 2 }} />
                    <div>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body1" color="textSecondary">{email}</Typography>
                    </div>
                </Box>
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Contact Information</Typography>
                        <Typography variant="body2">Phone: {phone}</Typography>
                        <Typography variant="body2">City: {city}</Typography>
                        <Typography variant="body2">State: {state}</Typography>
                        <Typography variant="body2">Country: {country}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Pet Information</Typography>
                        <Typography variant="body2">Name: {petName}</Typography>
                        <Typography variant="body2">Breed: {breed}</Typography>
                        <Typography variant="body2">Age: {age}</Typography>
                        <Typography variant="body2">Gender: {gender}</Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    onClick={handleEditClick}
                >
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                </Button>
                <Collapse in={isEditing}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '16px' }}>
                        <Grid container spacing={2}>
                            {/* User Details */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    defaultValue={name}
                                    {...register('name')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    defaultValue={email}
                                    {...register('email')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    defaultValue={phone}
                                    {...register('phone')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    defaultValue={city}
                                    {...register('city')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    defaultValue={state}
                                    {...register('state')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    defaultValue={country}
                                    {...register('country')}
                                    variant="outlined"
                                />
                            </Grid>
                            {/* Pet Details */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Pet Name"
                                    defaultValue={petName}
                                    {...register('petName')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Breed"
                                    defaultValue={breed}
                                    {...register('breed')}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    defaultValue={age}
                                    {...register('age')}
                                    type="number"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label="Gender"
                                        defaultValue={gender}
                                        {...register('gender')}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Collapse>
                <Box mt={4}>
                    <HealthRecords petId={petId} />
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
