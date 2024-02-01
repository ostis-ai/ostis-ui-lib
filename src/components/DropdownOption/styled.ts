import styled from 'styled-components';

export const Option = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;

  font-family: ${({ theme }) => theme.dropdownOption.font.fontFamily};
  font-size: ${({ theme }) => theme.dropdownOption.font.fontSize};
  line-height: ${({ theme }) => theme.dropdownOption.font.lineHeight};
  color: ${({ theme }) => theme.dropdownOption.colors.text};

  word-break: break-word;

  padding: ${({ theme }) => theme.dropdownOption.size.padding};

  background-color: transparent;

  cursor: pointer;
`;
