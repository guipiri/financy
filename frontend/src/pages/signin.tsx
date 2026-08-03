import { Eye, EyeOff, Lock, Mail, UserPlus } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { routes } from '@/App';
import FinancyLogo from '@/assets/financy-logo.svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useSignInMutation } from '@/hooks/api/useAuth';
import { validateEmail, validatePassword } from '@/lib/validation';

export function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem('rememberedEmail'),
  );
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { login } = useAuth();
  const { mutate: signIn, isPending } = useSignInMutation();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid) setEmailError(true);
    if (!isPasswordValid) setPasswordError(true);
    if (!isEmailValid || !isPasswordValid) return;

    signIn(formData, {
      onSuccess: (data) => {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        login(
          data.signIn.user,
          data.signIn.accessToken,
          data.signIn.refreshToken,
        );
        toast.success('Login realizado com sucesso!');
        navigate(routes.dashboard.path);
      },
      onError: (err) => {
        const apiError =
          (err as unknown as { response: { errors: { message: string }[] } })
            .response?.errors?.[0]?.message ||
          'Ocorreu um erro ao realizar o login. Tente novamente.';
        toast.error(apiError);
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      if (emailError) {
        setEmailError(!validateEmail(value));
      }
    }
    if (name === 'password') {
      if (passwordError) {
        setPasswordError(!validatePassword(value));
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      setEmailError(!validateEmail(formData.email));
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password) {
      setPasswordError(!validatePassword(formData.password));
    }
  };

  const handleForgotPassword = () => {
    alert('Funcionalidade de recuperar senha em desenvolvimento.');
  };

  return (
    <div className="min-h-screen w-full bg-muted/40 flex flex-col items-center sm:justify-center p-4 pt-12 sm:p-6 font-sans">
      {/* Brand Logo Header */}
      <div className="mb-6 sm:mb-8">
        <img src={FinancyLogo} alt="Financy" className="h-8 w-auto" />
      </div>

      {/* Signin Card */}
      <Card className="w-full max-w-112">
        <CardHeader className="text-center mb-6 sm:mb-8">
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail */}
            <Field hasError={emailError}>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="mail@exemplo.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                startIcon={<Mail />}
                required
                disabled={isPending}
              />
              {emailError && (
                <p className="text-xs text-destructive pt-0.5">
                  Por favor, insira um e-mail válido
                </p>
              )}
            </Field>

            {/* Senha */}
            <Field hasError={passwordError}>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-passwor"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                startIcon={<Lock />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    disabled={isPending}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                }
                required
                disabled={isPending}
                minLength={8}
              />
              {passwordError && (
                <p className="text-xs text-destructive pt-0.5">
                  A senha deve ter no mínimo 8 caracteres
                </p>
              )}
            </Field>

            {/* Lembrar-me & Recuperar senha */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isPending}
                  className="size-4 rounded border-border bg-card text-primary focus:ring-primary focus-visible:border-primary cursor-pointer accent-primary"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-muted-foreground cursor-pointer select-none"
                >
                  Lembrar-me
                </label>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isPending}
                className="text-sm font-medium text-primary hover:underline focus:outline-none transition-colors"
              >
                Recuperar senha
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="icon-xl"
              className="w-full mt-2 rounded-lg shadow-xs"
              disabled={isPending}
            >
              {isPending ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">ou</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Ainda não tem uma conta?
          </p>
          <Button
            type="button"
            size="icon-xl"
            variant="outline"
            className="w-full text-gray-700 rounded-lg flex items-center justify-center gap-2"
            onClick={() => navigate(routes.signup.path)}
            disabled={isPending}
          >
            <UserPlus className="size-4 text-foreground" />
            <span>Criar conta</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;
