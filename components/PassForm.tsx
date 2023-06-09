type IPassForm = {
  action: string;
  error: string;
  // deno-lint-ignore no-explicit-any
  setPadPassword: any;
};

const PassForm = ({ setPadPassword, action, error }: IPassForm) => {
  return (
    <div>
      <form onSubmit={setPadPassword}>
        <p>
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder={`${
              action == "new" ? "Set" : "Enter"
            } password for Pad`}
          />
        </p>

        <button type="submit">
          {action == "new" ? "Set" : "Enter"} password
        </button>
      </form>
      {error && <span style={{ color: "#ff0000" }}>{error}</span>}
    </div>
  );
};

export default PassForm;
