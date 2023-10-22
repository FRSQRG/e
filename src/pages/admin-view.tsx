import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Grid, } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { FIRESTORE } from '../firebase/init';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import UserDetailsDialog from '../componenets/user-dialog';

const AdminView: React.FC = () => {
    const [userData, setUserData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, ] = useState<Date | null>(null);
    const [endDate, ] = useState<Date | null>(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const usersCollection = collection(FIRESTORE, 'users');
            const userDocs = await getDocs(usersCollection);

            let allUserData = [];
            let allVisits = [];
            for (let doc of userDocs.docs) {
                const userData = doc.data();
                userData.isBlacklisted = (userData.isBlacklisted === 'true' || userData.isBlacklisted === true);
                const visitsCollection = collection(doc.ref, 'visits');
                const q = query(visitsCollection, orderBy("date"));
                const visitsDocs = await getDocs(q);

                let visitsData = [];
                visitsDocs.forEach(visitDoc => {
                    visitsData.push(visitDoc.data());
                });

                allVisits = [...allVisits, ...visitsData];

                userData.totalVisits = visitsData.length;
                userData.discountedMoney = visitsData.reduce((acc, visit) => acc + (visit.discount || 0), 0);

                allUserData.push(userData);
            }

            // Filter data based on the selected dates if they're provided
            if (startDate && endDate) {
                allVisits = allVisits.filter(visit => new Date(visit.date) >= startDate && new Date(visit.date) <= endDate);
            }

            allVisits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            let visitsCount = 0;
            let totalBill = 0;
            let totalDiscount = 0;
            const usersCount = [];
            const incrementalChartData = allVisits.map(visit => {
                visitsCount += 1;
                totalBill += visit.price || 0;
                totalDiscount += visit.discount || 0;
                if (!usersCount.includes(visit.fullName)) {
                    usersCount.push(visit.fullName);
                }
                return {
                    date: visit.date,
                    visits: visitsCount,
                    price: totalBill,
                    discount: totalDiscount,
                    users: usersCount.length
                };
            });

            setUserData(allUserData);
            setChartData(incrementalChartData);
        };

        fetchData();
    }, [startDate, endDate,]); // Re-fetch data when startDate or endDate changes

    const totalVisits = userData.reduce((acc, user) => acc + user.totalVisits, 0);
    const totalDiscountedMoney = userData.reduce((acc, user) => acc + user.discountedMoney, 0);



    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
    const handleOpenDialog = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleDialogAction = async (isBlacklisted) => {
        const userRef = doc(FIRESTORE, 'users', selectedUser.uid);
        await updateDoc(userRef, { isBlacklisted: !isBlacklisted });
      
        // Optionally: Update the local state to reflect the change
        const updatedUserData = userData.map(user => {
          if (user.uid === selectedUser.uid) {
            return { ...user, isBlacklisted: !isBlacklisted };
          }
          return user;
        });
        setUserData(updatedUserData);
      
        handleCloseDialog();
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ padding: '16px', maxWidth: '800px' }}>
            <Card sx={{ marginBottom: '16px', padding: '16px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4"><b>{totalVisits}</b></Typography>
                        <Typography variant="subtitle1" color="textSecondary">Visits</Typography>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4"><b>£{Math.round(totalDiscountedMoney)}</b></Typography>
                        <Typography variant="subtitle1" color="textSecondary">Discount</Typography>
                    </Grid>
                </Grid>
            </Card>

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card style={{ maxHeight: 350, padding: '16px' }}>
                        <Typography variant="h6" align="center"><b> VISITS </b></Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card style={{ maxHeight: 350, padding: '16px' }}>
                        <Typography variant="h6" align="center"><b>BILLS</b></Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card style={{ maxHeight: 350, padding: '16px' }}>
                        <Typography variant="h6" align="center"><b>DISCOUNTS</b></Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="discount" stroke="#FF8042" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid>

                {/* <Grid item xs={12} md={6}>
                    <Card style={{ maxHeight: 350, padding: '16px' }}>
                        <Typography variant="h6" align="center">Users</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#FFC658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid> */}
            </Grid>

            <TableContainer component={Card} sx={{ marginTop: '16px' }}>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6"><b>NAME</b></Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6"><b>VISITS</b></Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6"><b>DISCOUNTS</b></Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleOpenDialog(user)}
                                sx={{
                                textDecoration: user.isBlacklisted ? 'line-through' : 'none',
                                color: user.isBlacklisted ? 'red' : 'inherit',
                                backgroundColor: user.isBlacklisted ? '#ffdddd' : 'inherit',
                                }}
                            >
                                <TableCell component="th" scope="row">{user.fullName}</TableCell>
                                <TableCell align="right">{Math.round(user.totalVisits)}</TableCell>
                                <TableCell align="right">£{Math.round(user.discountedMoney)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {selectedUser ? <UserDetailsDialog open={isDialogOpen} onClose={handleCloseDialog} user={selectedUser} onAction={handleDialogAction}  /> : <></> }
        </div>
    );
};

export default AdminView;
