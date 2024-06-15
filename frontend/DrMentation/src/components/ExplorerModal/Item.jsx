export function Item({ document, isActive, isHovered, onHover, onClick }) {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className={`p-2 mb-2 border border-text rounded cursor-pointer ${isHovered ? "bg-primary text-background" : "bg-background text-text"} ${isActive ? "bg-white text-background" : ""}`}
    >
      {document.title}
    </div>
  );
}
