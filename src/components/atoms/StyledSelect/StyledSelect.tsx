import { FC } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { StyledSelectProps, StyledSelectStyles } from './index';

export const StyledSelect: FC<StyledSelectProps> = ({
  options = [],
  validate,
  value = '',
  onChange,
  label,
  disabled,
  sxList,
  sx,
  sxHelperText,
  ...rest
}) => {
  return (
    <>
      <FormControl
        error={!!(validate?.length && validate[0])}
        sx={Object.assign({}, { ...StyledSelectStyles.root, ...sx })}
        variant={'outlined'}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: Object.assign(
                  {},
                  { ...StyledSelectStyles.list, ...sxList },
                ),
              },
            },
          }}
          label={label}
          onChange={onChange}
          value={value}
          {...rest}
        >
          {options.map((opt) => (
            <MenuItem key={opt.key} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {validate?.length && validate[0] && (
          <FormHelperText
            sx={Object.assign(
              {},
              { ...StyledSelectStyles.helperText, ...sxHelperText },
            )}
          >
            {validate?.length
              ? validate.map((item, index) => (
                  <Box
                    component={'span'}
                    key={item + '_' + index}
                    sx={{ display: 'block', m: 0 }}
                  >
                    {item}
                  </Box>
                ))
              : validate
              ? validate[0]
              : undefined}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};
