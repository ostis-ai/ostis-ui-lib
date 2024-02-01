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
    dropdownBoxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    colors: {
      placeholder: '#737373',
      text: '#414141',
      initialBackgroundColor: '#ffffff',
      borderInitial: '#EBEBEB',
      borderHover: '#5D8FEF',
      borderDisabled: '#eeeeee',
      borderError: '#EC7575',
      borderErrorHover: '#EC7575',
      closeButtonBackgroundHover: '#ececec',
    },
    size: {
      borderWidth: '1px',
      initialHeight: '42px',
      dropdownMaxHeight: '256px',
      dropdownPadding: '8px 0',
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
  popup: {
    colors: {
      overlayBackground: 'rgba(250, 250, 250, 0.65)',
    },
  },
  dropdownOption: {
    colors: {
      text: '#454545',
    },
    size: {
      padding: '8px 16px',
    },
    font: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  chip: {
    font: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '24px',
      maxWidth: 'fit-content',
    },
    size: {
      maxWidth: '190px',
      width: 'fit-content',
      gap: '4px',
      padding: '3px 7px',
      paddingWithIcon: '3px 3px 3px 7px',
      border: '1px',
      borderRadius: '8px',
      borderRadiusIcon: '4px',
      disabled: {
        border: '1px',
      },
    },
    colors: {
      backgroundColor: '#ffffff',
      color: '#454545',
      border: '#5d8fef',
      disabled: {
        color: '#a6a6a6',
        border: '#ffffff',
        backgroundColorIcon: '#ececec',
        fillIcon: '#ececec',
      },
      hover: {
        backgroundColorIcon: '#ececec',
        fillIcon: '#959595',
      },
    },
  },
};

export type Theme = typeof defaultLightTheme;
