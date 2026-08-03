import { Eye, EyeOff, Lock, LogIn, Mail, User } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
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
import { cn } from '@/lib/utils';
import { validateEmail, validatePassword } from '@/lib/validation';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }
    console.log('Signup form submitted:', formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      if (emailError) {
        setEmailError(!validateEmail(value));
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

  return (
    <div className="min-h-screen w-full bg-muted/40 flex flex-col items-center sm:justify-center p-4 pt-12 sm:p-6 font-sans">
      {/* Brand Logo Header */}
      <div className="mb-6 sm:mb-8">
        <img src={FinancyLogo} alt="Financy" className="h-8 w-auto" />
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-112">
        <CardHeader className="text-center mb-6 sm:mb-8">
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome completo */}
            <Field>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                startIcon={<User />}
                required
              />
            </Field>

            {/* E-mail */}
            <Field hasError={emailError}>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="mail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                startIcon={<Mail />}
                required
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
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                }
                required
                minLength={8}
              />
              <p
                className={cn(
                  'text-xs pt-0.5 text-gray-500',
                  passwordError && 'text-destructive',
                )}
              >
                A senha deve ter no mínimo 8 caracteres
              </p>
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              size="icon-xl"
              className="w-full mt-2 rounded-lg shadow-xs"
            >
              Cadastrar
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
          <p className="text-sm text-muted-foreground">Já tem uma conta?</p>
          <Button
            type="button"
            size="icon-xl"
            variant="outline"
            className="w-full text-gray-700 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn className="size-4 text-foreground" />
            <span>Fazer login</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
