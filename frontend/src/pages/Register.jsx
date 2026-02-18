import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="auth-page auth-register">
      <div className="auth-card">
        <p className="auth-kicker">Новый аккаунт</p>
        <h1>Регистрация</h1>
        <p className="auth-subtitle">Создай личное пространство для учета финансов.</p>
        <RegisterForm />
      </div>
    </div>
  );
}
