import { Svg, Wrapper } from './styled';

interface IProps {
  size?: number;
  className?: string;
  appearance?: string;
}

export const Spinner = ({ size = 42, className, appearance = '#5896C0' }: IProps) => {
  return (
    <Wrapper className={className} width={size} height={size}>
      <Svg appearance={appearance} />
    </Wrapper>
  );
};
