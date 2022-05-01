import styled from "styled-components";

export const Label = styled.label`
  padding: 6px;
  cursor: pointer;
`;
export const Title = styled.span<{ bold: boolean }>`
  line-height: 22px;
  padding: 4px 2px;
  cursor: pointer;
  user-select: none;
  ${({ bold }) => bold && `text-decoration: underline;`}
  &:hover {
    text-decoration: underline;
  }
`;
