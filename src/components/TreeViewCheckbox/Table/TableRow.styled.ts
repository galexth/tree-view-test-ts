import styled from "styled-components";

export const Collapse = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
`;

export const Cell = styled.td`
  padding: 3px 12px;
`;

export const Brick = styled.span`
  display: inline-block;
  width: 20px;
`;
