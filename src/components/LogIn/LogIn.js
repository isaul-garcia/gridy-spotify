import React from 'react';
import { CustomButtonRoot } from '../../globalStyles';
import Stack from '@mui/material/Stack';

const Form = props => (
    <form>
        <Stack spacing={1}>
            <CustomButtonRoot variant="outlined" spotify={true}>Log in to Spotify</CustomButtonRoot>
        </Stack>
    </form>
);

export default Form;