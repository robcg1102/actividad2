export default function Container(props) {
  const paddUD = props.paddUD ? props.paddUD : "20px";
  const paddLR = props.paddLR ? props.paddLR : "50px";

  return (
    <div className="myContainer" style={{ padding: `${paddUD} ${paddLR}` }}>
      {props.children}
    </div>
  );
}
