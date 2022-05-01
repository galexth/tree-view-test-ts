import styled from "styled-components";

export const Collapse = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
`;
