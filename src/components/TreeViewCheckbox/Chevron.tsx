import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "./Chevron.styled";

type Props = {
  expanded: boolean;
};

export default function Chevron({ expanded }: Props) {
  return (
    <Container>
      <FontAwesomeIcon
        size="sm"
        icon={expanded ? faChevronDown : faChevronRight}
      />
    </Container>
  );
}
