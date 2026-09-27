const AuthCard = ({ title, onSubmit, children }) => (
  <div className="hero bg-base-200 min-h-screen px-4">
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
      <form className="card-body" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
        {children}
      </form>
    </div>
  </div>
);

export default AuthCard;
