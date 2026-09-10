import { useState } from "react";
import { login, register, saveSession } from "../services/authService";
import AppName from "./AppName";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Icon from "./ui/Icon";

const labelStyles = "mb-1.5 block text-[13px] font-medium text-ink";

function AuthForm({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = isLogin
        ? await login(email, password)
        : await register(name, email, password);
      saveSession(data);
      onAuthenticated(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-[380px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <AppName size="lg" />
          <h1 className="mt-5 text-[22px] font-semibold tracking-[-0.015em] text-ink">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            {isLogin
              ? "Log in to pick up where you left off."
              : "Start organising your day in a few seconds."}
          </p>
        </div>

        <div className="animate-pop-in rounded-card border border-line bg-surface p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {!isLogin && (
              <div className="animate-rise-in">
                <label htmlFor="auth-name" className={labelStyles}>
                  Name
                </label>
                <Input
                  id="auth-name"
                  type="text"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className={labelStyles}>
                Email
              </label>
              <Input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="auth-password" className={labelStyles}>
                Password
              </label>
              <Input
                id="auth-password"
                type="password"
                placeholder={isLogin ? "••••••••" : "At least 6 characters"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p
                role="alert"
                className="animate-rise-in flex items-start gap-2 rounded-control border border-danger/15 bg-danger-soft px-3 py-2 text-[13px] text-danger"
              >
                <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-[13px] text-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="rounded font-medium text-accent transition-colors hover:text-accent-hover"
            onClick={() => {
              setError("");
              setMode(isLogin ? "register" : "login");
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
