import { SxProps } from '@mui/material';

export const StyledDrawerStyles: SxProps = {
  '&.MuiDrawer-root': {
    '& .drawer_header': {
      // minHeight: 76,
      position: 'sticky',
      width: '100%',
      top: 0,
      fontWeight: 600,
      fontSize: 18,
      color: 'text.primary',
      borderBottom: '1px solid',
      borderColor: 'background.border_default',
      py: 3,
      px: {
        md: 6,
        xs: 1.5,
      },
    },
    '& .drawer_footer': {
      // minHeight: 60,
      width: '100%',
      position: 'sticky',
      bottom: 0,
      borderTop: '1px solid',
      borderColor: 'background.border_default',
      py: 3,
      px: {
        md: 6,
        xs: 1.5,
      },
    },
    '& .drawer_content': {
      flexGrow: 1,
    },

    '& .MuiPaper-root': {
      width: '100%',
      boxShadow:
        '0px 0px 2px rgba(17, 52, 227, 0.1), 0px 10px 10px rgba(17, 52, 227, 0.1)',
    },
  },
} as const;
