export const defaultLightTheme = {
  size: {
    inputBorderWidth: '1px',
  },
  colors: {
    primary: '#5D8FEF',
  },
  checkbox: {
    labelGap: '8px',
    colors: {
      label: '#454545',
      borderInitial: '#5D8FEF',
      borderHover: '#5D8FEF',
      disabled: '#C1C1C1',
      disabledLabel: '#454545',
    },
    size: {
      outerRadius: '6px',
      innerRadius: '4px',
      outer: '24px',
      inner: '18px',
    },
    font: {
      fontFamily: 'Roboto',
      fontSize: '22px',
      lineHeight: '26px',
    },
  },
  select: {
    borderRadius: '10px',
    colors: {
      placeholder: '#737373',
      text: '#414141',
      initialBackgroundColor: '#ffffff',
      borderInitial: '#EBEBEB',
      borderHover: '#5D8FEF',
      borderDisabled: '#eeeeee',
      borderError: '#EC7575',
      borderErrorHover: '#EC7575',
    },
    size: {
      borderWidth: '1px',
      initialHeight: '42px',
    },
    font: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      lineHeight: '23px',
      fontWeight: '400',
      placeholderWeight: '300',
    },
  },
  input: {
    iconGap: '9px',
    borderRadius: '10px',
    colors: {
      disabled: {
        background: '#fbfbfb',
        border: '#eeeeee',
        text: '#737373',
      },
      initial: {
        background: '#ffffff',
        border: '#ebebeb',
        text: '#323232',
      },
      borderHover: '#7ec0ee',
      borderFocused: '#7ec0ee',
      borderFocusedHover: '#7ec0ee',
      borderError: '#f14747',
      borderErrorHover: '#f14747',
      placeholder: '#737373',
    },
    size: {
      padding: '8px 16px',
      borderWidth: '2px',
    },
    font: {
      fontSize: '20px',
      lineHeight: '24px',
      inputWeight: '400',
      placeholderWeight: '300',
      fontFamily: 'Roboto',
    },
  },
  textarea: {
    borderRadius: '10px',
    colors: {
      disabled: {
        background: '#fafafa',
        border: '#eeeeee',
        text: '#737373',
      },
      initial: {
        background: '#ffffff',
        border: '#ebebeb',
        text: '#323232',
      },
      borderHover: '#7ec0ee',
      borderFocused: '#7ec0ee',
      borderFocusedHover: '#7ec0ee',
      borderError: '#f14747',
      borderErrorHover: '#f14747',
      placeholder: '#737373',
    },
    size: {
      padding: '6px 14px',
      borderWidth: '2px',
    },
    font: {
      fontSize: '20px',
      lineHeight: '24px',
      inputWeight: '400',
      placeholderWeight: '300',
      fontFamily: 'Roboto',
    },
  },
  button: {
    gap: '8px',
    borderRadius: '10px',
    colors: {
      primary: {
        text: '#ffffff',
        textDisabled: '#ffffff',
        backgroundDisabled: '#c0c0c0',
        backgroundInitial: '#5896c0',
        backgroundHover: '#4980a5',
        backgroundActive: '#4980a5',
      },
      secondary: {
        text: '#5896c0',
        textDisabled: '#a6a6a6',
        backgroundDisabled: '#ffffff',
        backgroundInitial: '#ffffff',
        backgroundHover: '#f5f5f5',
        backgroundActive: '#f5f5f5',
      },
    },
    size: {
      large: {
        padding: '8px 48px',
      },
      medium: {
        padding: '8px 16px',
      },
      small: {
        padding: '8px 16px',
      },
    },
    font: {
      fontFamily: 'Roboto',
      large: {
        fontSize: '26px',
        lineHeight: '30px',
      },
      medium: {
        fontSize: '22px',
        lineHeight: '26px',
      },
      small: {
        fontSize: '18px',
        lineHeight: '20px',
      },
    },
  },
};

export type Theme = typeof defaultLightTheme;
