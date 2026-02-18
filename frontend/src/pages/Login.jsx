import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="auth-page auth-login">
      <div className="auth-card">
        <p className="auth-kicker">Добро пожаловать</p>
        <h1>Вход в MoneyTrack</h1>
        <p className="auth-subtitle">Контролируй доходы, расходы и динамику за период.</p>
        <LoginForm />
      </div>
    </div>
  );
}
