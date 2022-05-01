import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck as faSquareCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { Label, Title } from "./Checkbox.styled";
import { CheckState } from "./types";

type Props = {
  title: string;
  checkState: CheckState;
  handleChange: () => void;
};

export default function Checkbox({ title, checkState, handleChange }: Props) {
  const renderCheckboxIcon = (checked: CheckState) => {
    switch (checked) {
      case CheckState.Checked:
        return <FontAwesomeIcon size="1x" icon={faSquareCheckSolid} />;
      case CheckState.HalfChecked:
        return <FontAwesomeIcon size="1x" icon={faSquareCheck} />;
      default:
        return <FontAwesomeIcon size="1x" icon={faSquare} />;
    }
  };

  return (
    <>
      <Label>
        {renderCheckboxIcon(checkState)}
        <input
          type="checkbox"
          hidden
          checked={checkState > CheckState.Unchecked}
          onChange={handleChange}
        />
      </Label>
      <Title bold={checkState === CheckState.Checked}>{title}</Title>
    </>
  );
}
