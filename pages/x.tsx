import { FC, useState } from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import { ArrowRightAlt, MoveToInbox } from '@mui/icons-material';

import {
  StyledButton,
  StyledCheckbox,
  StyledDialog,
  StyledTextField,
  StyledTextFieldNumber,
  StyledTextFieldPassword,
  StyledTextFieldPhone,
  StyledTextFieldSocialNumber,
  Transitions,
} from '@/components/atoms';
import { useSwitch } from '@/hooks';
import { POSFont } from '@/styles';

const X: FC = () => {
  const [value, setValue] = useState('123');
  const [number, setNumber] = useState(1000.99);
  const [phone, setPhone] = useState<string | number>('1234567890');

  const [ssn, setSSN] = useState('123123123');

  const [checked, setChecked] = useState(false);

  const { visible, toggle } = useSwitch(false);

  const { visible: show, open, close } = useSwitch(false);

  return (
    <Box
      sx={{
        p: 15,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          border: '1px dashed rgba(145, 158, 171, 0.32)',
          borderRadius: 8,
          p: 5,
        }}
      >
        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Checkbox
        </Typography>

        <StyledCheckbox
          checked={checked}
          label={
            "I'm using Material UI kit for React. I'm making Checkboxes dynamically from states and updating them, But I'm getting uncontrolled element error."
          }
          onChange={(e) => setChecked(e.target.checked)}
        />

        <StyledCheckbox
          checked={false}
          disabled={true}
          label={
            "I'm using Material UI kit for React. I'm making Checkboxes dynamically from states and updating them, But I'm getting uncontrolled element error."
          }
          onChange={(e) => setChecked(e.target.checked)}
        />

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Transitions
        </Typography>
        <StyledButton onClick={() => toggle()} sx={{ mb: 10 }}>
          Click Me !
        </StyledButton>
        <Transitions>
          {visible && (
            <StyledTextFieldSocialNumber
              label={'Social Number'}
              onValueChange={(e) => setSSN(e)}
              placeholder={'Social Number'}
              sx={{ width: 180 }}
              value={ssn}
            />
          )}
        </Transitions>

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          TextField
        </Typography>

        <StyledTextField
          disabled
          label={'disabled'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'disabled'}
          sx={{ width: 180 }}
          value={value}
        />

        <StyledTextField
          label={'error array'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'error array'}
          sx={{ width: 180, mx: 2 }}
          validate={['error 1', 'error 2']}
          value={value}
        />

        <StyledTextField
          label={'error'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'error'}
          sx={{ width: 180 }}
          validate={['error 1']}
          value={value}
        />

        <StyledTextField
          label={'static'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'static'}
          sx={{ width: 180, ml: 2 }}
          value={value}
        />

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Text Field Number
        </Typography>

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Text Field Password
        </Typography>
        <StyledTextFieldPassword
          label={'password'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'placeholder'}
          sx={{ width: 380 }}
          value={value}
        />

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Text Field phone
        </Typography>
        <StyledTextFieldPhone
          label={'phone'}
          onValueChange={(v) => {
            setPhone(v.floatValue ?? '');
          }}
          placeholder={'placeholder'}
          sx={{ width: 380 }}
          value={phone}
        />
        {phone}

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Text Field Social Number
        </Typography>
        <StyledTextFieldSocialNumber
          label={'Social Number'}
          onValueChange={(e) => setSSN(e)}
          placeholder={'Social Number'}
          sx={{ width: 180 }}
          value={ssn}
        />
        {ssn}

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Contained Button
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              color
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="contained">
              Primary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="info" variant="contained">
              Cancel
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="secondary" variant="contained">
              Secondary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="success" variant="contained">
              Success
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="warning" variant="contained">
              Warning
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="error" variant="contained">
              Error
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              sx={{
                bgcolor: '#fff',
                color: 'primary.main',
                boxShadow: '0px 10px 20px rgba(17, 52, 227, 0.1)',
                '&:hover': {
                  bgcolor: '#fff',
                },
              }}
              variant="contained"
            >
              white
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              States
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="contained">
              Enabled
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="contained">
              Hover
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" disabled variant="contained">
              Disabled
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              icon
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              startIcon={<MoveToInbox />}
              variant="contained"
            >
              Export
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              endIcon={<ArrowRightAlt />}
              variant="contained"
            >
              Get started
            </StyledButton>
          </Grid>
        </Grid>

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Outlined Button
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              color
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="outlined">
              Primary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="info" variant="outlined">
              Cancel
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="secondary" variant="outlined">
              Secondary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="success" variant="outlined">
              Success
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="warning" variant="outlined">
              Warning
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="error" variant="outlined">
              Error
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              States
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="outlined">
              Enabled
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="outlined">
              Hover
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" disabled variant="outlined">
              Disabled
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              icon
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              startIcon={<MoveToInbox />}
              variant="outlined"
            >
              Export
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              endIcon={<ArrowRightAlt />}
              variant="outlined"
            >
              Get started
            </StyledButton>
          </Grid>
        </Grid>

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Text Button
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              color
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="text">
              Primary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="secondary" variant="text">
              Secondary
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="success" variant="text">
              Success
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="warning" variant="text">
              Warning
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="error" variant="text">
              Error
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              States
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="text">
              Enabled
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" variant="text">
              Hover
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton color="primary" disabled variant="text">
              Disabled
            </StyledButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={1}>
            <Box
              sx={{
                fontSize: 12,
                color: '#919EAB',
                lineHeight: '48px',
                height: 48,
              }}
            >
              icon
            </Box>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              startIcon={<MoveToInbox />}
              variant="text"
            >
              Export
            </StyledButton>
          </Grid>
          <Grid item xs={false}>
            <StyledButton
              color="primary"
              endIcon={<ArrowRightAlt />}
              variant="text"
            >
              Get started
            </StyledButton>
          </Grid>
        </Grid>

        <Typography sx={{ mb: 5, mt: 10 }} variant="h5">
          Dialog
        </Typography>
        <StyledButton color="primary" onClick={open} variant="contained">
          Open Dialog
        </StyledButton>

        <StyledDialog handleClose={close} open={show} Title="Delete Files?">
          <DialogContent sx={{ ...POSFont(14, 400, 1.5, 'info.main') }}>
            Are you sure you want to delete Property Address
          </DialogContent>
          <DialogActions>
            <StyledButton
              autoFocus
              color="info"
              onClick={close}
              size="medium"
              variant="outlined"
            >
              Cancel
            </StyledButton>
            <StyledButton
              color="primary"
              onClick={close}
              size="medium"
              variant="contained"
            >
              Confirm
            </StyledButton>
          </DialogActions>
        </StyledDialog>
      </Box>
    </Box>
  );
};

export default X;
