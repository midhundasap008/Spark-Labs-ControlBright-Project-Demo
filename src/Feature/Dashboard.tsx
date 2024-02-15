import { useState } from "react";
import { Button, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CellFieldType } from "./types";
import { useFeatures } from "../hooks/useFeatures";

export default function Dashboard() {
    const { deleteFeature, features, isLoading } = useFeatures();
    const [selectedFeature, setSelectedFeature] = useState(0);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = (id: number) => {
        navigate(`/edit/${id}`)
    };

    const handleDeleteClick = (id: number) => {
        setSelectedFeature(id);
        setOpenDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
        deleteFeature(selectedFeature);

    };

    const handleCloseDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
    };




    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Name",
            width: 200,
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            editable: true,
        },
        {
            field: "actions",
            headerName: "Action",
            width: 180,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params: CellFieldType) => (
                <>
                    <Button sx={{
                        mr: 2, fontSize: '12px', fontWeight: 600, textTransform: 'capitalize'
                    }} variant="outlined" color="primary" onClick={() => handleEditClick(params.row.id)}>
                        Edit
                    </Button>
                    <Button sx={{ fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }} variant="outlined" color="error" onClick={() => handleDeleteClick(params.row.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];


    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ display: "flex", alignItems: 'center', height: 400 }}>
                <Box sx={{ width: '100%', padding: '100px' }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                </Box>
            </Container>
        );

    }


    return (
        <Container maxWidth="md">
            <Box sx={{ height: 400, width: '100%', }}>
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-cell': {
                            fontSize: '13px',
                        },
                        '& .MuiDataGrid-header': {
                            fontSize: '14px',
                        },
                    }}
                    rows={typeof features === "object" ? features : []}
                    columns={columns}
                    disableRowSelectionOnClick
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection

                />
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>Are you sure you want to delete this feature?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirmation} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            
        </Container>
    );
}



