export const defaultLight = {
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

export type Theme = typeof defaultLight;
