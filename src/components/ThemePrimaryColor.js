import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
import palette from '../theme/palette';
//
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

ThemePrimaryColor.propTypes = {
  children: PropTypes.node
};

export default function ThemePrimaryColor({ children }) {
  const defaultTheme = useTheme();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: {
          name: 'default',
          ...palette.light.primary
        }
      },
    }),
    [defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
