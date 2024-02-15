import { Alert, Backdrop, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'
import { FormValueType } from './types';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useFeatures } from '../hooks/useFeatures';
import CheckIcon from '@mui/icons-material/Check';


export default function CreateFeature() {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValueType>({
    defaultValues: {
      name: '',
      description: '',
    }
  });
  const params = useParams()
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { features, addFeature, updateFeature } = useFeatures();

  const onSubmit = async (data: FormValueType) => {
    setCreateLoading(true);
    if (isEdit) {
      updateFeature({ ...data, id: Number(params.id) });
      setSuccessMsg("Updated Successfully");
    }
    else {
      addFeature({ ...data, id: features?.length + 1 });
      setSuccessMsg("Added Successfully");
    }
    setCreateLoading(false);
    setTimeout(() => {
      setSuccessMsg('');
      navigate("/");
    }, 1000);

  };

  const isEdit = params?.id


  useEffect(() => {
    if (isEdit) {
      const feature = (features ?? []).find((item: { id: number; }) => item.id === Number(params.id))
      if (feature) {
        setValue('name', feature.name)
        setValue('description', feature.description)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  return (
    <Container maxWidth="sm">
      <Card sx={{mb:"10px"}}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
              {isEdit ? 'Edit' : 'Create'} Form
            </Typography>


            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name && errors.name.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description && errors.description.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={createLoading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>


                </Button>
              </Grid>
            </Grid>

          </form>
        </CardContent>
      </Card>
      {successMsg &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {successMsg}
        </Alert>
      }

    </Container>
  );
}








