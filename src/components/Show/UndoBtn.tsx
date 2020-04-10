import React from 'react';
import { StyledButton } from './styles';

interface Props {
  undoState: () => void;
}

const UndoBtn = ({ undoState }: Props): JSX.Element => {
  return (
    <StyledButton onClick={undoState}>
      <svg
        width="48"
        height="18"
        viewBox="0 0 48 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect opacity="0.8" width="48" height="18" rx="9" fill="#3E5372" />
        <path
          d="M14.24 12.108C13.412 12.108 12.77 11.907 12.314 11.505C11.864 11.103 11.639 10.506 11.639 9.714V5.826H12.791V9.687C12.791 10.161 12.917 10.521 13.169 10.767C13.421 11.013 13.778 11.136 14.24 11.136C14.702 11.136 15.062 11.013 15.32 10.767C15.578 10.521 15.707 10.161 15.707 9.687V5.826H16.859V9.714C16.859 10.506 16.631 11.103 16.175 11.505C15.719 11.907 15.074 12.108 14.24 12.108ZM18.1251 7.266H19.0161L19.1061 7.896H19.1691C19.3431 7.662 19.5561 7.482 19.8081 7.356C20.0661 7.224 20.3601 7.158 20.6901 7.158C21.1701 7.158 21.5451 7.29 21.8151 7.554C22.0851 7.812 22.2201 8.229 22.2201 8.805V12H21.1401V8.994C21.1401 8.67 21.0651 8.439 20.9151 8.301C20.7711 8.163 20.5551 8.094 20.2671 8.094C19.9671 8.094 19.7151 8.202 19.5111 8.418C19.3071 8.634 19.2051 8.91 19.2051 9.246V12H18.1251V7.266ZM25.0353 12.108C24.4353 12.108 23.9703 11.904 23.6403 11.496C23.3103 11.088 23.1453 10.464 23.1453 9.624C23.1453 8.808 23.3103 8.193 23.6403 7.779C23.9703 7.365 24.4113 7.158 24.9633 7.158C25.6233 7.158 26.0973 7.377 26.3853 7.815H26.4393V5.493H27.5193V12H26.6283L26.5383 11.37H26.4843C26.3283 11.61 26.1243 11.793 25.8723 11.919C25.6203 12.045 25.3413 12.108 25.0353 12.108ZM25.3593 11.181C25.7313 11.181 26.0043 11.058 26.1783 10.812C26.3523 10.56 26.4393 10.188 26.4393 9.696V9.588C26.4393 8.586 26.0793 8.085 25.3593 8.085C24.9633 8.085 24.6813 8.205 24.5133 8.445C24.3453 8.679 24.2613 9.057 24.2613 9.579V9.696C24.2613 10.212 24.3453 10.59 24.5133 10.83C24.6813 11.064 24.9633 11.181 25.3593 11.181ZM30.8115 12.108C30.0315 12.108 29.4465 11.907 29.0565 11.505C28.6725 11.103 28.4805 10.479 28.4805 9.633C28.4805 8.787 28.6725 8.163 29.0565 7.761C29.4465 7.359 30.0315 7.158 30.8115 7.158C31.5915 7.158 32.1735 7.359 32.5575 7.761C32.9475 8.163 33.1425 8.787 33.1425 9.633C33.1425 10.479 32.9475 11.103 32.5575 11.505C32.1735 11.907 31.5915 12.108 30.8115 12.108ZM30.8115 11.226C31.2375 11.226 31.5465 11.103 31.7385 10.857C31.9305 10.605 32.0265 10.218 32.0265 9.696V9.57C32.0265 9.048 31.9305 8.664 31.7385 8.418C31.5465 8.166 31.2375 8.04 30.8115 8.04C30.3795 8.04 30.0675 8.166 29.8755 8.418C29.6895 8.664 29.5965 9.048 29.5965 9.57V9.696C29.5965 10.218 29.6895 10.605 29.8755 10.857C30.0675 11.103 30.3795 11.226 30.8115 11.226ZM35.5796 9.849C35.5796 9.603 35.6186 9.393 35.6966 9.219C35.7806 9.039 35.8766 8.892 35.9846 8.778C36.0986 8.664 36.2486 8.535 36.4346 8.391C36.6506 8.223 36.8096 8.076 36.9116 7.95C37.0136 7.818 37.0646 7.656 37.0646 7.464C37.0646 7.266 36.9986 7.086 36.8666 6.924C36.7406 6.756 36.4886 6.672 36.1106 6.672C35.7146 6.672 35.4446 6.771 35.3006 6.969C35.1626 7.167 35.0936 7.386 35.0936 7.626L35.1026 7.869H34.0046C33.9806 7.755 33.9686 7.65 33.9686 7.554C33.9686 7.212 34.0526 6.903 34.2206 6.627C34.3886 6.345 34.6376 6.123 34.9676 5.961C35.3036 5.799 35.7116 5.718 36.1916 5.718C36.8156 5.718 37.3106 5.859 37.6766 6.141C38.0426 6.417 38.2256 6.81 38.2256 7.32C38.2256 7.608 38.1806 7.854 38.0906 8.058C38.0006 8.262 37.8926 8.427 37.7666 8.553C37.6406 8.679 37.4756 8.82 37.2716 8.976C37.0376 9.156 36.8636 9.315 36.7496 9.453C36.6416 9.591 36.5876 9.768 36.5876 9.984V10.281H35.5796V9.849ZM35.5256 10.857H36.6416V12H35.5256V10.857Z"
          fill="#FAFAFB"
        />
      </svg>
    </StyledButton>
  );
};
export default UndoBtn;
