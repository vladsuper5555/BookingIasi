import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Select, MenuItem, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';


function Form() {
  const [items, setItems] = useState([{ id: Math.random().toString(), type: 'fridge' }]);
  const [errors, setErrors] = useState({});

  const handleAddItem = () => {
    const newItem = { id: Math.random().toString(), type: 'fridge', details: '', coords: { lat: '', lng: '' } };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDelete = (index) => {
    if (items.length > 1) {
      setItems((prevItems) => prevItems.filter((item, i) => i !== index));
    }
  };

  const handleSelectChange = (event, index) => {
    const newItems = [...items];
    newItems[index].type = event.target.value;
    newItems[index].details = '';
    setItems(newItems);
  };

  const handleDetailsChange = (event, index) => {
    const newItems = [...items];
    newItems[index].details = event.target.value;
    setItems(newItems);
  };

  const handleCoordsChange = (event, index) => {
    const newItems = [...items];
    newItems[index].coords = event.target.value;
    setItems(newItems);
  };

  const getItemDetailsLabel = (type) => {
    switch (type) {
      case 'fridge':
        return 'Capacity (L)';
      case 'tv':
        return 'Diagonal (inch)';
      case 'airCondition':
        return 'BTU';
      case 'router':
        return 'Model';
      case 'powerOutlet':
        return 'Voltage (V)';
      case 'coffeMachine':
        return 'Brand';
      default:
        return 'Details';
    }
  };

  const validateInput = (name, value, type) => {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'This field is required';
    } else {
      switch (type) {
        case 'fridge':
        case 'tv':
        case 'airCondition':
        case 'powerOutlet':
          if (isNaN(value) || value <= 0) {
            errorMessage = 'Please enter a valid number greater than 0';
          }
          break;
        case 'router':
        case 'coffeeMachine':
          if (!/^[a-zA-Z0-9 -\s]*$/.test(value)) {
            errorMessage = 'Please enter a valid string';
          }
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const exportData = () => {
    const dataToExport = items.map(({ id, ...item }) => item);
    const jsonData = JSON.stringify(dataToExport);
    console.log(jsonData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    exportData();
  };



  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Pano Meta-Data Form
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {items.map((item, index) => (
                <Grid item xs={12} key={item.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Select value={item.type} onChange={(event) => handleSelectChange(event, index)} fullWidth>
                        <MenuItem value="fridge">Fridge</MenuItem>
                        <MenuItem value="tv">TV</MenuItem>
                        <MenuItem value="airCondition">Air Condition</MenuItem>
                        <MenuItem value="router">Router</MenuItem>
                        <MenuItem value="powerOutlet">Power Outlet</MenuItem>
                        <MenuItem value="coffeMachine">Coffe Machine</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id={`${item.type}-details`}
                        label={`${getItemDetailsLabel(item.type)}`}
                        variant="outlined"
                        fullWidth
                        required
                        error={!!errors[`${item.type}-details`]}
                        helperText={errors[`${item.type}-details`]}
                        onBlur={(event) => validateInput(`${item.type}-details`, event.target.value, item.type)}
                        onChange={(event) => handleDetailsChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id={`${item.type}-coords`}
                        label={`${item.type}-coordinates`}
                        variant="outlined"
                        fullWidth
                        onChange={(event) => handleCoordsChange(event, index)}
                      />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                      {index === items.length - 1 && (
                        <IconButton onClick={handleAddItem}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Form;