import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Typography } from '@mui/material';

import { StyledButton, StyledButtonGroup } from '@/components/atoms';

const ButtonGroupComponent: FC = () => {
  const router = useRouter();

  const [value, setValue] = useState('no');

  return (
    <Box
      sx={{
        m: 4,
        p: 4,
        width: '50%',
        border: '1px solid rgba(145, 158, 171, 0.32)',
        borderRadius: 4,
        '& .component_wrap': {
          '& .divider': {
            my: 2,
          },
          '& .component_item': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            boxShadow: '1px 1px 3px 1px rgba(0,0,0,.38)',
            p: 4,
            borderRadius: 4,
          },
        },
      }}
    >
      <StyledButton
        onClick={() => router.back()}
        sx={{
          my: 3,
        }}
        variant={'outlined'}
      >
        back to components
      </StyledButton>

      <Box className={'component_wrap'}>
        <Typography variant={'h4'}>Button Group</Typography>
        <Divider className={'divider'} />
        <Box className={'component_item'}>
          <Box>
            <StyledButtonGroup
              onChange={(
                event: React.MouseEvent<HTMLElement>,
                newAlignment: string,
              ) => {
                setValue(newAlignment);
              }}
              options={[
                { value: 'yse', label: 'Yse' },
                { value: 'no', label: 'No' },
              ]}
              value={value}
            />
          </Box>
          <Box>
            <StyledButtonGroup
              disabled
              onChange={(
                event: React.MouseEvent<HTMLElement>,
                newAlignment: string,
              ) => {
                setValue(newAlignment);
              }}
              options={[
                { value: 'yse', label: 'Yse' },
                { value: 'no', label: 'No' },
              ]}
              value={value}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ButtonGroupComponent;
