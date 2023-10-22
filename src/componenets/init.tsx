
export const Button = ({ handleClick, label }) => (
    <div onClick={handleClick} className="btn">
      <p>{label}</p>
    </div>
  );

  
export const ErrorMessage = ({ msg, show }) => (
    <div className={show ? "errorMsg" : "hideErrorMsg"}>
      <h3>{msg}</h3>
    </div>
  );
  
export const InputField = ({ label, name, type = "text", value, onChange }) => (
    <div>
      <h3>{label}</h3>
      <input
        type={type}
        name={name}
        onChange={e => onChange(name, e.target.value)}
        value={value}
        className="input"
      />
    </div>
  );
  
export const Box = ({ children }: any) => <div className="box">{children}</div>;
  