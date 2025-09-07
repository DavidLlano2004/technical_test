import "./IconMenuBurguer.css";

interface Props {
  actionMenuBurguer: () => void;
}

export const IconMenuBurguerComponent = ({ actionMenuBurguer }: Props) => {
  return (
    <label className="burger">
      <input onClick={() => actionMenuBurguer()} type="checkbox" id="burger" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
};
