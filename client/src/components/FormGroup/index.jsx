const FormGroup = ({ label, id, type, value, onChange, errorMsg }) => {
  return (
    <div className='form-group'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <input
        className='form-input'
        type={type}
        name={id}
        id={id}
        onChange={onChange}
        value={value}
      />
      <span className='form-alert'>{errorMsg}</span>
    </div>
  );
};

export default FormGroup;
